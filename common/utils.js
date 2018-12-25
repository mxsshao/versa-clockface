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
export function monoDigits(digits) {
    let ret = "";
    let str = digits.toString();
    for (let i = 0, length = str.length; i < length; i++) {
        let num = str.charAt(i);
        ret = ret.concat(hex2a("0x1" + num));
    }
    return ret;
}

// Hex to string
function hex2a(hex) {
    let str = "";
    for (let i = 0, length = hex.length; i < length; i += 2) {
        let val = parseInt(hex.substr(i, 2), 16);
        if (val) str += String.fromCharCode(val);
    }
    return str.toString();
}

export function numberWithCommas(x) {
    if (x.length > 3) {
        let position = x.length - 3;
        return x.substr(0, position) + "," + x.substr(position);
    } else {
        return x;
    }
}