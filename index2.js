const request = require('request-promise-native');
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./printPassTimes');

nextISSTimesForMyLocation()
.then(passTimes => {
  printPassTimes(passTimes);
})
  .catch((error) => {
    console.log("Encountered an error: ", error.message);
  });