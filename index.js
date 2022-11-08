const express=require('express'); //Line 1
const cors = require('cors');
const bodyParser=require("body-parser");
const User = require('./model')
const app=express(); //Line 2
const port=process.env.PORT||5000; //Line 3
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router=express.Router();
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
const mongoose = require('mongoose')
const connection = { }

async function connect() {
    if (connection.isConnected) {
        console.log('connected already')
        return;
}
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('use prev connection')
            return;
        }
    }
  const db = async() =>  mongoose 
 .connect(process.env.MONGO_URI)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
    console.log('new connection')
    db()
    connection.isConnected = mongoose.connections[0].readyState;
    return db()
    
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
        }
    }
}

router.post('/', async(req, res) => {
    connect()
    console.log(req.body);
    
     const {email, tel, text}=req.body;
   console.log('conversationidserver',  email)
    
    const newUser=new User({email, tel, text}) 
   
    try {       
        const saveUser=await newUser.save();
      
        console.log(saveUser);
        res.status(201).send(saveUser)
        disconnect()

    } catch(err) {
        res.status(500).json(err)
        disconnect()
    }
   
});

app.use('/', router)
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
