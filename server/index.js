import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const jsec = "jsec";
const app = express();
app.use(bodyParser.json());

const PORT = 3001;


app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }));
  

// Connect to MongoDB
mongoose.connect('mongodb+srv://jtlayan:vMxN58JDaIwtXqhC@cluster0.nlenlfq.mongodb.net/');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  courses: Array
});

const UserModel = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
     
      const existingUser = await UserModel.findOne({ username: username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      const newUser = new UserModel({ username: username, password: password });
      await newUser.save();
      const token = jwt.sign({ username: username }, jsec);
      res.status(201).json({ message: 'User registered successfully' , token: token });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/login' , async (req , res) => {
  
    try{
        const {username , password} = req.body ; 
        console.log(username , password)
        const existingUser = await UserModel.findOne({username: username});
        if(!existingUser){
            return res.status(400).json({error: 'User does not exist'});
        }
        if(existingUser.password !== password){
            return res.status(400).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({ username: username }, jsec);
        res.status(200).json({message: 'User logged in successfully' , token: token , array : existingUser.courses});

    }
    catch(error){
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  app.post('/course' , async (req , res) =>{
    try{
       const username = jwt.verify(req.body.token , jsec).username;
       //add course object to courses array
       const courses = req.body.courses;
       const existingUser = await UserModel.findOne({username: username});
         if(!existingUser){
              return res.status(400).json({error: 'User does not exist'});
         }
       //update the courses array in db with the new courses array
            existingUser.courses = courses;
            await existingUser.save();
            res.status(200).json({message: 'Courses updated successfully'});
    }
    catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  app.get('/course' , async (req , res) =>{
    try{
        const username = jwt.verify(req.body.token , jsec).username;
        //send back the courses array |
        const existingUser = await UserModel.findOne({username: username});
        if(!existingUser){
            return res.status(400).json({error: 'User does not exist'});
        }
        res.status(200).json({courses: existingUser.courses});
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  })
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
