var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");
require("../Model/Package");
require("../Model/vendorData");
var packageModel = mongoose.model('Package');
var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});


Router.post('/addBackage',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){
  console.log(req.file.path);
  var name = req.body.name;
  var desc = req.body.desc;
  var img = req.file.path;
  var price = req.body.price;
  var categories=req.body.categories;
  var vendorId=req.body.vendorId;
  console.log(img);

    req.checkBody('name','name is empty').notEmpty();
    req.checkBody('desc','desc is empty').notEmpty();
    //req.checkBody('img','image is empty').notEmpty();
    req.checkBody('price','price is empty').notEmpty();
    req.checkBody('categories','categories is empty').notEmpty();
    req.checkBody('vendorId','vendor id not found').notEmpty();

    let errors = req.validationErrors();
    if(errors){
      resp.json(errors);
    }else{
      var packageDataModel = mongoose.model("Package");
      var mypackage = new packageDataModel({
        vendorId:req.body.vendorId,
        name:req.body.name,
        desc:req.body.desc,
        img:req.file.path,
        price:req.body.price,
        categories:req.body.categories,
        time:new Date()
      });
      mypackage.save(function(err,doc){
        if(err){
          resp.json(err);
      }else{
          console.log("saved")
          resp.json(doc);
      }
      });
    }
});
Router.get('/allPackages',function(req,resp,next){

    packageModel.find({}, function(err, packages) {
                      resp.json({ packages: packages});
                  });

});
module.exports=Router;
