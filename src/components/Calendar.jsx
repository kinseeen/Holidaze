import React from "react";
import CustomButtonSmall from "./CustomButtonSmall";
import { Temporal } from "temporal-polyfill";
import { useState, useEffect } from "react";

function Calendar({ bookings = [] }) {
  const [month, setMonth] = useState(Temporal.Now.zonedDateTimeISO().month);
  const [year, setYear] = useState(Temporal.Now.zonedDateTimeISO().year);
  const [monthCalendar, setMonthCalendar] = useState([]);

  useEffect(() => {
    const fiveWeeks = 5 * 7;
    const sixWeeks = 6 * 7;
    const startOfMonth = Temporal.PlainDate.from({ year, month, day: 1 });
    const monthLength = startOfMonth.daysInMonth;
    const dayOfWeekMonthStartedOn = startOfMonth.dayOfWeek - 1;

    const length =
      dayOfWeekMonthStartedOn + monthLength > fiveWeeks ? sixWeeks : fiveWeeks;

    const calendar = new Array(length).fill({}).map((_, index) => {
      const date = startOfMonth.add({
        days: index - dayOfWeekMonthStartedOn,
      });
      return {
        isInMonth: !(
          index < dayOfWeekMonthStartedOn ||
          index - dayOfWeekMonthStartedOn >= monthLength
        ),
        date,
      };
    });

    setMonthCalendar(calendar);
  }, [year, month]);

  const previous = () => {
    const { month: prevMonth, year: prevYear } = Temporal.PlainYearMonth.from({
      month,
      year,
    }).subtract({ months: 1 });
    setMonth(prevMonth);
    setYear(prevYear);
  };
  const next = () => {
    const { month: nextMonth, year: nextYear } = Temporal.PlainYearMonth.from({
      month,
      year,
    }).add({ months: 1 });
    setMonth(nextMonth);
    setYear(nextYear);
  };

  const isBooked = (date) => {
    return bookings.some((booking) => {
      const from = Temporal.Instant.from(booking.dateFrom)
        .toZonedDateTimeISO("UTC")
        .toPlainDate();
      const to = Temporal.Instant.from(booking.dateTo)
        .toZonedDateTimeISO("UTC")
        .toPlainDate();

      return (
        Temporal.PlainDate.compare(date, from) >= 0 &&
        Temporal.PlainDate.compare(date, to) <= 0
      );
    });
  };

  return (
    <div className="flex-grow flex flex-col max-h-screen">
      <div className="flex justify-start mb-4">
        <button className="btn btn-blue w-[120px] me-2" onClick={previous}>
          &lt; Previous
        </button>
        <button className="btn btn-blue w-[120px]" onClick={next}>
          Next &gt;
        </button>
      </div>
      <h2 className="text-lg font-semibold">
        {Temporal.PlainDate.from({ year, month, day: 1 }).toLocaleString("en", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <div className="grid grid-cols-7">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
          (name, index) => (
            <div key={index}>{name}</div>
          )
        )}
      </div>

      <div className="grid grid-cols-7 flex-grow">
        {monthCalendar
          .filter((day) => day.isInMonth)
          .map((day, index) => (
            <div
              key={index}
              className={`border border-slate-700 p-2 ${
                isBooked(day.date)
                  ? "bg-gray-400 text-white"
                  : "bg-white hover:bg-gray-800"
              }`}
            >
              {day.date.day}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Calendar;
