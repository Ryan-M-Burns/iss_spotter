// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');
let ipAddress = "";











// fetchCoordsByIP(ipAddress, (error, coords) => {
// if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`It worked! Returned Coordinates! \nLatitude ${coords.latitude}\nLongitude ${coords.longitude}`);
// });

// fetchMyIP test
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
//   ipAddress = ip;
// });