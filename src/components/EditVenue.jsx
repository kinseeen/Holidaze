import React, { useState, useEffect } from "react";
import { usePut } from "../hooks/ApiCalls";
import CustomButtonSmall from "./CustomButtonSmall";

function EditVenueModal({ open, onClose, venue, onUpdate }) {
  const [formData, setFormData] = useState({ ...venue });
  const { put, loading, error } = usePut(`/holidaze/venues/${venue.id}`);

  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name || "",
        description: venue.description || "",
        imageUrl: venue.media?.[0]?.url || "",
        stars: venue.rating || 0,
        price: venue.price || "",
        maxGuests: venue.maxGuests || "",
        wifi: venue.meta?.wifi || false,
        breakfast: venue.meta?.breakfast || false,
        parking: venue.meta?.parking || false,
        pets: venue.meta?.pets || false,
        city: venue.location?.city || "",
        country: venue.location?.country || "",
      });
    }
  }, [venue]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.stars) || 0,
      media: formData.imageUrl
        ? [{ url: formData.imageUrl, alt: formData.name }]
        : [],
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        city: formData.city || null,
        country: formData.country || null,
      },
    };

    try {
      const updated = await put(payload);
      onUpdate(updated.data);
      onClose();
    } catch (err) {
      console.error("Failed to update venue:", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="relative bg-white w-[90%] max-w-lg rounded-2xl shadow-lg p-6 max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Edit Venue</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full"
        >
          ✕
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 overflow-y-auto"
        >
          <input
            type="text"
            name="name"
            placeholder="Venue Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
            rows={3}
            required
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
            required
          />

          <input
            type="number"
            name="maxGuests"
            placeholder="Max guests"
            value={formData.maxGuests}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="flex gap-4 flex-wrap">
            {["wifi", "breakfast", "parking", "pets"].map((field) => (
              <label key={field} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field}
                  checked={formData[field]}
                  onChange={handleChange}
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
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
            className="bg-primary text-white p-2 rounded-lg mt-4"
          >
            {loading ? "Saving..." : "Save Changes"}
          </CustomButtonSmall>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditVenueModal;
