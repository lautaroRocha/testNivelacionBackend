const User = require("../model/userModel")

async function addUser(req, res){
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        picture: req.body.picture
    })
    try{
        const newUser = await user.save()
        res.status(201).json({newUser : newUser})
    }catch(err){
        res.status(400).json({message : err.message})
    }
}
async function getAllUsers(req, res){
    try{
        const allUsers = await User.find()
        res.status(201).json(allUsers)
    }catch(err){
        res.status(400).json({message : err.message})
    }
}
async function updateUser(req, res){
    const id = req.params.id;
    try{
        await User.updateOne({_id: id}, {premium : true})
    }catch{
        res.status(400).json({message : err.message})
    }
}


module.exports = {getAllUsers, addUser, updateUser};