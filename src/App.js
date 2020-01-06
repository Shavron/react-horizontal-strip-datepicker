import React from 'react';
import  './App.css'
import ReactHorizontalDatePicker from './ReactHorizontalDatePicker';

function App() {
 
  const onSelectedDay = (d) =>{
      console.log(d)
  };

  return (
    <ReactHorizontalDatePicker selectedDay={onSelectedDay} enableScroll={true} enableDays={90}/> 
  );
}

export default App;
