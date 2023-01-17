const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res
        .status(400)
        .json({ msg: "Username Already exist", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res
        .status(400)
        .json({ msg: "Email Already exist", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user){
      return res.json({ msg: "Username or passwor incoorrect", status: false });
    } 
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid){
      return res.json({ msg: "Username or passwor incoorrect", status: false });
    }
      user.password = undefined;
      return res.json({ status: true, user: user });
    
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  // console.log(req.body);
  try {
    const userId = req.params.id.slice(0, -1).toString();
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarSet: true,
      avatar: avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getContacts = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    if (contactId !== undefined) {
      // return the contact information
      const contact = await User.findOne({ _id: contactId.toString() }).select([
        "email",
        "username",
        "avatar",
        "_id",
      ]);
      return res.json(contact);
    } else if (contactId === undefined) {
      const contacts = await User.find().select([
        "email",
        "username",
        "avatar",
        "_id",
      ]);
      return res.json(contacts);
      // return all contacts information
    }
  } catch (error) {
    next(error);
  }
};
