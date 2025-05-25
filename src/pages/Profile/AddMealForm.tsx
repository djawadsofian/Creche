// src/components/AddMealForm.tsx
import React, { useState } from "react";

interface AddMealFormProps {
  onSubmit: (mealData: MealData) => void;
  isLoading?: boolean;
}

interface MealData {
  date: string;
  type: string;
  notes: string;
}

const AddMealForm: React.FC<AddMealFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      date: "",
      type: "",
      notes: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-32 p-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-[#F16767] mb-4">Add Meal</h2>

      <div>
        <label className="block font-semibold mb-1">Date</label>
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Meal Type</label>
        <select
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={isLoading}
        >
          <option value="">Select meal type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snack">Snack</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="bg-[#F16767] hover:bg-red-400 text-white font-semibold px-6 py-2 rounded shadow disabled:opacity-75"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Meal"}
      </button>
    </form>
  );
};

export default AddMealForm;