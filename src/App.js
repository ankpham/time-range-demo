import React from 'react';
import TimeRangePicker from './pages/TimeRangePicker';
import TimeList from './components/TimeList';
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Time Range Picker with Exclusions</h1>
      <TimeRangePicker />
    </div>
  );
};

export default App;