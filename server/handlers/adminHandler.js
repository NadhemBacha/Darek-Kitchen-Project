const db = require('../database/controllers/Chef')
const mysql = require('mysql');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.addAdmin = (req,res)=>{
    
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(req.body.password,salt,function(err,hash){
            db.addAdmin([req.body.userName, req.body.email,hash],(err,result)=>{
                err ? console.log(err) : res.status(201).send(result)
        })
    })

})
}

module.exports.adminLogin = (req,res)=>{
    
    db.adminLogin(req.body.email,(err,result)=>{
   if (result.length>0){
      bcrypt.compare(req.body.password,result[0].password, (err,result)=>{
          if (err){
            return res.status(404).json({
                message: 'Authentication failed'
            })
          }else{
              if(result){
                  const token = jwt.sign({
                      email : req.body.email,
                      userId: req.params.id
                  }, 'secret', function(err,token){
                      res.status(200).json({
                          message : " authentication sucessful !",
                          token : token
                      })
                  })
              }else{
                res.status(404).json({message: 'Wrong Password!'})
              }
          }

     
      })
   }
    })
}

module.exports.postbrand = (req,res)=>{
db.postbrand([req.body.brandName, req.body.category , req.body.logo],(err,result)=>{
    err ? console.log(err) : res.status(201).send(result)
})
}


module.exports.deletebrand = (req,res)=>{
    db.deletebrand(req.params,(err,result)=>{
        err ? console.log(err) : res.status(201).send("brand deleted")

    })
}


module.exports.deleteUser = (req,res)=>{
    db.deleteUser(req.params,(err,result)=>{
        err ? console.log(err) : res.status(201).send("user account deleted")
    })
    
}

module.exports.deleteChef = (req,res)=>{
    db.deleteChef(req.params,(err,result)=>{
        err ? console.log(err) : res.status(201).send("cook account deleted")

    })
    
}

module.exports.updateBrand = (req,res)=>{
    db.updateBrand(req.params,(err,result)=>{
        err ? console.log(err) : res.status(201).send(result)
    })
}