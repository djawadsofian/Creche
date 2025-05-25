// src/components/AnnouncementsList.tsx
import React from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface AnnouncementsListProps {
  announcements: Announcement[];
  isLoading?: boolean;
  isError?: boolean;
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
  isLoading = false,
  isError = false,
}) => {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-[#F16767] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">
          Error loading announcements. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-[#F16767] mb-8 text-center">
        Announcements
      </h2>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white border border-[#FCE3E3] shadow-sm rounded-lg p-5"
            >
              <h3 className="text-xl font-semibold text-[#F16767] mb-2">
                {announcement.title}
              </h3>
              <p className="text-gray-700 mb-2">{announcement.content}</p>
              <p className="text-sm text-gray-500 italic">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsList;