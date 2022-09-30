const request = require("request");

const urlIP = "https://api.ipify.org?format=json";
let urlCoords = "http://ipwho.is/";

// iss.js
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
    let ipAddress = data.ip;
    callback(null, ipAddress);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(urlCoords += ip, (error, response, body) => {
    if (error) {
      callback("Your IP request has failed!", null);
      return;
    }

    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    let coordinates = { latitude: parsedBody.latitude, longitude: parsedBody.longitude };

    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback("Flyover times denied. CSIS has been notified.", null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTimes = JSON.parse(body);
    callback(null, flyOverTimes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOverTimes.response);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };