const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Tasks = require('./models/tasks')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up on ", port)
})


























//https://regex101.com/
// const Task = require('./models/tasks')
// const User = require('./models/user')
// const main=async()=>{
//     // const task = await Tasks.findById("5ce11b33334787318c1f425b")
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     // //5ce11b23334787318c1f4259

//     const user = await User.findById('5ce11b23334787318c1f4259')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()