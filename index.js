/**
 * CRUD operation
 * adding a new expense -> /add-expense (post)
 * view existing ones -> /get-expenses (get)
 * edit existing entries -> /update-expense (put or patch)
 * deleting entries -> /delete-expense (delete)
 * 
 * adding a new user
 * validating existing user
 * 
 * monthly analysis
 */

const express =  require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const {Expense ,  User} = require('./schema.js')
const cors = require('cors');
const app = express();
app.use(bodyparser.json());
// it restricts the appliction to allow the user who should access it correctly
app.use(cors());

// providing  a generic port number to the backend application so that it can run on any system
const port = process.env.PORT || 5000;

async function connectionToDb(){
   try{
    // atlas connecting string present in driver .. code for establishing connection the database.
   await mongoose.connect('mongodb+srv://priyakoushiik:ejXwBPlOZydXoFan@cluster.jxv2eya.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster')
   app.listen(port,()=>{
       console.log("The app is listening in the port no 5000");
   })
   }catch(error){
    console.log(error);
    console.log("Connection cannot be established with the db");
   }
}

connectionToDb();

//schema defining

/**
 * Database name -> Expense Tracker,
 * Collections -> 
 *   i) Expense Details,
 *        -amount
 *        -category
 *        -date
 *   ii) User details
 *        -name
 *        
 */

app.post('/add-expense', async (req,res)=>{
        try{
            // creating a document in the collection .
            await Expense.create({
                "amount": req.body.amount,
                "category": req.body.category,
                "date":req.body.date
            })
            // sending a response that the field is added in the field.
            res.json({
                "status": "success",
                "message" : 'entery successfully added'
            })
        } catch(error){
            res.status(500).json({
              "status" : "failure",
              "message": "entry not created .",
              "error"  : error

            })
        }
})

app.get('/get-expenses', async (req,res)=>{
    try{
        const expenseDetail = await Expense.find();
    res.status(200).json({
        "message": expenseDetail
    })
    }catch(error){
        res.status(500).json({
            "status" : "failure",
            "message": "Data cannot be fetched.",
            "error"  : error
        })
    }
})

app.delete('/delete-expense/:id',async(req,res)=>{
       try{
        await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json({
            "status" : "success",
            "message":"entry deleted"
        })
       }   catch(error){
           res.status(500).json({
            "status": "failure",
            "message" : "couldn't delete entry.",
            "error":error
           })
       } 
})


app.patch('/update-expense/:id',async(req,res)=>{
    try{
     await Expense.findByIdAndUpdate(req.params.id,{
        "amount": req.body.amount,
        "category": req.body.category,
        "date": req.body.date
     })
     res.status(200).json({
        "status" : "success",
        "message" : "entry updated"
    })
    }   catch(error){
        res.status(500).json({
         "status": "failure",
         "message" : "couldn't update entry.",
         "error": error
        })
    } 
})