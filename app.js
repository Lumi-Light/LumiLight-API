require("dotenv").config();
require("./config/database").connect();

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
var cors = require('cors');

const Light = require("./model/light");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
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

app.post("/update", async (req, res) => {


  if(req.body.ID && req.body.Loc){
    await Light.findOne({ _id: req.body.ID }, (err, foundLight) => {
      if(err){
        res.status(500).send(err);
      }else{
        if(!foundLight){
          res.status(404).send(`No light Found with ID ${req.body.ID}`);
        }else{
          foundLight.status = req.body.Status;
          foundLight.loc = req.body.Loc;

          foundLight.save((err) => {
            if(err){
              res.status(500).send(`ERROR!!`);
            }else{
              res.status(201).send(`Light Updated Successfully`);
            }
          });
        }
      }
    }).clone();
  }else{
    res.status(400).send("Please Provide all Fields");
  }
});

app.get("/map", async (req, res) => {

  await Light.find({status: false}, (err, foundLights) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.render("map", {defectiveLights: foundLights, isHome: false});
    }
  }).clone();
});

module.exports = app;
