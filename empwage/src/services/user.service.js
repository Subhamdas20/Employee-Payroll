import User from '../models/user.model';
import bcrypt from 'bcrypt'
  import * as jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {

  let userData = await User.find({ email: req.email });
  if (!userData.length) {
    const passwordHash = await bcrypt.hash(req.password, 10)
    let newUser = new User({
      firstname: req.firstname,
      lastname: req.lastname,
      email: req.email,
      password: passwordHash
    })
    return await newUser.save()
  }
  // else return userData
};

export const loginUser = async (req, res) => {
 
  let userData = await User.findOne({ email: req.email });
  if (userData) {
    let passwordVerify = await bcrypt.compare(req.password, userData.password)
    if (passwordVerify) {
      const payload = { id: userData._id, email: userData.email }
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })
      return new Promise((resolve, reject) => {
        resolve(
          {
            userId: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            createdAt: userData.createdAt,
            success: true,
            token: token
          }
        )
      })
    }
    else {
      return new Promise((resolve, reject) => {
        resolve({
          success: false,
          message: "Wrong Password",
          status:401
        })
      })
    }
  }
  else {
    return new Promise((resolve, reject) => {
      resolve({
        success: false,
        message: "Email not found!! Register first",
        status:404
      })
    })
  }
}


