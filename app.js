const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const { mySplit } = require("./utils");


const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

const app = express();
app.use(bodyparser.json());

client.connect();

const db = client.db("engine");
const collection = db.collection("pages");


  
 


app.get("/search", async (req, res) => {
    const term = req.query.q;
    if (!term) {
        return res.status(400).send("Query term if required");
    }
    const page = await collection.find({terms:term}).toArray();
    if (page.length == 0) {
        return res.status(400).send("Data not found");
    }
    return res.status(200).send(page);

});

app.post("/crawl", async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).send("Title and content must be included");
    }

    await collection.insertOne({title,terms: mySplit(content)});
    res.status(200).send("Inserted successfully");


});





app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
//run().catch(console.log);




