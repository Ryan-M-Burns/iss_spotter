const request = require('request-promise-native');

const urlIP = "https://api.ipify.org?format=json";
let urlCoords = "http://ipwho.is/";

const fetchMyIP = function() {

  return request('https://api.ipify.org?format=json');
}




module.exports = { fetchMyIP }