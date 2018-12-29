var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Package = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  name:String,
  vendorId:{
    type:Schema.ObjectId,
    ref:"vendorData"
  },
  desc:String,
  price:String,
  img:String,
  time:{
    type:Date,
    Default:Date.now()
  },
  categories :  [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

mongoose.model("Package",Package);
