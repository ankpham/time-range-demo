import React from 'react';
import times from '../database/times.json';

const TimeList = () => {

    return (
        <div className="time-list">
        {times.map((time) => (
            <div className={"time" + (time.reserved === true ? " active" : "")}>
                {time.displayTime}
                {time.reserved}
            </div>
        ))}
        </div>
    )
}

export default TimeList;