const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/Dealership', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '/var/www/final.son-bts.com/images/',/*'../front-end/public/images/',*/
  limits: {
    fileSize: 10000000
  }
});


                                       // Brand part//
// Create a scheme for brands in the dealership: a name, a description, and a path to an image.
const brandSchema = new mongoose.Schema({
  name: String,
  text: String,    
  path: String,
});

// Create a model for brands in the dealership.
const Brand = mongoose.model('Brand', brandSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});


// Create a new vehicle in the dealership: takes a name, a description and a path to an image.
app.post('/api/brands', async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    text: req.body.text,    //description 
    path: req.body.path,
  });
  try {
    await brand.save();
    res.send(brand);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the brands in the dealership.
app.get('/api/brands', async (req, res) => {
  try {
    let brands = await Brand.find();
    res.send(brands);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findOne({
      _id: req.params.id
    });
    brand.name = req.body.name;
    brand.text = req.body.text;    //description for Edit 
    await brand.save();
    res.send(brand);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/brands/:id', async (req, res) => {
  try {
    await Brand.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

                                      // Model part//
const vehicleSchema = new mongoose.Schema({
    /*brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'
    },*/
    carName: String,
    miles: String,
    price: String,  
    title: String,
    path: String,
    make: String,
})

// Model for vehicles
const Vehicle = mongoose.model('Vehicle',vehicleSchema);

app.post('/api/vehicles', async (req, res) => {
    const vehicle = new Vehicle({
      carName: req.body.carName,
      miles: req.body.miles,
      price: req.body.price,
      title: req.body.title,
      path: req.body.path,
      make: req.body.make,
    });
    try {
      await vehicle.save();
      res.send(vehicle);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/vehicles', async (req, res) => {
    try {
        let vehicles = await Vehicle.find();
        res.send(vehicles);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findOne({
      _id: req.params.id
    });
    brand.name = req.body.name;
    brand.text = req.body.text;    //description for Edit 
    await brand.save();
    res.send(brand);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({
          _id: req.params.id
        });    
        vehicle.carName = req.body.carName,
        vehicle.miles = req.body.miles,
        vehicle.price = req.body.price,
        vehicle.title = req.body.title,
        vehicle.make = req.body.make,
        await vehicle.save();
        res.send(vehicle);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/vehicles/:id', async (req, res) => {
    try {
        await Vehicle.deleteOne({
          _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const users = require("./users.js");
app.use("/api/users", users.routes);

const cars = require("./cars.js");
app.use("/api/cars", cars.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));
