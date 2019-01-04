import clock from "clock"; // needed to have a clock! (see line 33)
import document from "document"; // needed for I have no idea what! If you don't put this nothing works!!!
import { preferences } from "user-settings"; // needed to get the user preference 12h or 24h (see line 38)
import { getDayName, getMonthName, monoDigits, numberWithCommas, getWeatherIcon } from "../common/utils"; // import user function zeroPad (see lines 43, 45, 46)
import { HeartRateSensor } from "heart-rate"; // import HR reading from sensor (seel line 18)
import { BodyPresenceSensor } from "body-presence";
import { battery, charger } from "power"; // import battery level (see line26)
import { today as activity_today, goals} from "user-activity";
import { display } from "display";
import * as weather from "fitbit-weather/app";
import * as fs from "fs";
import * as cbor from 'cbor';
import { inbox } from "file-transfer";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settingslVpGRFDPHzo14ZE2S.cbor";

let default_settings = {
    fahrenheit: false
};
let settings = default_settings;

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the elements specified in the index.gui file
const label_battery = document.getElementById("label_battery");
const battery_base_1 = document.getElementById("battery_base_1");
const battery_base_2 = document.getElementById("battery_base_2");
const battery_1 = document.getElementById("battery_1");
const battery_2 = document.getElementById("battery_2");
const battery_3 = document.getElementById("battery_3");
const battery_4 = document.getElementById("battery_4");
const weather_location = document.getElementById("weather_location");
const weather_temp = document.getElementById("weather_temp");
const weather_icon = document.getElementById("weather_icon");
const label_time = document.getElementById("label_time");
const label_seconds = document.getElementById("label_seconds");
const label_ampm = document.getElementById("label_ampm");
const label_date = document.getElementById("label_date");
const label_steps = document.getElementById("label_steps");
const label_cals = document.getElementById("label_cals");
const label_active = document.getElementById("label_active");
const label_heart = document.getElementById("label_heart");
const arc_steps = document.getElementById("arc_steps");
const arc_cals = document.getElementById("arc_cals");
const arc_active = document.getElementById("arc_active");
const arc_heart = document.getElementById("arc_heart");
const line = document.getElementsByClassName("line");
const act_steps = document.getElementsByClassName("act_steps");
const act_cals = document.getElementsByClassName("act_cals");
const act_active = document.getElementsByClassName("act_active");
const act_heart = document.getElementsByClassName("act_heart");

let updateWeather = function() {
    try {
        weather.fetch(30 * 60 * 1000) // Return the cached value if it is less than 30 minutes old 
            .then(function(weather) {
                let location = weather.location;
                if (location.length > 18) {
                    let x = location.substr(0, 14);
                    x = x.replace(/\s$/, "")
                    location = x + "...";
                }
                weather_location.text = location;

                let temp, disp_temp;
                if (settings.fahrenheit) {
                    temp = weather.temperatureF;
                    disp_temp = monoDigits(temp.toFixed(1));
                    weather_temp.text = `${disp_temp}°F`;
                } else {
                    temp = weather.temperatureC; 
                    disp_temp = monoDigits(temp.toFixed(1));
                    weather_temp.text = `${disp_temp}°C`;
                }

                // Workaround to deal with openweathermap date quirks.
                // OWM gives sunrise/sunset in UTC time but gives the wrong date.
                let now = new Date();
                let c_now = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
                // Convert sunrise and sunset into local time.
                let sunrise = new Date(0);
                sunrise.setUTCMilliseconds(weather.sunrise);
                let sunset = new Date(0);
                sunset.setUTCMilliseconds(weather.sunset);
                // Compare the time only since date is incorrect.
                let c_sunrise = sunrise.getHours() * 3600 + sunrise.getMinutes() * 60 + sunrise.getSeconds();
                let c_sunset = sunset.getHours() * 3600 + sunset.getMinutes() * 60 + sunset.getSeconds();
                let is_day = (c_now > c_sunrise && c_now < c_sunset);
                weather_icon.href = getWeatherIcon(weather.realConditionCode, is_day);
                
                // console.log(c_now);
                // console.log(c_sunrise);
                // console.log(c_sunset);
                // console.log(JSON.stringify(weather));
            });
    } catch (e) {
        weather_temp.text = "";
        weather_location.text = "";
        weather_icon.href = "";
    }
}

