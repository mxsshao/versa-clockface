import { peerSocket } from 'messaging';
import { readFileSync, writeFileSync } from 'fs';
export { Conditions } from './common';

var weather = undefined;

var WEATHER_DATA_FILE = "276e3d15-ffae-4a07-bda5-f1851e68cc77"; // should be a unique name

var promises = {};
var requests = [];

var readWeatherFile = function readWeatherFile() {
  try {
    weather = readFileSync(WEATHER_DATA_FILE, 'cbor');
  } catch (n) {
    weather = undefined;
  }
};

var writeWeatherFile = function writeWeatherFile() {
  try {
    writeFileSync(WEATHER_DATA_FILE, weather, 'cbor');
  } catch (n) {}
};

var sendRequest = function sendRequest(r) {
  if (peerSocket.readyState === peerSocket.OPEN) {
    peerSocket.send(r);
  } else {
    requests.push(r);
  }
};

peerSocket.addEventListener('message', function (evt) {
  var _evt$data = evt.data,
      weather_message_id = _evt$data.weather_message_id,
      data = _evt$data.data,
      error = _evt$data.error;

  if (weather_message_id) {
    var promise = promises[weather_message_id];
    if (promise) {
      if (error) {
        promise.reject(error);
      } else {
        weather = data;
        weather.timestamp = Date.now();
        writeWeatherFile();
        promise.resolve(weather);
      }
      delete promises[weather_message_id];
    }
  }
});

peerSocket.addEventListener('open', function (evt) {
  setTimeout(function () {
    requests.forEach(function (r) {
      return sendRequest(r);
    });
    requests.length = 0;
  }, 500);
});

peerSocket.addEventListener('error', function (err) {
  console.log("Connection error: " + err.message);
  // I don't know what to do in this case yet... Notify every promises object ?
});

export var fetch = function fetch() {
  var maximumAge = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


  if (weather === undefined) {
    readWeatherFile();
  }

  return new Promise(function (resolve, reject) {
    var now = Date.now();
    if (weather && now - weather.timestamp < maximumAge) {
      resolve(weather);
    } else {
      promises[now] = { resolve: resolve, reject: reject };
      sendRequest({ weather_message_id: now });
    }
  });
};

export var get = function get() {
  if (weather === undefined) {
    readWeatherFile();
  }
  return weather;
};