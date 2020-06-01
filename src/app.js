const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express();

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Whether App",
    name: "Dave"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dave",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Dave",
    message: "HELP me please  please or help yourself whatever",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dave",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address"
    });
  } else {
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) res.send({ error });
      
      forecast(latitude, longitude, (forecastErr, forecast) => {
        if (forecastErr) {
          if (error) res.send({ error: forecastErr });
        }
        res.send({
          forecast,
          location,
          address: req.query.address
        });
      });
    });
    

  }
  
  
  
  
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term"
//     });
//   }
//   res.send({
//     products: []
//   });
// });

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dave",
    errorMessage: "Page not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000")
});