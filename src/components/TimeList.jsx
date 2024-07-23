import React from 'react';
import dayjs from 'dayjs';
import times from '../database/times.json';

const TimeList = (props) => {

    let excludedRanges = props.ranges; 
    let excludedTimes = [];

    for (let i = 0; i < excludedRanges.length; i++) {
        let startTime = dayjs(excludedRanges[i].startTime);
        let endTime = dayjs(excludedRanges[i].endTime);
        let current = startTime;

        while (current.isBefore(endTime)) {
            excludedTimes.push(current);
            current = current.add(30, 'minute');
        }
    }

    for (let i = 0; i < times.length; i++) {
        for (let x = 0; x < excludedTimes.length; x++) {
            if (dayjs(times[i].time, "h:mm").isSame(excludedTimes[x])) {
                times[i].reserved = true;
            }
        }
    }

    return (
        <div className="time-list">
        {times.map((time, idx) => (
            <div key={idx} className={"time" + (time.reserved === true ? " active" : "")}>
                <span>{time.displayTime}</span>
            </div>
        ))}
        </div>

    )
}

export default TimeList;


/*import React from 'react';
import dayjs from 'dayjs';
import times from '../database/times.json'; // Assuming this file contains your time data

const TimeList = (props) => {
    let excludedRanges = props.ranges; 
    let excludedTimes = [];

    // Step 1: Generate excludedTimes based on excludedRanges
    for (let i = 0; i < excludedRanges.length; i++) {
        let startTime = dayjs(excludedRanges[i].startTime);
        let endTime = dayjs(excludedRanges[i].endTime);
        let current = startTime;

        while (current.isBefore(endTime)) {
            excludedTimes.push(current.format('HH:mm')); // Push formatted time strings
            current = current.add(30, 'minute');
        }
    }

    // Step 2: Mark times as reserved in the times array
    let updatedTimes = times.map(time => {
        if (excludedTimes.includes(time.displayTime)) {
            return { ...time, reserved: true }; // Mark time as reserved if in excludedTimes
        } else {
            return { ...time, reserved: false }; // Mark time as not reserved otherwise
        }
    });

    return (
        <div className="time-list">
            {updatedTimes.map((time, idx) => (
                <div key={idx} className={"time" + (time.reserved === true ? " active" : "")}>
                    <span>{time.displayTime}</span>
                </div>
            ))}
        </div>
    );
}

export default TimeList;*/