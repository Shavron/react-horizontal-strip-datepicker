import React from 'react';
import './App.css';
import ReactHorizontalDatePicker from './ReactHorizontalDatePicker';

function App() {
  const onSelectedDay = d => {
    console.log(d);
  };

  return React.createElement(ReactHorizontalDatePicker, {
    selectedDay: onSelectedDay,
    enableScroll: true,
    enableDays: 180
  });
}

export default App;