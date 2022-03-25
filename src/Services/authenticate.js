const jwt = require('jsonwebtoken');
const user = require('../db/users');
const bcrypt = require('bcrypt');


// User login
const login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password; 


const loginUser = user.getUserByEmail(email, (user) => {
    //If user exists
    if (user.length > 0) {
     const hashpwd = user[0].password;
     // Create JSON Web Token
     const token = jwt.sign({userId: email}, process.env.SECRET_KEY);

    //If password matches, send the token
    if (bcrypt.compareSync(password, hashpwd))
      res.send({token});
    // Otherwise 
    else
      next();
      //res.sendStatus(400).end();
    }
    //If user doesn't exist
    else {
      next();
      //res.sendStatus(400).end();  
    }
  });

}

// User authentication
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
      res.sendStatus(400).end();
    }

      // Verify the received token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
     res.sendStatus(400).end();
   else
     next();
  }); 
}




module.exports = {
    authenticate: authenticate,
    login: login
  }