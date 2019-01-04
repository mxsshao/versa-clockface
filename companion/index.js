import { me } from "companion";
import { settingsStorage } from "settings";
import { outbox } from "file-transfer";
import * as cbor from 'cbor';
import * as weather from "fitbit-weather/companion";


const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settingslVpGRFDPHzo14ZE2S.cbor";

let settings = {};

function initialize() {
    //make sure the stored settings are up to date
    restoreSettings();
    if (settings.weather_api_key) {
        if (settings.weather_api_key.name) {
            weather.setup({
                provider: weather.Providers.openweathermap,
                apiKey: settings.weather_api_key.name
            });
        }
    }
}

function sendSettingsToWatch() {
    console.log("Sending settings");
    // console.log(JSON.stringify(settings));
    outbox.enqueue(SETTINGS_FILE, cbor.encode(settings));
}

// A user changes settings
settingsStorage.onchange = evt => {
    console.log("Settings changed");

    initialize();
    sendSettingsToWatch();
};

// Restore any previously saved settings
function restoreSettings() {
    for (let index = 0; index < settingsStorage.length; index++) {
        let key = settingsStorage.key(index);
        if (key) {
            var value = settingsStorage.getItem(key);
            try {
                settings[key] = JSON.parse(value);
            }
            catch(ex) {
                settings[key] = value;
            }
        }
    }
}

//restore old previous settings on load
initialize();
// Settings were changed while the companion was not running
if (me.launchReasons.settingsChanged) {
    // Send the value of the setting
    console.log("Settings changed while away");
    sendSettingsToWatch();
}