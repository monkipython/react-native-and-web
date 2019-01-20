'use strict'
var path = require('path');
var fs = require('fs');
var sha1 = require('sha1');
var setting = require('../setting');
var fakeDataPath = path.join(setting.BASE_DIR, 'public') + "/dummydata/user.json";
var rawData = fs.readFileSync(fakeDataPath);
var userdata = JSON.parse(rawData);

class User{

  constructor(){
    this.restricts = ['password'];
    this.returnVal = false;
  }

  result(data){
    this.restricts.forEach((restrict) => {
      delete data[restrict];
    });
    return data;
  }

  userExist(username){
    userdata.filter((user) => {
      if (user.username === username){
        this.returnVal = true;
      }
    });
    return this.returnVal;
  }

  getUser(id, token){
    userdata.filter((user) => {
      if (user.id === id && user.token === token){
        this.returnVal = this.result(user);
      }
    });
    return this.returnVal;
  }

  signUp(params){
    params.id = userdata[userdata.length-1].id + 1;
    params.online = 1;
    params.token  = sha1(params.username);
    params.createdate = params.updatedate = new Date(Date()).toISOString();
    userdata.push(params);
    let jsData  = JSON.stringify(userdata);
    try{
      fs.writeFileSync(fakeDataPath, jsData);
      this.returnVal = true;
    }catch(err){
      console.log(err);
    }
    return this.returnVal;
  }

  signIn(username, password){
    userdata.filter((user) => {
       if(user.username === username && user.password === password){
         user.online = 1;
         user.token  = sha1(username);
         let jsData  = JSON.stringify(userdata);
         try{
           fs.writeFileSync(fakeDataPath, jsData);
           this.returnVal = this.result(user);
         }catch(err){
           console.log(err);
         }
       }
    });
    return this.returnVal;
  }

  signOut(id){
    userdata.filter((user) => {
       if(user.id.toString() === id){
         user.online = 0;
         user.token  = "";
         let jsData  = JSON.stringify(userdata);
         try{
           fs.writeFileSync(fakeDataPath, jsData);
           this.returnVal = this.result(user);
         }catch(err){
           console.log(err);
         }
       }
    });
    return this.returnVal;
  }
}

module.exports = User;
