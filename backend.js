require('dotenv').config();
const ex=require('express');
const mongoose =require('mongoose');
const path=require('path');
const app=ex();
app.use(ex.static(__dirname));
app.use(ex.urlencoded({extended:true}));
mongoose.connect(`${process.env.MONGO_URI}`);
const check=mongoose.connection
check.once('open',function(req,res)
{
    console.log('mongoDB connected successfully');
})

// storing all the FEinfo in variable
const databasetype=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmpassword:String
})
// linkn variable with collection
const collection=mongoose.model("reg",databasetype);

// opening the 1st pg reg.html
app.get("/",function(req,res)
{
    res.sendFile(path.join(__dirname,"reg.html"));
})
// 
app.post("/postmethod",async function(req,res){

    // input variables storing
    const{name,email,password,confirmpassword}=req.body;
// to store in the mongo values 
    const storeddata= new collection({
        name,email,password,confirmpassword
    })
    await storeddata.save();
    console.log(storeddata);
    res.sendFile(path.join(__dirname,"signin.html"))
});
app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,"signin.html"))
});
app.post("/webpage",async function (req,res)
{
    const{email,password}=req.body;
    const checklog= await collection.findOne({email,password});
    if(checklog)
    {
        res.sendFile(path.join(__dirname,"main.html"))
    }
    else{
        res.send("Invalid Email OR Password!!")
    }
});

app.listen(2090);
console.log("http://localhost:2090");