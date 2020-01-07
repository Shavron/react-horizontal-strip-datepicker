import React, { useState } from "react";
import { Waypoint } from 'react-waypoint';
import "./ReactHorizontalDatePicker.css";
import { format, addWeeks, subWeeks, addDays, subDays, isSameDay, isBefore, getDate } from "date-fns";
export default function ReactHorizontalDatePicker({
  enableDays,
  enableScroll,
  selectedDay
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [headingDate, setHeadingDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentDate] = useState(new Date());
  const scrollWidth = 60;
  enableScroll = enableScroll || false;
  enableDays = enableScroll === true ? enableDays || 90 : 7;
  const heading_dateFormat = "MMM yyyy";

  const applyStyles = day => {
    const classes = [];

    if (isSameDay(day, selectedDate)) {
      classes.push(' date-day-Item-selected');
    }

    if (isBefore(day, currentDate)) {
      classes.push(' date-day-item-disabled');
    }

    return classes.join(' ');
  };

  const getScroll = () => {
    return enableScroll === true ? ' datepicker-datelist-scrollable' : ' datepicker-dateList';
  };

  const _verticalList = () => {
    const _dayFormat = "E";
    const _dateFormat = "dd";
    const _verticalListItems = [];

    let _startDay = subDays(currentWeek, 1);

    for (let i = 0; i < enableDays; i++) {
      _verticalListItems.push(React.createElement(Waypoint, {
        key: i,
        horizontal: true,
        onLeave: () => setHeadingDate(addDays(_startDay, i))
      }, React.createElement("div", {
        className: `datepicker-date-day-Item ${applyStyles(addDays(_startDay, i))}`,
        onClick: () => onDateClick(addDays(_startDay, i))
      }, React.createElement("div", {
        className: "datepicker-day-label "
      }, format(addDays(_startDay, i), _dayFormat)), React.createElement("div", {
        className: "datepicker-date-label "
      }, format(addDays(_startDay, i), _dateFormat)))));
    }

    return React.createElement("div", {
      id: "container",
      className: getScroll()
    }, _verticalListItems);
  };

  const onDateClick = day => {
    setSelectedDate(day);
    selectedDay(selectedDate);
  };

  const nextScroll = () => {
    enableScroll ? document.getElementById('container').scrollLeft += scrollWidth : setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const prevScroll = () => {
    enableScroll ? document.getElementById('container').scrollLeft -= scrollWidth : setCurrentWeek(subWeeks(currentWeek, 1));
  };

  return React.createElement("div", {
    className: "datepicker-strip"
  }, React.createElement("span", {
    className: "datepicker-month-label "
  }, format(headingDate, heading_dateFormat)), React.createElement("div", {
    className: "datepicker"
  }, React.createElement("button", {
    className: "datepicker-button-previous",
    onClick: prevScroll
  }, "\u2B9E"), _verticalList(), React.createElement("button", {
    className: "datepicker-button-next",
    onClick: nextScroll
  }, "\u2B9E")));
}