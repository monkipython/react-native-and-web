var express = require('express');
var router = express.Router();

/* GET users index. */
router.get('/', function(req, res, next) {
  res.send({code:1, data: null, message: "user api"});
});

module.exports = router;
