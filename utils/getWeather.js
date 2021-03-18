const request = require("request")

const getWeather = (lat, long, callback) => {
  weatherSearchQuery =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=55b9bbb85cb8de7bece9233cb01fbd29&units=metric"

  request({ url: weatherSearchQuery, json: true }, (error, response) => {
    if (error) {
      callback("Couldn't reach the servers in weather" + error, undefined)
    } else if (response.body.error) {
      callback("wrong request", undefined)
    } else {
      const weather = response.body.weather[0].description
      const { temp_min, temp_max, humidity } = response.body.main
      const output_string =
        "weather is " +
        weather +
        ". temp_max= " +
        temp_max +
        "temp_min= " +
        temp_min +
        "  Humidity: " +
        humidity
      callback(undefined, output_string)
    }
  })
}

module.exports = getWeather
