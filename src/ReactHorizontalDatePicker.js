import React, { useState, useEffect } from "react";
import { Waypoint } from "react-waypoint";
import "./ReactHorizontalDatePicker.css";
import {
  format,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  isSameDay,
  isBefore,
  getDate
} from "date-fns";

export default React.memo(function ReactHorizontalDatePicker({
  enableDays,
  enableScroll,
  selectedDay
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [headingDate, setHeadingDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentDate] = useState(new Date());
  const scrollWidth = 250;
  enableScroll = enableScroll || false;
  enableDays = enableScroll === true ? enableDays || 90 : 7;
  const heading_dateFormat = "MMM yyyy";

  useEffect(() => {
    console.log(headingDate);
  }, [headingDate]);

  const applyStyles = day => {
    const classes = [];
    if (isSameDay(day, selectedDate)) {
      classes.push(" date-day-Item-selected");
    }

    if (isBefore(day, currentDate)) {
      classes.push(" date-day-item-disabled");
    }
    return classes.join(" ");
  };

  const _handlePosition = (pos, date) => {
    let currentPosition = pos.currentPosition;
    let previousPosition = pos.previousPosition;

    if (previousPosition == "inside" && currentPosition == "above") {
      setHeadingDate(date);
    }
    if (previousPosition == "above" && currentPosition == "inside") {
      setHeadingDate(addDays(date, -1));
    }
  };

  const _verticalList = () => {
    const _dayFormat = "E";
    const _dateFormat = "dd";
    const _monthFormat = "MMM";
    const _verticalListItems = [];
    const _startDay = subDays(currentWeek, 1);

    for (let i = 0; i < enableDays; i++) {
      let _day = format(addDays(_startDay, i), _dayFormat);
      let _date = format(addDays(_startDay, i), _dateFormat);
      let _month = format(addDays(_startDay, i), _monthFormat);

      _verticalListItems.push(
        <Waypoint
          key={i}
          horizontal={true}
          onPositionChange={pos =>
            _date == 1 ? _handlePosition(pos, addDays(_startDay, i)) : ""
          }
        >
          <div className="wrapper">
            {format(addDays(_startDay, i), _dateFormat) == 1 ? (
              <div className="scroll-head">
                {format(addDays(_startDay, i), "MMM")}
              </div>
            ) : (
              <div className="blank-space-div"></div>
            )}
            <div
              className={`datepicker-date-day-Item wrapper ${applyStyles(
                addDays(_startDay, i)
              )}`}
              onClick={() => onDateClick(addDays(_startDay, i))}
            >
              <div className="datepicker-day-label ">{_day}</div>
              <div className="datepicker-date-label ripple ">{_date}</div>
            </div>
          </div>
        </Waypoint>
      );
    }

    return (
      <div
        id="container"
        className={
          enableScroll === true
            ? " datepicker-datelist-scrollable"
            : " datepicker-dateList"
        }
      >
        {_verticalListItems}
      </div>
    );
  };

  const onDateClick = day => {
    setSelectedDate(day);
    selectedDay(selectedDate);
  };

  const nextScroll = () => {
    enableScroll
      ? (document.getElementById("container").scrollLeft += scrollWidth)
      : setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const prevScroll = () => {
    enableScroll
      ? (document.getElementById("container").scrollLeft -= scrollWidth)
      : setCurrentWeek(subWeeks(currentWeek, 1));
  };

  return (
    <div className="datepicker-strip">
      <span className="datepicker-month-label ">
        {format(selectedDate, "dd MMM yyy")}
      </span>
      <div className="datepicker">
        <div className="wrapper">
          <div className="scroll-head">{format(headingDate, "MMM")}</div>
          <div className="button-previous">
            {" "}
            <button className="datepicker-button-previous" onClick={prevScroll}>
              &#10132;
            </button>
          </div>
        </div>
        {_verticalList()}
        <div className="wrapper">
          <div className="blank-space-div"></div>

          <div className="button-previous">
            {" "}
            <button className="datepicker-button-next" onClick={nextScroll}>
              &#10132;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
