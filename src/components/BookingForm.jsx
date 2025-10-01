import React, { useState } from "react";
import { usePost } from "../hooks/ApiCalls";
import { Temporal } from "temporal-polyfill";

function BookingForm({ venueId, bookings = [], onBookingSuccess }) {
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });

  const { post, loading, error } = usePost("/holidaze/bookings");

  const isDateBooked = (from, to) => {
    return bookings.some((booking) => {
      const bookedFrom = new Date(booking.dateFrom);
      const bookedTo = new Date(booking.dateTo);
      return from <= bookedTo && to >= bookedFrom;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = new Date(formData.dateFrom);
    const to = new Date(formData.dateTo);

    if (from > to) {
      alert("Start date cannot be after end date.");
      return;
    }

    if (isDateBooked(from, to)) {
      alert("Selected dates are already booked.");
      return;
    }

    try {
      await post({
        dateFrom: from.toISOString(),
        dateTo: to.toISOString(),
        guests: Number(formData.guests),
        venueId,
      });

      alert("Booking created successfully!");
      onBookingSuccess?.();
      setFormData({ dateFrom: "", dateTo: "", guests: 1 });
    } catch (err) {
      console.error(err);
      alert("Failed to create booking.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row sm:items-end sm:gap-4 border p-4 rounded-lg w-full"
    >
      {/* Date From */}
      <label className="flex flex-col gap-1 flex-1">
        From
        <input
          type="date"
          name="dateFrom"
          value={formData.dateFrom}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="flex flex-col gap-1 flex-1">
        To
        <input
          type="date"
          name="dateTo"
          value={formData.dateTo}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="flex flex-col gap-1 flex-1">
        Guests
        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded-lg mt-2 sm:mt-0 sm:w-auto hover:bg-blue-700"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>

      {error && <p className="text-red-500 w-full">{error}</p>}
    </form>
  );
}

export default BookingForm;
