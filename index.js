const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(msg => {
        console.log("Database Connect ");
    })
    .catch(err => {
        console.log("Error", err);
    })

const schema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    ispublished: Boolean
})

const Course = mongoose.model('Course', schema)

const course = new Course({
    name: 'Node Course',
    author: 'rajat',
    tags: ['node', 'backend'],
    ispublished: true

})

course.save()
    .then(res => {
        console.log("Save")
    })
    .catch(err => {
        console.log(err);
    })

function getCourses() {
    return Course.find({ author: 'rajat', ispublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
}

//  Relational Operator
//Course.find({ price: { $gt: 10 } })
//Course.find({ price: { $lte: 10, gte: 50 } })
//Course.find({ price: { $in: [10, 20, 30] } })

//  Logical Operator
//Course.find()
//.or([{ author: 'mosh' }, { ispublished: true }])
//.and([{ author: 'mosh' }, { ispublished: false }])

//Regular Expression 
// Starts with Mosh
//Course.find({author:/^mosh/})
//Ends With Mosh
//Course.find({author:/mosh$/i})
// Contains Mosh
//Course.find({author:/.*mosh.*/i})


getCourses()
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err);
    })

async function updateCourses(id) {
    const c = await Course.findById(id)
    if (!c) {
        return "Record Not Found";
    }
    c.ispublished = false;
    c.author = 'raj';
    result = await c.save();
    console.log(result);
}
//updateCourses('5ffeab59461cfd26bc359738')

async function removeCurse() {
    const result = await Course.deleteOne({ ispublished: false })
    console.log(result)
}


removeCurse();