display.onchange = function () {
    if (display.on) {
        updateWeather();
    }
}

// SETTINGS
function loadSettings() {
    try {
        settings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
        transformSettings();
        mergeWithDefaultSettings();
        // console.log(JSON.stringify(settings));
    } catch (e) {
        console.log(e);
        settings = default_settings;
    }
    try {
        applySettings();
    } catch (e) {
        console.log(e);
        fs.unlinkSync(SETTINGS_FILE);
    }
}

function transformSettings() {
    //change all settings you want in another format as sent by the companion here
    if (settings.fahrenheit) {
        settings.fahrenheit = settings.fahrenheit.values[0].value;
    }
}

function mergeWithDefaultSettings() {
    for (let key in default_settings) {
        if (!settings.hasOwnProperty(key)) {
        settings[key] = default_settings[key];
        }
    }
}

function applySettings() {
    if (settings.color_line) {
        for (let i = 0; i < line.length; i++) {
            line[i].style.fill = settings.color_line;
        }
    }
    if (settings.color_steps) {
        for (let i = 0; i < act_steps.length; i++) {
            act_steps[i].style.fill = settings.color_steps;
        }
    }
    if (settings.color_cals) {
        for (let i = 0; i < act_cals.length; i++) {
            act_cals[i].style.fill = settings.color_cals;
        }
    }
    if (settings.color_active) {
        for (let i = 0; i < act_active.length; i++) {
            act_active[i].style.fill = settings.color_active;
        }
    }
    if (settings.color_heart) {
        for (let i = 0; i < act_heart.length; i++) {
            act_heart[i].style.fill = settings.color_heart;
        }
    }
    updateWeather();
}


function processInbox() {
    let fileName;
    while (fileName = inbox.nextFile()) {
        if (fileName === SETTINGS_FILE) {
            loadSettings();
            console.log("Settings received");
        }
    }
}

loadSettings();
inbox.onnewfile = processInbox;

// Heart rate and body sensors
const hrm = new HeartRateSensor();
const body = new BodyPresenceSensor();

hrm.onreading = function () {
    let heart = (hrm.heartRate || 0)
    let disp_heart = "";
    if (heart === 0) {
        disp_heart = "---";
    } else {
        disp_heart = monoDigits(heart, false);
    }
    let angle_heart = ((heart - 50) / 110) * 360;
    if (angle_heart > 360) {
        angle_heart = 360;
    } else if (angle_heart < 0) {
        angle_heart = 0;
    }
    label_heart.text = disp_heart;
    arc_heart.sweepAngle = angle_heart;
}
hrm.onerror = function() {
    label_heart.text = "---";
    arc_heart.sweepAngle = 0;
}
label_heart.text = "---";
arc_heart.sweepAngle = 0;

body.onreading = () => {
    if (!body.present) {
        label_heart.text = "---";
        arc_heart.sweepAngle = 0;
        hrm.stop();
    } else {
        hrm.start();
    }
};
body.start();


