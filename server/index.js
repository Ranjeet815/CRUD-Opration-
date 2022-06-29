const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const FoodModel = require("./models/Food")
const app = express();
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://Ranjeet:ranjeet@crud.iaw9l.mongodb.net/Food?retryWrites=true&w=majority", {
    useNewUrlParser: true
});
app.post("/insert", async (req, res)=>{
    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName:foodName,daysSinceIAte:days});
    try{
        await food.save();
        res.send("inserted data")
    }catch (err){
     console.log(err);
    }
});
app.get("/read",async (req, res)=>{
    FoodModel.find({}, (err, result )=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    }) ;

});
app.put("/update", async (req, res)=>{
    const newfoodName = req.body.newfoodName
    const id = req.body.id
    try{
        FoodModel.findById(id, (err,updateFood)=>{
            updateFood.foodName = newfoodName
            updateFood.save()
            res.send("update")
        })
    }catch (err){
     console.log(err);
    }
});

app.delete("/delete/:id" , async (req, res)=>{
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
   res.send("delted record")

})
app.listen(3001, () =>{
    console.log("server is runing  port number 3001..")
});

