const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail, sendGoodByeEmail} = require('../emails/account')

router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send("Logged off of this session")
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send("Logged off of all sessions")
    }catch(e){
        res.send(500).send()
    }
})

router.get('/users/me',auth,async(req,res)=>{

    res.send(req.user)

    // try{
    //     const users = await User.find({})
    //     res.send(users) 
    // } catch(e){
    //     res.status(500).send()
    // }
    // // User.find({}).then((users)=>{
    // //     res.send(users)
    // // }).catch((e)=>{
    // //     res.status(500).send()
    // // })
})

// router.get('/users/:id', async (req,res)=>{
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })

router.patch('/users/me',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    // const _id = req.body._id

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{

        // const user = await User.findById(_id)

        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })

        await req.user.save() 
        // const user  = await User.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true}) //{new:true} will display updated user; runValidators ensures new data is validated
        
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)

    }catch(e){
        res.status(400).send(e)
    }

})

router.delete('/users/me',auth,async(req,res)=>{
    const _id = req.user._id
    
    try{
        // const user  = await User.findByIdAndDelete(_id)
        // if(!user){
        //     return res.status(404).send()
        // }
        
        await req.user.remove()
        sendGoodByeEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload file in jpg, jpeg, png format only'))
        }
        cb(undefined,true)
    }
}) 

router.post('/users/me/avatar',auth, upload.single('avatar') , async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{

    req.user.avatar = undefined
    await req.user.save()
    res.send()

})

router.get('/users/:id/avatar',async(req,res)=>{
    //5ce4d1817239ef492327e661

    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error("Unable to find resource")
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send(e)
    }
})

module.exports= router