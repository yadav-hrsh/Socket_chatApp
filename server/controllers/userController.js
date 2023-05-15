const User = require('../models/userModel');
const bcrypt = require('bcrypt');


module.exports.login = async (req, res, next) => {
    try {
        console.log("login ayay")
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };

module.exports.register = async(req,res)=>{
    try {
    const {username,email,password} = req.body;
    console.log("pahucha")
    const checkusername = await User.findOne({username})
    if(checkusername){
        return  res.json({msg:"username is already used", status:"false"})
    }
    const emailcheck = await User.findOne({email})
    if(emailcheck){
        return  res.json({msg:"email is already used", status:"false"})
    }
    const hashpass = await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password: hashpass,
      });
      delete user.password;
      return res.json({ status: 'true', user });
    } catch (ex) {
        console.log(ex);
    }
}

module.exports.setAvatar = async(req,res)=>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userdata = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage 
        })
        return res.json({isSet:userdata.isAvatarImageSet , image:userdata})
    }catch(error){
        console.log(error)
    }
}

module.exports.getAllUsers = async(req,res)=>{
  try {
    const users =await User.find({_id:{$ne:req.params.id}}).select([
      "email","username","avatarImage","_id",
    ])
    return res.json({users});
    // console.log(users)

  } catch (error) {
    console.log(error)
  }
}
