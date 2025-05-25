import React from "react";
import kids from "@/assets/Colorful_Finger_Paint_Fun__Engaging_Kids_-removebg-preview.png";
import { useAnnouncements } from "@/hooks/announcements";

const LandingPage2: React.FC = () => {
  const { data: announcements = [], isLoading, isError } = useAnnouncements();

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800 font-sans">
      {/* Hero Section - Dark theme with gradient */}
      <section className="px-6 md:px-12 lg:px-24 py-20 h-screen flex flex-col md:flex-row justify-center items-center gap-12 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
        <div className="flex flex-col items-start max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-left leading-tight">
            <span className="text-[#00b4d8]">Little Stars</span> Crèche
          </h1>
          <p className="text-lg text-gray-300 mb-10 text-left">
            Where curiosity meets care in a world designed for little explorers 
            to learn, play, and blossom.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#00b4d8] hover:bg-[#0096c7] text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg">
              Enroll Now
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium py-3 px-8 rounded-lg transition-all">
              Learn More
            </button>
          </div>
        </div>
        <div className="relative">
          <img 
            src={kids} 
            alt="Happy children" 
            className="w-full max-w-md drop-shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00b4d8]/20 rounded-full -z-10"></div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#f72585]/20 rounded-full -z-10"></div>
        </div>
      </section>

      {/* Features Section - Cards with icons */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
            Our Approach to Early Learning
          </h2>
          <p className="text-lg text-gray-600">
            We blend play-based learning with structured activities to foster 
            holistic development in a nurturing environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Montessori Inspired",
              desc: "Child-led activities that encourage independence and natural curiosity.",
              icon: "🌱",
            },
            {
              title: "Emotional Growth",
              desc: "We prioritize social-emotional development alongside cognitive skills.",
              icon: "💖",
            },
            {
              title: "Creative Exploration",
              desc: "Daily art, music, and movement to express creativity freely.",
              icon: "🎨",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f8f9fa] rounded-xl p-8 text-center hover:shadow-lg transition-all hover:-translate-y-2 border border-white"
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Section - Modern cards */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
            News & Updates
          </h2>
          <p className="text-lg text-gray-600">
            Stay informed about our latest events, closures, and important notices.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-[#00b4d8] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Error loading announcements. Please try again later.</p>
        ) : announcements.length === 0 ? (
          <p className="text-center text-gray-600">No announcements currently available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#00b4d8]/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00b4d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{announcement.content}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(announcement.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action - Split background */}
      <section className="relative">
        <div className="absolute inset-0 bg-[#1a1a2e] h-1/2"></div>
        <div className="relative px-6 md:px-12 lg:px-24 py-20">
          <div className="bg-white rounded-xl shadow-2xl p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">
                  Ready to Begin Your Child's Journey?
                </h2>
                <p className="text-gray-600 mb-6">
                  Schedule a tour or start the enrollment process today. Our team 
                  is ready to answer all your questions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#00b4d8] hover:bg-[#0096c7] text-white font-medium py-3 px-8 rounded-lg transition-all">
                    Book a Tour
                  </button>
                  <button className="bg-transparent hover:bg-gray-100 text-[#1a1a2e] border border-gray-200 font-medium py-3 px-8 rounded-lg transition-all">
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="hidden md:block flex-1">
                <div className="bg-[#f8f9fa] rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#00b4d8]/10 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00b4d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="font-medium">(123) 456-7890</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#f72585]/10 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f72585]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="font-medium">info@littlestars.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage2;