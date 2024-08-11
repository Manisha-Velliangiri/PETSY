const port= 4000;
//initializing all dependencies and modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

//to pass the reqs automatically through json
app.use(express.json());


app.use(cors({
    origin: 'https://petsy-mldy.onrender.com', // Replace with your actual frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
//manishadev  //petsy7devmanisha7
//initialize database
mongoose.connect("mongodb+srv://manisha:mongopetsyme@petsy.gipdnth.mongodb.net/petsy");

//api creation
app.get("/",(req,res)=>{
    res.send("Express app is running")
})

//api to add prod in db
//creating image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
       return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})
//upload function 
const upload =multer({storage:storage})

//endpoint, to upload img
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
  res.json({
    success:1 ,//if img succ uploades,return success:1
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})
//server production assests





//endpoint for adding roduct on mongodb 
//have to create schema for above step

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },

})

app.post('/addproduct',async(req,res)=>{
    let products =await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    //to save this in db
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//api for deleting products


app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})
//creating api for getting all products
app.get('/allproducts',async (req,res)=>{
   let products = await Product.find({});
   console.log("all products fetched successfully");
   res.send(products);
})
//schema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registering the user

app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same with email address"})
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})
//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
       const passCompare = req.body.password == user.password;
       if(passCompare){
        const data={
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
       }
       else{
        res.json({success:false,errors:"Wrong Password"});
       }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"});
    }
})

//creating endpoint for newcollection data
app.get('/newcollections',async(req,res)=>{
    let products =await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);

})

//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
  const token = req.header('auth-token');
  if(!token){
    return res.status(401).send({errors:"Please authenticate using valid token"});
  }
    try{
       const data = jwt.verify(token,'secret_ecom');
       req.user=data.user;
       next();
    }catch(error){
        res.status(401).send({errors:"Please authenticate using valid token"});
    }
  
}




//creating endpoint for popular section 

app.get('/popularindogs',async(req,res)=>{
   let products = await Product.find({category:"dog"});
   let popular_in_dogs = products.slice(0,4);
   console.log("Popular in dogs fetched");
   res.send(popular_in_dogs);
})

//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})
//creating endpoint to remove product from cartdata

app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//API creation
app.listen(port,(error)=>{
     if(!error){
        console.log("server running on port "+port)
     }else{
        console.log("error: "+error)
     }
})
