"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_contexts/ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

// import { isWithinInterval, set } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
{
  /* <DayPicker
className="pt-12 place-self-center p-3"
mode="range"
onSelect={(range) => {
  console.log(range);
}}
min={minBookingLength + 1}
max={maxBookingLength}
captionLayout="dropdown"
numberOfMonths={2}
styles={{
  months: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
    gap: "4rem",
    justifyContent: "center", // Center the grid
  },
  month: {
    width: "250px",
  },
}}
/> */
}
function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  // CHANGE
  const { range, setRange, resetRange } = useReservation();
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 5);
  const displayRange = isAlreadyBooked(range, bookedDates) ? [] : range;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const { regularPrice, discount } = cabin;
  const cabinPrice = numNights * regularPrice - discount;

  // SETTINGS

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col ">
      <div>
        <DayPicker
          className="pt-12 place-self-center "
          animate
          min={2}
          max={7}
          mode="range"
          onSelect={(range) => {
            if (!range.to) {
              setRange({ from: range.from, to: undefined });
            } else {
              setRange(range);
            }
          }}
          selected={displayRange}
          defaultMonth={new Date()}
          captionLayout="dropdown"
          startMonth={new Date()}
          endMonth={futureDate}
          numberOfMonths={2}
          disabled={(curDate) => {
            return (
              isPast(curDate) ||
              bookedDates.some((date) => isSameDay(date, curDate))
            );
          }}
          styles={{
            months: {
              display: "flex",
              flexWrap: "nowrap",
            },
            month: {},
          }}
        />
      </div>
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
