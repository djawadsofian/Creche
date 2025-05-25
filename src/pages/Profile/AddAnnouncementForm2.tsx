import React, { useState } from "react";

interface Announcement {
  title: string;
  content: string;
  date: string;
}

interface AddAnnouncementFormProps {
  onSubmit: (announcement: Announcement) => void;
  isLoading?: boolean;
}

const AddAnnouncementForm2: React.FC<AddAnnouncementFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0], // Default to today's date
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
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
          Create New Announcement
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] transition"
              disabled={isLoading}
              placeholder="Enter announcement title"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] transition"
              disabled={isLoading}
              rows={4}
              placeholder="Write your announcement details..."
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] transition"
              disabled={isLoading}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
                isLoading 
                  ? 'bg-[#00b4d8]/70 cursor-not-allowed'
                  : 'bg-[#00b4d8] hover:bg-[#0096c7] shadow-md'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting Announcement...
                </span>
              ) : (
                "Post Announcement"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementForm2;