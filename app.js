//Create http server
var express = require('express');

var server = express();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expressValidator = require('express-validator');
server.use(expressValidator());
//database connection
mongoose.connect('mongodb://localhost:27017/Makeup');


var AuthRouts = require('./controller/authClient');
server.use('/authClient',AuthRouts);
require('./Model/clientData');


var AuthRoutsVendor = require('./controller/authVendor');
server.use('/authVendor',AuthRoutsVendor);
require('./Model/vendorData');

var RouteBackage = require('./controller/backage');
server.use('/backage',RouteBackage);
require('./Model/Package');

var RouteCategory = require('./controller/category');
server.use('/category',RouteCategory);
require('./Model/Category');

var RoutePortflio = require('./controller/portflio');
server.use('/portflio',RoutePortflio);
require('./Model/Portflio');

var RoutePortflio = require('./controller/orders');
server.use('/orders',RoutePortflio);
require('./Model/orders');

server.listen(8090,function(){
  console.log('server listen at port number 8090 ...... ');
});
