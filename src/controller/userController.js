const userModel = require('../model/user');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const SECRET_KEY = process.env.SECRET_KEY;
const signup = async (req, res)=>{
    const { username , email, password} = req.body;

    try{

          const existingUser = await userModel.findOne({ email: email});
          if(existingUser){
            return res.status(400).json({message: "User Already exists"});
          }
          
          const hashedPassword = await bcrypt.hash(password, 10);
          const result  = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword,
          });

            const token = jwt.sign({ email: result.email, id: result._id}, SECRET_KEY);
          res.status(201).json({message: "User created successfully", user: result, token: token});
          
    } catch(err){
        console.error("Error creating user:", err);
        return res.status(500).json({message: "Internal server error"});
    }

}

const signin =  async (req, res)=>{

    const { email, password } = req.body;

    try {
      const existingUser = await userModel.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
      res.status(201).json({ message: "Login successful", user: existingUser, token: token });
      
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    signup,
    signin};