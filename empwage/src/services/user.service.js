import User from '../models/user.model';
import bcrypt from 'bcrypt'


export const registerUser = async (req,res) => {
  let userData = await User.find({email:req.email});
  
  if(!userData.length){

    const passwordHash = await bcrypt.hash(req.password, 10)
    let newUser = new User({
        firstname: req.firstname,
        lastname: req.lastname,
        email: req.email,
        password: passwordHash
    })
    return await newUser.save()
  } 
};


//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
