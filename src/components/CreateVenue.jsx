import React, { useState } from "react";
import CustomButtonSmall from "./CustomButtonSmall";

function CreateVenueModal({ open, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    stars: "",
    price: "",
    maxGuests: "",
    wifi: false,
    breakfast: false,
    pets: false,
    location: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="relative bg-white w-[90%] max-w-lg rounded-2xl shadow-lg p-6 max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Create a Venue</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full"
        >
          ✕
        </button>

        <div className="flex-1 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-4 overflow-y-auto"
          >
            <input
              type="text"
              name="name"
              placeholder="Venue name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <label className="flex flex-col gap-1">
              Venue Image
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
              rows={3}
            />
            <input
              type="number"
              name="stars"
              placeholder="Stars (1-5)"
              value={formData.stars}
              onChange={handleChange}
              className="border p-2 rounded"
              min="1"
              max="5"
            />
            <input
              type="number"
              name="price"
              placeholder="Price per night"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="maxGuests"
              placeholder="Max guests"
              value={formData.maxGuests}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handleChange}
                />
                Wifi
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="breakfast"
                  checked={formData.breakfast}
                  onChange={handleChange}
                />
                Breakfast
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                />
                Parking
              </label>
            </div>
            <input
              type="text"
              name="location"
              placeholder="Location (city, address)"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <CustomButtonSmall
              type="submit"
              onClick={handleSubmit}
              className="bg-primary text-white p-2 rounded-lg mt-4"
            >
              Create Venue
            </CustomButtonSmall>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateVenueModal;
