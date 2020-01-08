//Import User Model
const User = require('../model/users');

//Handle index action
exports.index = (req,res)=>{
    User.get((err, users)=>{
        if(err){
            res.json({
                status:"error",
                message: err,
            })
        }
        else
            res.json({
                status : "success",
                message: "User retrieved successfully",
                data: users
            })
    })
}

//Handle create user action
exports.create = (req,res)=>{
    let user = new User();
    user.name = req.body.name?req.body.name:user.name;
    user.gender = req.body.gender;
    user.phone = req.body.phone;
    user.email = req.body.email;
    //Save user and check for errors
    user.save((err)=>{
        if(err) res.json(err);
        else
            res.json({
                message: 'New user created',
                data: user
            })
    })
}

//Handle view user info
exports.view = (req,res)=>{
    User.findById(req.params.user_id,(err,user)=>{
        if(err) res.send(err);
        else
            res.json({
                message: 'Loading...',
                data: user
            })
    })
}

//Handle update user data
exports.update = (req,res)=>{
    let querry = {_id: req.params.user_id};
    User.findOneAndUpdate(querry,{$set:req.body},{upsert: true},(err,user)=>{
        if(err) res.json(err);
        else
            {
                console.log(user)
                res.json({
                    message: 'User updated',
                    data: req.body
                })
            }
    })
}
// exports.updateSome = (req,res)=>{
//     let querry = {_id: req.params.user_id};
//     User.updateOne(querry,{upsert:true})
// }

//Handle delete user data
exports.delete = (req,res)=>{
    User.remove({_id:req.params.user_id},(err,user)=>{
        if(err) res.send(err);
        else
            res.json({
                status : "success",
                message: 'User deleted'
            })
    })
}