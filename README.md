This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## react-horizontal-strip-datepicker

A stable horizontal date picker with the option to scroll for web
![Example](https://i.imgur.com/BaNEgIS.png?1)

### Installation

Run `yarn add react-horizontal-strip-datepicker`

### Usage

Import:

`import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";`

and use as:

```javascript
<ReactHorizontalDatePicker
  selectedDay={onSelectedDay}
  enableScroll={true}
  enableDays={80}
/>
```

Available Props are

| Prop         | Type     | Default | Description                                |
| ------------ | -------- | ------- | ------------------------------------------ |
| enableScroll | Boolean  | false   | Set List to be scrollable                  |
| selectedDay  | Function |         | Function to get the selected Day           |
| enableDays   | Number   | 90      | Number of days to render from current date |

enableDays has no effect if enableScroll is true.

Example:

```javascript
import React from 'react'

import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker'
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css'

const App = () => {
  const onSelectedDay = (d) => {
    console.log(d)
  }

  return (
    <ReactHorizontalDatePicker
      selectedDay={onSelectedDay}
      enableScroll={true}
      enableDays={180}
    />
  )
}

export default App
```
