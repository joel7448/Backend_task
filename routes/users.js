const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const authenticate = require("../verifytoken");



//User register route
router.post("/signup",async function (req, res){
 
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  req.body.password = hash;
    const newUser = new User({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
      
        email: req.body.email,
        password: req.body.password,
        address:req.body.address,
        
      });
      try {
        const user = await newUser.save();
        res.status(201).json("User registered");
      } catch (err) {
        res.status(500).json(err);
      }
})


router.post("/signin",async function(req, res) {
    try{
  const user = await User.findOne({email:req.body.email});
  console.log(user);
  if(user){
    console.log(req.body.password);
   
   const bytes = await bcrypt.compare(req.body.password, user.password);
   console.log(bytes);
   if(bytes){
    const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"5d"});
    res.json({
      message : "Successfully logged in",
      userid : user._id,
      token,
      email:user.email
    })
    
   }
   else{
    res.status(401).json({
      message : "Invalid password"
    });
   }
  }
  else{
    res.status(401).json({
      message : "Invalid username"
    });
  }
  
    }
    catch(error){
      res.status(500).json({
        message : error
      });
    }
  })




  //password reset
  router.put("/forgotpassword",async function(req,res){
    try{
      var str = 'abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var password = "";

      for(let i=0;i<8;i++){
        password+=str.charAt(Math.floor(Math.random()*str.length)); //random password generator
      }

req.body.password = password;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joel.joel52@gmail.com',
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: 'joel.joel52@gmail.com',
  to: `${req.body.email}`,
  subject: `Password Change`,
  html:`<p>Your new password is ${req.body.password}</p>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.json({
      message:"Error"
  })
  } else {
    console.log('Email sent: ' + info.response);
    res.json({
      message: "Verification code has been sent to your mail"
     
  })
  }
});



      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
   const find = await User.findOneAndUpdate({email:req.body.email},{
    $set:{"password":req.body.password}
   })
   res.status(200).json("Password Successfully Changed");
}
catch(err){
  res.status(500).json(err)
console.log(err);
}
  })

  //Mail route

  router.post("/mailsend",authenticate,async function(req,res){
    
    try {
   

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'joel.joel52@gmail.com',
            pass: process.env.PASS
          }
        });

        var mailOptions = {
          from: 'joel.joel52@gmail.com',
          to: `${req.body.email}`,
          subject: `${req.body.subject}`,
          html:`<p>${req.body.message}</p>`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.json({
              message:"Error"
          })
          } else {
            console.log('Email sent: ' + info.response);
            res.json({
              message: "Verification code has been sent to your mail"
             
          })
          }
        });
      


      res.status(201).json(`Mail sent`);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  })

  

module.exports = router;