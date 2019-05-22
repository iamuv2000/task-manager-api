const express = require('express')
const router  = new express.Router()
const Tasks  = require('../models/tasks')
const auth = require('../middleware/auth')

router.post('/tasks',auth,async (req,res)=>{
    //const task = new Tasks(req.body)
    const task = new Tasks({
        ...req.body,             //... copies entire req.body to this object
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

//GET /tasks?completed=false
//GET /tasks?limit=10&skip=1
//GET /tasks?sortBy=createdAt_desc
router.get('/tasks',auth,async(req,res)=>{
    const match = {}
    const sort ={}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]]= parts[1] === 'desc' ? -1 : 1
    }

    try{

        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // {
                //     completed: 1  //1=asc; -1:desc
                // }  
            }
        }).execPopulate()

        res.send(req.user.tasks)

    }catch(e){
        res.status(500).send()
    }

    // Tasks.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id

    try{
        //const task = await Tasks.findById(_id)

        const task = await Tasks.findOne({
            _id,
            owner: req.user._id
        })

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
    // Tasks.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})


router.patch('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:"Invalid update"})
    }
    try{
        const task = await Tasks.findOne({_id,owner:req.user._id})
        //const task = await Tasks.findByIdAndUpdate(_id,req.body,{new: true ,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth,async(req,res)=>{
    const _id = req.params.id

    try{
        const task  = await Tasks.findOneAndDelete({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router