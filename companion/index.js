import { me } from "companion";
import { settingsStorage } from "settings";
import { outbox } from "file-transfer";
import * as cbor from 'cbor';
import * as weather from "fitbit-weather/companion";


const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settingslVpGRFDPHzo14ZE2S.cbor";

weather.setup({
    provider: weather.Providers.openweathermap,
    apiKey: "17b69216de64de6cc6d7f786e40d8a09"
});

let settings = {};

function initialize() {
    //make sure the stored settings are up to date
    restoreSettings();
}

function sendSettingsToWatch() {
    console.log("Sending settings");
    restoreSettings();
    outbox.enqueue(SETTINGS_FILE, cbor.encode(settings));
}

// A user changes settings
settingsStorage.onchange = evt => {
    console.log("Settings changed");
    //settings[evt.key] = JSON.parse(evt.newValue);
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