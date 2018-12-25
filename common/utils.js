// Add zero in front of numbers < 10
export function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export function getDayName(index) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[index];
}

export function getMonthName(index) {
    let months = ["January", "February", "March", "April", "Mayay", "June", "July", "August", "September", "October", "November", "December"];
    return months[index];
}

// Convert a number to a special monospace number
export function monoDigits(num, pad = true) {
    let monoNum = '';
    if (typeof num === 'number') {
        num |= 0;
        if (pad && num < 10) {
            monoNum = c0 + monoDigit(num);
        } else {
            while (num > 0) {
                monoNum = monoDigit(num % 10) + monoNum;
                num = (num / 10) | 0;
            }
        }
    } else {
        let text = num.toString();
        let textLen = text.length;
        for (let i = 0; i < textLen; i++) {
            monoNum += monoDigit(text.charAt(i));
        }
    }
    return monoNum;
}

const c0 = String.fromCharCode(0x10);
const c1 = String.fromCharCode(0x11);
const c2 = String.fromCharCode(0x12);
const c3 = String.fromCharCode(0x13);
const c4 = String.fromCharCode(0x14);
const c5 = String.fromCharCode(0x15);
const c6 = String.fromCharCode(0x16);
const c7 = String.fromCharCode(0x17);
const c8 = String.fromCharCode(0x18);
const c9 = String.fromCharCode(0x19);

function monoDigit(digit) {
    switch (digit) {
        case 0: return c0;
        case 1: return c1;
        case 2: return c2;
        case 3: return c3;
        case 4: return c4;
        case 5: return c5;
        case 6: return c6;
        case 7: return c7;
        case 8: return c8;
        case 9: return c9;
        case '0': return c0;
        case '1': return c1;
        case '2': return c2;
        case '3': return c3;
        case '4': return c4;
        case '5': return c5;
        case '6': return c6;
        case '7': return c7;
        case '8': return c8;
        case '9': return c9;
        default: return digit;
    }
}

export function numberWithCommas(x) {
    if (x.length > 3) {
        let position = x.length - 3;
        return x.substr(0, position) + "," + x.substr(position);
    } else {
        return x;
    }
}

