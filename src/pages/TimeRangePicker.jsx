import React, { useState } from 'react';
import { LocalizationProvider, DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TimeList from '../components/TimeList';

dayjs.extend(isBetween);

const TimeRangePicker = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeRanges, setTimeRanges] = useState([]);
  const [excludedRanges, setExcludedRanges] = useState([]);

  const handleAddTimeRange = () => {
    if (!startTime || !endTime) return;//Checks if values are not null

    const newRange = { startTime, endTime };//Stores time ranges(startTime, endTime) in a variable

    const isExcluded = excludedRanges.some((range) => {
      return (
        dayjs(startTime).isBetween(range.startTime, range.endTime, null, '[)') ||
        dayjs(endTime).isBetween(range.startTime, range.endTime, null, '(]')//Checks if either the start time or end time is conflicting with the existing start times and end times 
      );
    });

    if (!isExcluded) {
      setTimeRanges([...timeRanges, newRange]);//Same Thing, set what time ranges get displayed
      setExcludedRanges([...excludedRanges, newRange]);//Same
      setStartTime(null);//When you select start time
      setEndTime(null);//select end time
    } else {
      alert('Selected range conflicts with an excluded range.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <h3>Pick a Time Range</h3>
        <DesktopTimePicker
          label="Start Time"
          value={startTime}
          onChange={(newValue) => setStartTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopTimePicker
          label="End Time"
          value={endTime}
          onChange={(newValue) => setEndTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button onClick={handleAddTimeRange} variant="contained" color="primary">
          Add Time Range
        </Button>

        <h4>Selected Time Ranges</h4>
        <ul>
          {timeRanges.map((range, index) => (
            <li key={index}>
              {dayjs(range.startTime).format('HH:mm')} - {dayjs(range.endTime).format('HH:mm')}
            </li>
          ))}
        </ul>
      </Box>
      <TimeList ranges={excludedRanges}/>
    </LocalizationProvider>
  );
};

export default TimeRangePicker;