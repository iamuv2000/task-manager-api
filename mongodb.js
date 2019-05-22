//CRUD -> Create, Read, Update, Delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const ObjectID =  mongodb.ObjectID

MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=>{
    if(error){
        return console.log("Error occured")
    }
    
    const db = client.db(databaseName)




})






//
//
//
//
//
//



// const id = new ObjectID()
// console.log(id.id)
// console.log(id.getTimestamp())

//
//
//
//

// db.collection('Users').insertOne({
    //     _id:id,
    //     Name: 'Vaibhav',
    //     age: 20
    // },(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert user")
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('Users').insertMany([
    //     {
    //         "Name": 'Ishika',
    //         "age": 19
    //     },
    //     {
    //         "Name": 'Rohan',
    //         "age":19
    //     }
    // ], (error,result)=>{
    //     if(error){
    //        return console.log("Unable to insert users")
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         "description":'Book tickets to Vellore',
    //         "completed": false
    //     },
    //     {
    //         "description":'Book doctor appointment',
    //         "completed": false
    //     },
    //     {
    //         "description":'Switch iPhone',
    //         "completed": true
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert tasks")
    //     }
    //     console.log(result.ops)
    // })



    // db.collection('Users').findOne({_id:new ObjectID("5cd4f35fd74c7732ab8b5488")},(error,user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('Users').find({age:19}).toArray((error,user) =>{
    //     console.log(user)
    // })

    // db.collection('Users').find({age:19}).count((error,count) =>{
    //     console.log(count)
    // })


    // db.collection('tasks').findOne({_id: new ObjectID("5cd4f45b98862332c443c777")},(error,task)=>{
    //     if(error){
    //         return console.log("Error")
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error,task)=>{
    //     if(error){
    //         return console.log("Unable to find")
    //     }

    //     console.log(task)
    // })


    // db.collection("Users").updateOne({
    //     _id: new ObjectID ("5cd4f1909a22d0327d7680fa")
    // },{
    //     $inc: {
    //         "age": 3
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection("tasks").updateMany({
    //     completed: false
    // },{
    //     $set:{
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((reject)=>{
    //     console.log(error)
    // })





    // db.collection("Users").deleteMany({
    //     age: 19
    // }).then((result)=>{
    //     console.log(result.deletedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection("tasks").deleteOne({
    //     description: "Switch iPhone"
    // }).then((result)=>{
    //     console.log(result.deletedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    
