"use client";
//This tutorial is just for learninp purpose the library.
//npm install react-datepicker
//We need to import the css file as well for the datepicker library.
import "react-day-picker/style.css";

import { useState } from "react";
import { DayPicker } from "react-day-picker";

function LearnCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 5);

  return (
    <DayPicker
      className="pt-12 place-self-center"
      animate
      defaultMonth={new Date()}
      captionLayout="dropdown"
      startMonth={new Date()}
      endMonth={futureDate}
      min={5}
      max={25}
      showOutsideDays
      numberOfMonths={2}
      showWeekNumber
      mode="range"
      selected={selectedDate}
      onSelect={setSelectedDate}
    />
  );
}

export default LearnCalendar;
