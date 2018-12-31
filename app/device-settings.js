/*
  Responsible for loading, applying and saving settings.
  Requires companion/simple/companion-settings.js
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import { me as device } from "device";
import * as fs from "fs";
import * as messaging from "messaging";
import { inbox } from "file-transfer";

const SETTINGS_TYPE = "json";
const SETTINGS_FILE = "settingslVpGRFDPHzo14ZE2S.json";

let settings, onsettingschange;

export function initialize(callback) {
  settings = loadSettings();
  onsettingschange = callback;
  onsettingschange(settings);
}

inbox.onnewfile = processInbox;

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName === SETTINGS_FILE) {
      settings = loadSettings();
      onsettingschange(settings);
    }
  }
};

// Received message containing settings data
// /messaging.peerSocket.addEventListener("message", function(evt) {
//   settings[evt.data.key] = evt.data.value;
//   onsettingschange(settings);
// })

// Register for the unload event
// me.addEventListener("unload", saveSettings);

// Load settings from filesystem
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    return {};
  }
}

// Save settings to the filesystem
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}