var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");
require("../Model/Package");
require("../Model/Category");
var categoryModel = mongoose.model('Category');


var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});

Router.post('/addCategory',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

  var name = req.body.name;
  var desc = req.body.desc;
  var img = req.body.img;

      var categoryDataModel = mongoose.model("Category");
      var myCategory = new categoryDataModel({
        name:req.body.name,
        desc:req.body.desc,
        img:req.file.path,
        time:new Date()
      });
      myCategory.save(function(err,doc){
        if(err){
          resp.json(err);
      }else{
          console.log("saved")
          resp.json(doc);
      }
      });
});


Router.get('/allCategory',function(req,resp,next){

    categoryModel.find({}, function(err, categories) {
                      resp.json({  categories:  categories});
                  });

});
module.exports=Router;
