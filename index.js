const express = require("express")
const cors = require("cors");
const app = express()

//middlware(use)
app.use(cors({
    origin : "http://localhost:3001"
}))

app.use(express.json());

let products = [];

//create
app.post("/product",(req,res) => {
  req.body.id = products.length + 1;
    products.push(req.body)
  res.json({message:"Product Added"})
})

//read
app.get("/products",(req,res) =>{
  //console.log(req.query)  
  res.json(products)
})

//URL parameter
app.put("/product/:productId" , (req,res) => {
    const productId = req.params.productId;
    
    const productIndex = products.findIndex((prod) => prod.id == productId)
    
    if(productIndex != -1) {
      const keys = Object.keys(req.body)
    keys.forEach((key) => {
      products[productIndex][key] = req.body[key]
    })
    //products[productIndex].price = req.body.price
    res.json({message:"done"});
    } else {
      res.status(404).json({ message : "product not found" });
    }
});

//Read product
app.get("/product/:productId" ,(req,res) => {
  const productId = req.params.productId;
  const productIndex = products.findIndex((prod) => prod.id == productId)
  res.json(products[productIndex])
})

//Delete product
app.delete("/product/:productId" , (req,res) => {
 const productId = req.params.productId;
 const productIndex = products.findIndex((prod) => prod.id == productId);
 products.splice(productIndex ,1);
 res.json({message : "Deleted"});
});


app.listen(3000) //anything bw 3000 to 8000
