// index.js
//const { printPassTimes } = require('./printPassTimes');
const { nextISSTimesForMyLocation } = require('./iss');
const { printPassTimes } = require('./printPassTimes');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

// Tests for iss.js
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);

//   fetchCoordsByIP(ip, (error, coords) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }

//     console.log(`It worked! Returned Coordinates! \nLatitude ${coords.latitude}\nLongitude ${coords.longitude}`);
  
//     fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }
    
//       console.log(`It worked! Here are the ISS flyover times: ${flyOverTimes}`);
//     });
//   });
// });