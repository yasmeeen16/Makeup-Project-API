var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subCategory = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  categId:{
         type:Number,
         ref:"Category"
     },
  name:String,
  time:{
    type:Date,
    Default:Date.now()
  }
});

mongoose.model("Category",Category);
