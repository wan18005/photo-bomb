const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '/var/www/final.son-bts.com/images/',/*'../front-end/public/images/',*/
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const carSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    path: String,
    title: String,
    description: String,
    created: {
      type: Date,
      default: Date.now
    },
});

const Car = mongoose.model('Car', carSchema);
  
  // upload car
router.post("/", validUser, upload.single('car'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const car = new Car({
      user: req.user,
      path: "/images/" + req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });
    try {
      await car.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get my cars
router.get("/", validUser, async (req, res) => {
    // return cars
    try {
      let cars = await Car.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(cars);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get all cars
router.get("/all", async (req, res) => {
    try {
      let cars = await Car.find().sort({
        created: -1
      }).populate('user');
      return res.send(cars);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

//get a single car by id
router.get("/:id", async (req, res) => {
    try {
      let cars = await Car.findOne({
        _id: req.params.id
      });
      return res.send(cars);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

module.exports = {
    model: Car,
    routes: router,
}