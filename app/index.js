import clock from "clock"; // needed to have a clock! (see line 33)
import document from "document"; // needed for I have no idea what! If you don't put this nothing works!!!
import { preferences } from "user-settings"; // needed to get the user preference 12h or 24h (see line 38)
import { zeroPad, getDayName, getMonthName, monoDigits, numberWithCommas } from "../common/utils"; // import user function zeroPad (see lines 43, 45, 46)
import { HeartRateSensor } from "heart-rate"; // import HR reading from sensor (seel line 18)
import { battery } from "power"; // import battery level (see line26)
import { today as activity_today, goals} from "user-activity";

// Update the clock every minute
clock.granularity = "seconds"; //clock is refreshing every sec. It is possible to select minutes as well

// Get a handle on the <text> elements specified in the index.gui file
const label_time = document.getElementById("label_time");
const label_seconds = document.getElementById("label_seconds");
const label_ampm = document.getElementById("label_ampm");
const label_date = document.getElementById("label_date");
// const batteryHandle = document.getElementById("batteryLabel");
const label_steps = document.getElementById("label_steps");
const label_cals = document.getElementById("label_cals");
const label_active = document.getElementById("label_active");
const label_heart = document.getElementById("label_heart");
const arc_steps = document.getElementById("arc_steps");
const arc_cals = document.getElementById("arc_cals");
const arc_active = document.getElementById("arc_active");
const arc_heart = document.getElementById("arc_heart");

// The following block read the heart rate from your watch
const hrm = new HeartRateSensor();

hrm.onreading = function () {
    let heart = (hrm.heartRate || 0)
    let disp_heart = "";
    if (heart === 0) {
        disp_heart = "---";
    } else {
        disp_heart = monoDigits(heart);
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
hrm.start();


// Update the <text> element every tick with the current time
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
    let disp_hours = monoDigits(zeroPad(hours));
    let disp_mins = monoDigits(zeroPad(mins));
    let disp_secs = monoDigits(zeroPad(secs));

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
        disp_steps = numberWithCommas(monoDigits(steps));
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
        disp_calories = numberWithCommas(monoDigits(calories));
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
        disp_active = monoDigits(active);
    }
    let angle_active = (active / goal_active) * 360;
    if (angle_active > 360) {
        angle_active = 360;
    }
    label_active.text = disp_active;
    arc_active.sweepAngle = angle_active;







    // Battery Measurement
    let batteryValue = battery.chargeLevel; // measure the battery level and send it to the variable batteryValue

    // Assignment value battery
    // batteryHandle.text = `Batt: ${batteryValue} %`; // the string including the batteryValue is being sent to the batteryHandle set at line 14


}
