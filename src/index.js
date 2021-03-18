const express = require("express")
const path = require("path")
const hbs = require("hbs")
getCoordinates = require("../utils/getCoordinates")
getWeather = require("../utils/getWeather")
const app = express()

const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setting up view engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

const PORT = process.env.PORT || 80
console.log(PORT)

// Set up public directory
app.use(express.static(publicDirPath))

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Akhand Patel" })
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Akhand Patel" })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    })
  }

  getCoordinates(req.query.address, (error, response) => {
    if (error) {
      res.json({ error })
    } else {
      const { latitude, longitude, place_name } = response

      getWeather(latitude, longitude, (error, response) => {
        if (error) return res.json({ error })
        res.json({
          forecast: response,
          place_name,
          address: req.query.address,
        })
      })
    }
  })
})

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Akhand Patel" })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Page",
    errorMessage: "Couldn't find the article ",
    name: "Akhand Patel",
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page not found",
    errorMessage: "You seem a little lost",
    name: "Akhand Patel",
  })
})

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT)
})