export function getWeatherIcon(code, day) {
    if (day) {
        switch(code) {
            case 200: return "weather/wi-day-thunderstorm.png";
            case 201: return "weather/wi-day-thunderstorm.png";
            case 202: return "weather/wi-day-thunderstorm.png";
            case 210: return "weather/wi-day-lightning.png";
            case 211: return "weather/wi-day-lightning.png";
            case 212: return "weather/wi-day-lightning.png";
            case 221: return "weather/wi-day-lightning.png";
            case 230: return "weather/wi-day-thunderstorm.png";
            case 231: return "weather/wi-day-thunderstorm.png";
            case 232: return "weather/wi-day-thunderstorm.png";
            case 300: return "weather/wi-day-sprinkle.png";
            case 301: return "weather/wi-day-sprinkle.png";
            case 302: return "weather/wi-day-rain.png";
            case 310: return "weather/wi-day-rain.png";
            case 311: return "weather/wi-day-rain.png";
            case 312: return "weather/wi-day-rain.png";
            case 313: return "weather/wi-day-rain.png";
            case 314: return "weather/wi-day-rain.png";
            case 321: return "weather/wi-day-sprinkle.png";
            case 500: return "weather/wi-day-sprinkle.png";
            case 501: return "weather/wi-day-rain.png";
            case 502: return "weather/wi-day-rain.png";
            case 503: return "weather/wi-day-rain.png";
            case 504: return "weather/wi-day-rain.png";
            case 511: return "weather/wi-day-rain-mix.png";
            case 520: return "weather/wi-day-showers.png";
            case 521: return "weather/wi-day-showers.png";
            case 522: return "weather/wi-day-showers.png";
            case 531: return "weather/wi-day-storm-showers.png";
            case 600: return "weather/wi-day-snow.png";
            case 601: return "weather/wi-day-sleet.png";
            case 602: return "weather/wi-day-snow.png";
            case 611: return "weather/wi-day-rain-mix.png";
            case 612: return "weather/wi-day-rain-mix.png";
            case 615: return "weather/wi-day-rain-mix.png";
            case 616: return "weather/wi-day-rain-mix.png";
            case 620: return "weather/wi-day-rain-mix.png";
            case 621: return "weather/wi-day-snowcase .png";
            case 622: return "weather/wi-day-snow.png";
            case 701: return "weather/wi-day-showers.png";
            case 711: return "weather/wi-smoke.png";
            case 721: return "weather/wi-day-haze.png";
            case 731: return "weather/wi-dust.png";
            case 741: return "weather/wi-day-fog.png";
            case 761: return "weather/wi-dust.png";
            case 762: return "weather/wi-dust.png";
            case 781: return "weather/wi-tornado.png";
            case 800: return "weather/wi-day-sunny.png";
            case 801: return "weather/wi-day-cloudy-gusts.png";
            case 802: return "weather/wi-day-cloudy-gusts.png";
            case 803: return "weather/wi-day-cloudy-gusts.png";
            case 804: return "weather/wi-day-sunny-overcast.png";
            case 900: return "weather/wi-tornado.png";
            case 902: return "weather/wi-hurricane.png";
            case 903: return "weather/wi-snowflake-cold.png";
            case 904: return "weather/wi-hot.png";
            case 906: return "weather/wi-day-hail.png";
            case 957: return "weather/wi-strong-wind.png";
            default: return "";
        }
    } else {
        switch(code) {
            case 200: return "weather/wi-night-alt-thunderstorm.png";
            case 201: return "weather/wi-night-alt-thunderstorm.png";
            case 202: return "weather/wi-night-alt-thunderstorm.png";
            case 210: return "weather/wi-night-alt-lightning.png";
            case 211: return "weather/wi-night-alt-lightning.png";
            case 212: return "weather/wi-night-alt-lightning.png";
            case 221: return "weather/wi-night-alt-lightning.png";
            case 230: return "weather/wi-night-alt-thunderstorm.png";
            case 231: return "weather/wi-night-alt-thunderstorm.png";
            case 232: return "weather/wi-night-alt-thunderstorm.png";
            case 300: return "weather/wi-night-alt-sprinkle.png";
            case 301: return "weather/wi-night-alt-sprinkle.png";
            case 302: return "weather/wi-night-alt-rain.png";
            case 310: return "weather/wi-night-alt-rain.png";
            case 311: return "weather/wi-night-alt-rain.png";
            case 312: return "weather/wi-night-alt-rain.png";
            case 313: return "weather/wi-night-alt-rain.png";
            case 314: return "weather/wi-night-alt-rain.png";
            case 321: return "weather/wi-night-alt-sprinkle.png";
            case 500: return "weather/wi-night-alt-sprinkle.png";
            case 501: return "weather/wi-night-alt-rain.png";
            case 502: return "weather/wi-night-alt-rain.png";
            case 503: return "weather/wi-night-alt-rain.png";
            case 504: return "weather/wi-night-alt-rain.png";
            case 511: return "weather/wi-night-alt-rain-mix.png";
            case 520: return "weather/wi-night-alt-showers.png";
            case 521: return "weather/wi-night-alt-showers.png";
            case 522: return "weather/wi-night-alt-showers.png";
            case 531: return "weather/wi-night-alt-storm-showers.png";
            case 600: return "weather/wi-night-alt-snow.png";
            case 601: return "weather/wi-night-alt-sleet.png";
            case 602: return "weather/wi-night-alt-snow.png";
            case 611: return "weather/wi-night-alt-rain-mix.png";
            case 612: return "weather/wi-night-alt-rain-mix.png";
            case 615: return "weather/wi-night-alt-rain-mix.png";
            case 616: return "weather/wi-night-alt-rain-mix.png";
            case 620: return "weather/wi-night-alt-rain-mix.png";
            case 621: return "weather/wi-night-alt-snow.png";
            case 622: return "weather/wi-night-alt-snow.png";
            case 701: return "weather/wi-night-alt-showers.png";
            case 711: return "weather/wi-smoke.png";
            case 721: return "weather/wi-day-haze.png";
            case 731: return "weather/wi-dust.png";
            case 741: return "weather/wi-night-fog.png";
            case 761: return "weather/wi-dust.png";
            case 762: return "weather/wi-dust.png";
            case 781: return "weather/wi-tornado.png";
            case 800: return "weather/wi-night-clear.png";
            case 801: return "weather/wi-night-alt-cloudy-gusts.png";
            case 802: return "weather/wi-night-alt-cloudy-gusts.png";
            case 803: return "weather/wi-night-alt-cloudy-gusts.png";
            case 804: return "weather/wi-night-alt-cloudy.png";
            case 900: return "weather/wi-tornado.png";
            case 902: return "weather/wi-hurricane.png";
            case 903: return "weather/wi-snowflake-cold.png";
            case 904: return "weather/wi-hot.png";
            case 906: return "weather/wi-night-alt-hail.png";
            case 957: return "weather/wi-strong-wind.png";
            default: return "";
        }
    }
}