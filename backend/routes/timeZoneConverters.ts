export function timeToBackendTime(timeStr: string): string {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})(am|pm)$/);
    if (!match) {
        throw new Error(`Invalid time string: ${timeStr}`);
    }

    let hours = match[1];
    const minutes = match[2];
    const amPm = match[3];

    if (hours === "12") {
        hours = "00"
    } 
    if (hours.length === 1) {
        hours = hours.padStart(2, '0')
    }
    const newtime = `${amPm}${hours}:${minutes}`
    // console.log("Converting ", timeStr, " to backend time ", newtime)

    return newtime
}

export function backendTimeToTime(backendTimeStr: string): string {
    const match = backendTimeStr.match(/^(am|pm)(\d{2}):(\d{2})$/);
    if (!match) {
        throw new Error(`Invalid time string: ${backendTimeStr}`);
    }

    let hours = match[2];
    const minutes = match[3];
    const amPm = match[1];

    if (hours === "00") {
        hours = "12"
    } 
    if (hours[0] === '0') {
        hours = hours[1]
    }
    const newtime = `${hours}:${minutes}${amPm}`
    
    // console.log("Converting ", backendTimeStr, " to backend time ", newtime)
    return newtime 
}

export function convertTime(time: string, difference: string) {
    // Parse input time to 24Hr format
    let [inputHour, inputMinute] = time.slice(0, -2).split(':').map(Number);
    let isAm = time.slice(-2).toLowerCase() === 'am';
    if (isAm && inputHour === 12) {
        inputHour = 0
    }
    if (!isAm && inputHour != 12) {
        inputHour += 12
    }

    // Parse time difference
    const [diffHour, diffMinute] = difference.split(':').map(Number);

    // Calculate new time
    let newHour = inputHour + diffHour;
    let newMinute = inputMinute + diffMinute;

    // Handle minute overflow
    if (newMinute >= 60) {
        newHour += Math.floor(newMinute / 60);
        newMinute %= 60;
    } else if (newMinute < 0) {
        newHour -= Math.ceil(Math.abs(newMinute) / 60);
        newMinute = 60 - Math.abs(newMinute % 60);
    }

    // Handle hour overflow and convert to 12-hour format and day conversion
    isAm = true
    if (newHour < 0) {
        newHour += 24;
    }

    if (newHour >= 24) {
        newHour %= 24
    }

    if (newHour >= 12) {
        isAm = false
        newHour %= 12;
    }

    if (newHour === 0) {
        newHour = 12;
    }


  // Format output
  const formattedHour = newHour.toString().padStart(2, '0');
  const formattedMinute = newMinute.toString().padStart(2, '0');
  const period = isAm ? 'am' : 'pm';

  let newtime =`${formattedHour}:${formattedMinute}${period}` 


  return timeToBackendTime(newtime);
}



export function convertTimeDay(time: string, difference: string, day: string) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var newDay = day

    // Parse input time to 24Hr format
    let [inputHour, inputMinute] = time.slice(0, -2).split(':').map(Number);
    let isAm = time.slice(-2).toLowerCase() === 'am';
    if (isAm && inputHour === 12) {
        inputHour = 0
    }
    if (!isAm && inputHour != 12) {
        inputHour += 12
    }

    // Parse time difference
    const [diffHour, diffMinute] = difference.split(':').map(Number);

    // Calculate new time
    let newHour = inputHour + diffHour;
    let newMinute = inputMinute + diffMinute;

    // Handle minute overflow
    if (newMinute >= 60) {
        newHour += Math.floor(newMinute / 60);
        newMinute %= 60;
    } else if (newMinute < 0) {
        newHour -= Math.ceil(Math.abs(newMinute) / 60);
        newMinute = 60 - Math.abs(newMinute % 60);
    }

    // Handle hour overflow and convert to 12-hour format and day conversion
    isAm = true
    if (newHour < 0) {
        newHour += 24;
        let newDayIndex = (days.findIndex(d => d === day) - 1 + 7) % 7;
        newDay = days[newDayIndex]
    }

    if (newHour >= 24) {
        let newDayIndex = (days.findIndex(d => d === day) + 1) % 7;
        newDay = days[newDayIndex]
        newHour %= 24
    }

    if (newHour >= 12) {
        isAm = false
        newHour %= 12;
    }

    if (newHour === 0) {
        newHour = 12;
    }

    // Format output
    const formattedHour = newHour.toString().padStart(2, '0');
    const formattedMinute = newMinute.toString().padStart(2, '0');
    const period = isAm ? 'am' : 'pm';

    let newtime = `${formattedHour}:${formattedMinute}${period}`

    return {newday: newDay, newtime: timeToBackendTime(newtime)};
}


export function computeEndTime(startTime: string) {
  // Add one hour to the startTime by using the convertTime function
  return backendTimeToTime(convertTime(startTime, "1:00"));

}


// Usage shown below:
// console.log(convertTime("12:00am", "-4:00")); // Output: "08:00pm"
