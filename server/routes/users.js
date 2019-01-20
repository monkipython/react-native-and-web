var express = require('express');
var router = express.Router();
var status = require('../common/status');
var User = require('../models/users');
var userModel = new User();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    code: status.SUCCESS.CODE,
    message: status.SUCCESS.MSG,
    data: null,
  });
});

/* POST user register. */
router.post('/register/', function(req, res, next) {

  if(typeof req.body.username == 'undefined'
  || typeof req.body.password == 'undefined'
  || typeof req.body.sex == 'undefined'
  || typeof req.body.fullname == 'undefined'
  ){
    res.send({
      code: status.NOT_EMPTY.CODE,
      message: status.NOT_EMPTY.MSG,
      data: null,
    });
  }

  if(userModel.userExist(req.body.username)){
    res.send({
      code: status.USER_EXISTS.CODE,
      message: status.USER_EXISTS.MSG,
      data: null,
    });
  }

  let result = userModel.signUp(req.body);

  if(result){
    res.send({
      code: status.SUCCESS.CODE,
      message: status.SUCCESS.MSG,
      data: result,
    });
  }else{
    res.send({
      code: status.SIGNUP_FAIL.CODE,
      message: status.SIGNUP_FAIL.MSG,
      data: null,
    });
  }
});

/* POST user login. */
router.post('/login/', function(req, res, next) {

  if(typeof req.body.username == 'undefined'
  || typeof req.body.password == 'undefined'){
      res.send({
        code: status.NOT_EMPTY.CODE,
        message: status.NOT_EMPTY.MSG,
        data: null,
      });
  }

  let result = userModel.signIn(req.body.username, req.body.password);

  if(result){
    res.send({
      code: status.SUCCESS.CODE,
      message: status.SUCCESS.MSG,
      data: result,
    });
  }else{
    res.send({
      code: status.NOT_MATCH.CODE,
      message: status.NOT_MATCH.MSG,
      data: null,
    });
  }
});

/* GET user login. */
router.get('/logout/:id', function(req, res, next) {
  if(typeof req.params.id == 'undefined'){
    res.send({
      code: status.NOT_EMPTY.CODE,
      message: status.NOT_EMPTY.MSG,
      data: null,
    });
  }

  let result = userModel.signOut(req.params.id);

  if(result){
    res.send({
      code: status.SUCCESS.CODE,
      message: status.SUCCESS.MSG,
      data: result,
    });
  }else{
    res.send({
      code: status.SIGNOUT_FAIL.CODE,
      message: status.SIGNOUT_FAIL.MSG,
      data: null,
    });
  }
});

/* GET user information. */
router.get('/info/:id/:token', function(req, res, next) {
  if(typeof req.params.id == 'undefined'
  || typeof req.params.token == 'undefined'){
    res.send({
      code: status.NOT_EMPTY.CODE,
      message: status.NOT_EMPTY.MSG,
      data: null,
    });
  }

  let result = userModel.getUser(req.params.id, req.params.token);

  if(result){
    res.send({
      code: status.SUCCESS.CODE,
      message: status.SUCCESS.MSG,
      data: result,
    });
  }else{
    res.send({
      code: status.USER_NOT_FOUND.CODE,
      message: status.USER_NOT_FOUND.MSG,
      data: null,
    });
  }
});

module.exports = router;
