const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    //useFindAndModify: false
})

















// const task = new Tasks({
//     decription: " book tickets",
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })

// const me = new User({
//     name: ' Rayna',
//     email: 'rayna@gmail.com  ',
//     password: "raynasingh123"
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!', error)
// })