// Update handler each tick
clock.ontick = (evt) => {
    const now = evt.date; // get the actual instant
    let hours = now.getHours(); // separate the actual hours from the instant "now"
    let mins = now.getMinutes(); // separate the actual minute from the instant "now"
    let secs = now.getSeconds();
    let day = now.getDay();
    let date = now.getDate();
    let month = now.getMonth();
    
    let ampm = "";

    // Check 12 or 24 hours
    if (preferences.clockDisplay === "12h") {
        if (hours > 12){
            ampm = "PM";
            hours -= 12;
        } else if (hours == 12){
            ampm = "PM"
        } else if (hours == 0) {
            ampm = "AM";
            hours += 12;
        } else {
            ampm = "AM";
        }
    }

    // Format numbers for display
    let disp_hours = monoDigits(hours);
    let disp_mins = monoDigits(mins);
    let disp_secs = monoDigits(secs);

    // Time in format hh:mm:ss
    label_time.text = `${disp_hours}:${disp_mins}`;
    label_seconds.text = `:${disp_secs}`;
    label_ampm.text = ampm;

    let disp_day = getDayName(day);
    let disp_month = getMonthName(month);
    label_date.text = `${disp_day} ${date} ${disp_month}`;

    // Activity - Steps
    let steps = (activity_today.adjusted["steps"] || 0);
    let goal_steps = (goals["steps"] || 0);
    let disp_steps = "";
    if (steps === 0) {
        disp_steps = "---";
    } else {
        disp_steps = numberWithCommas(monoDigits(steps, false));
    }
    let angle_steps = (steps / goal_steps) * 360;
    if (angle_steps > 360) {
        angle_steps = 360;
    }
    label_steps.text = disp_steps;
    arc_steps.sweepAngle = angle_steps;

    // Activity - Calories
    let calories = (activity_today.adjusted["calories"] || 0);
    let goal_calories = (goals["calories"] || 0);
    let disp_calories = "";
    if (calories === 0) {
        disp_calories = "---";
    } else {
        disp_calories = numberWithCommas(monoDigits(calories, false));
    }
    let angle_calories = (calories / goal_calories) * 360;
    if (angle_calories > 360) {
        angle_calories = 360;
    }
    label_cals.text = disp_calories;
    arc_cals.sweepAngle = angle_calories;

    // Activity - Exercise time
    let active = (activity_today.adjusted["activeMinutes"] || 0);
    let goal_active = (goals["activeMinutes"] || 0);
    let disp_active = "";
    if (active === 0) {
        disp_active = "---";
    } else {
        disp_active = monoDigits(active, false);
    }
    let angle_active = (active / goal_active) * 360;
    if (angle_active > 360) {
        angle_active = 360;
    }
    label_active.text = disp_active;
    arc_active.sweepAngle = angle_active;

    // if (secs === 0) {
    //     updateWeather();
    // }

    // Battery Measurement
    let batt = Math.floor(battery.chargeLevel);
    let disp_batt = "";
    if (batt > 0) {
        disp_batt = monoDigits(batt, false) + "%";
    }
    label_battery.text = disp_batt;
    if (!charger.connected) {
        if (batt > 85) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "visible";
            battery_3.style.visibility = "visible";
            battery_4.style.visibility = "visible";
            battery_1.style.fill = "#a0a0a0";
            battery_2.style.fill = "#a0a0a0";
        } else if (batt > 60) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "visible";
            battery_3.style.visibility = "visible";
            battery_4.style.visibility = "hidden";
            battery_1.style.fill = "#a0a0a0";
            battery_2.style.fill = "#a0a0a0";
        } else if (batt > 35) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "visible";
            battery_3.style.visibility = "hidden";
            battery_4.style.visibility = "hidden";
            battery_1.style.fill = "#ccac28";
            battery_2.style.fill = "#ccac28";
        } else if (batt > 16) {
            battery_base_1.style.visibility = "visible";
            battery_base_2.style.visibility = "visible";
            battery_1.style.visibility = "visible";
            battery_2.style.visibility = "hidden";
            battery_3.style.visibility = "hidden";
            battery_4.style.visibility = "hidden";
            battery_1.style.fill = "#c63033";
        } else {
            battery_base_1.style.visibility = "hidden";
            battery_base_2.style.visibility = "hidden";
            battery_1.style.visibility = "hidden";
            battery_2.style.visibility = "hidden";
            battery_3.style.visibility = "hidden";
            battery_4.style.visibility = "hidden";
        }
    } else {
        battery_base_1.style.visibility = "hidden";
        battery_base_2.style.visibility = "hidden";
        battery_1.style.visibility = "hidden";
        battery_2.style.visibility = "hidden";
        battery_3.style.visibility = "hidden";
        battery_4.style.visibility = "hidden";
    }
}
