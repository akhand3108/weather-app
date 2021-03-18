const request = require("request")

const getCoordinates = (address, callback) => {
  const geoSearchquery =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGFya29wdGltdXMiLCJhIjoiY2ttZDMyMDh3MmhqZDJ5bzlpYjJyeDl4aCJ9.iHjEP7-1NfO_qJfh5-Xlvw"

  request({ url: geoSearchquery, json: true }, (error, response) => {
    if (error) {
      callback("Unable to reach servers", undefined)
    } else if (response.body.features[0].length === 0) {
      callback("location not found", undefined)
    } else {
      place_name = response.body.features[0].place_name
      latitude = response.body.features[0].center[1]
      longitude = response.body.features[0].center[0]
      callback(undefined, { latitude, longitude, place_name })
    }
  })
}

module.exports = getCoordinates
