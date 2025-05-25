import React from "react";
import { Button } from "@/components/ui/button"; // optional if using shadcn/ui or remove this line
import kids from "@/assets/Colorful_Finger_Paint_Fun__Engaging_Kids_-removebg-preview.png";
import { useAnnouncements } from "@/hooks/announcements"; // Import the announcements hook

const Landing: React.FC = () => {
  // Fetch announcements data
  const { data: announcements = [], isLoading, isError } = useAnnouncements();

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#FCF259] to-[#ffff] text-gray-800">
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 py-20 h-screen flex justify-between items-center text-center">
        <div className="flex flex-col items-start max-w-[50%]">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#F16767] mb-12 text-left">
            Welcome to Our Little BDS Crèche
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-600 mb-10 text-left">
            A safe, loving, and nurturing environment where your child learns,
            plays, and grows every day.
          </p>
          <button className="bg-[#F16767] hover:bg-[#F16767]/80 text-white t font-semibold py-3 px-6 rounded-2xl shadow-md transition-all">
            Get Started
          </button>
        </div>
        <img src={kids} alt="" />
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 bg-white flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#F16767] mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Loving Staff",
              desc: "Our trained caregivers provide warmth, care, and attention for every child.",
              icon: "❤️",
            },
            {
              title: "Fun Learning",
              desc: "Engaging educational activities that help your child thrive.",
              icon: "📚",
            },
            {
              title: "Safe & Secure",
              desc: "We ensure a safe, clean, and joyful environment at all times.",
              icon: "🛡️",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#FCE3E3] rounded-2xl shadow-sm p-6 text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#F16767] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 bg-[#FCE3E3] flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#F16767] mb-12">
          Latest Announcements
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-[#F16767] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isError ? (
          <p className="text-red-500">Error loading announcements. Please try again later.</p>
        ) : announcements.length === 0 ? (
          <p className="text-gray-600">No announcements available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl shadow-md p-6 border border-[#FCE3E3]"
              >
                <h3 className="text-xl font-bold text-[#F16767] mb-2">
                  {announcement.title}
                </h3>
                <p className="text-gray-700 mb-4">{announcement.content}</p>
                <p className="text-sm text-gray-500">
                  Posted on: {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F16767] mb-4">
          Enroll Your Child Today!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Limited spots available for the upcoming season. Join our family of
          happy parents.
        </p>
        <button className="bg-white hover:bg-yellow-200 text-[#F16767] font-semibold py-3 px-6 rounded-full shadow-md transition-all border border-[#F16767]">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Landing;