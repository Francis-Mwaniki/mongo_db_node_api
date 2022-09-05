//imports
require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const port=process.env.PORT || 5000;
const app=express();
const postRoutes=require('./server/routes/routes');
//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('uploads'))
//router prefix
app.use('/api/post',postRoutes);
//connect to db
const DB_URL='mongodb://localhost:27017/menv_stack';
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log('connected to the database');}).catch((err)=>console.log(`not connected ${err}`))
 
//start serve
app.listen(port,()=>console.log(`server running @ port:${port}`))