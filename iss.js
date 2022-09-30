/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const urlIP = "https://api.ipify.org?format=json";
let urlCoords = "http://ipwho.is/";



const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(urlIP, (error, response, body) => {

    if (error) {
      callback("Your IP request has failed!", null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
    return data;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(urlCoords += ip, (error, response, body) => {
    if (error) {
      callback("Your IP request has failed!", null, null);
      return;
    }

    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    let coords = { latitude: parsedBody.latitude, longitude: parsedBody.longitude };

    console.log(coords);
    callback(null, coords);
    return;
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };