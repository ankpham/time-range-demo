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
    return (
        <div className="time-list">
        {times.map((time, idx) => (
            <div key={idx} className={"time" + (time.reserved === true ? " active" : "")}>
                {time.displayTime}
                {time.reserved}
            </div>
        ))}
        </div>
    )
}

export default TimeList;