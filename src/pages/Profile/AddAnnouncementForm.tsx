import React, { useState } from "react";

interface Announcement {
  title: string;
  content: string;
  date: string;
}

interface AddAnnouncementFormProps {
  onSubmit: (announcement: Announcement) => void;
}

const AddAnnouncementForm: React.FC<AddAnnouncementFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    content: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-32 p-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-[#F16767] mb-4">
        Add Announcement
      </h2>

      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Content</label>
        <textarea
          name="content"
          required
          value={formData.content}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Date</label>
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-[#F16767] hover:bg-red-400 text-white font-semibold px-6 py-2 rounded shadow"
      >
        Add Announcement
      </button>
    </form>
  );
};

export default AddAnnouncementForm;
