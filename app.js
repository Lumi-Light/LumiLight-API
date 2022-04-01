require("dotenv").config();
require("./config/database").connect();

const express = require('express');
const bodyParser = require('body-parser');

const Light = require("./model/light");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.render("index", {isHome: true});
});

app.get("/init", async (req, res) => {
  const light = await Light.create({
    status: true
  });

  if(light){
      res.status(201).send(light._id);
  }else{
    res.status(500).send("ERROR!!")
  }
});

module.exports = app;
