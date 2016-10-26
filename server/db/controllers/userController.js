var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var createUser = (body) =>{
    var data = {
        name: body.name,
        username: body.username,
        email: body.email,
        password: body.password
    }
    //data.password = hashPassword(body.password)
    return new User(data).save()
  }

var comparePassword = (attemptedPassword, password, callback)=> {
  bcrypt.compare(attemptedPassword, password, (err, isMatch) =>{
    callback(isMatch);
  });
}
var hashPassword = (password)=>{
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(password, null, null).bind(this)
    .then((hash) => {
      return hash;
    });
}
  module.exports = {
    hashPassword:hashPassword,
    comparePassword:comparePassword,
    createUser:createUser
  }

