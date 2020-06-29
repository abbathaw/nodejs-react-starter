var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS and React Starter' });
});

router.get('/account', function(req, res, next) {
  const account = req.app.db.get("account").cloneDeep().value()
  res.json({ account });
});


module.exports = router;
