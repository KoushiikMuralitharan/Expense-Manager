const mongoose = require('mongoose');

// defining schema 
const expenseDetailsSchema = new mongoose.Schema({
  // here we specify the fields that are present in the collection.
  amount:{
    type:Number
  },
  category:{
    type: String
  },
  date:{
    type: String
  }
},{versionKey:false});

const userDetailsSchema = new mongoose.Schema({
  username:{
    type: String
  },
  emailID:{
    type: String
  },
  password:{
    type: String
  }
},{versionKey:false});

// creating a model 
// using the models only we execute the queries.
const Expense = mongoose.model('ExpenseDetails',expenseDetailsSchema);
const User = mongoose.model('UserDetails',userDetailsSchema);
module.exports={Expense , User};