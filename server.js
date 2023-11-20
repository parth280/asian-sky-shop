import express from "express";
import bcrypt from "bcrypt";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB16d62cBG1A8AFw-yOTyqOP1qks9R5F6k",
  authDomain: "asian-sky-shop.firebaseapp.com",
  projectId: "asian-sky-shop",
  storageBucket: "asian-sky-shop.appspot.com",
  messagingSenderId: "861771076026",
  appId: "1:861771076026:web:342a3fa5e85108d6a28d83"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
//init server
const app=express();

//middleware
app.use(express.static("public"));
app.use(express.json())
//routes
//home route
app.get('/',(req,res)=>{
    res.sendFile("index.html",{root : "public"})
})

app.get('/signup',(req,res)=>{
    res.sendFile("signup.html",{root : "public"})
})
app.post('/signup',(req,res)=>{
    const{name , email , password , number , tac } = req.body;
    //form validations
    if(name.length<3){
        res.json({'alert': 'name must be 3 letters long'});
    }else if(!email.length){
        res.json({'alert': 'enter your email'});
    }else if(password.length<8){
        res.json({'alert': 'password must be 8 letters long'});
    }else if(!Number(number) || number.length < 10){
        res.json({'alert': 'invalid number , please enter valid one'});
    }else if(!tac){
        res.json({'alert': 'you must agree to our terms and conditions'});
    }else{
        //store the data in db
        const users = collection(db,"users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({'alert' : 'email already exists'})
            }else{
                //encrypt the password
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(password, salt, (err, hash)=>{
                        req.body.password = hash;
                        req.body.seller = false;
                        //set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })
                    })
                })
            }
        })
    }
})
app.get('/login',(req,res) => {
    res.sendFile("login.html",{root : "public"})
})

app.post('/login',(req,res) => {
    let{email , password } =req.body;
    if(!email.length || !password.length){
        return res.json({  'alert': 'fill all the inputs'})
    }

    const users = collection(db, "users");

    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({'alert': 'email does not exists'});
        }else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                }else{
                    return res.json({'alert' : 'password is incorrect'})
                }
            })
        }
    })
})
//seller
app.get('/seller', (req,res) => {
    res.sendFile('seller.html', {root : "public"})
})

//404 route
app.get('/404',(req,res)=>{
    res.sendFile("404.html",{root : "public"})
})
app.listen(3000,()=>{
    console.log('listening on port 3000');
})
app.use((req,res)=>{
    res.redirect('/404')
})