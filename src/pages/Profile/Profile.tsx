import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProfileById } from "@/hooks/profile";
import profilepic from "@/assets/Colorful Finger Paint Fun_ Engaging Kids….jpeg";
import Header from "@/Notification/Header";
import AddChildForm from "./AddChildForm";
import ChildrenList from "./ChildrenList";

const SampleChildrenData = [
  {
    id: 1,
    name: "Tommy",
    birthDate: "2021-01-01",
    allergies: "",
    specialNeeds: "",
  },
  {
    id: 2,
    name: "Lila",
    birthDate: "2020-05-10",
    allergies: "Peanuts",
    specialNeeds: "Speech therapy",
  },
];
const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id && !isNaN(Number(id)) ? parseInt(id) : null;
  const { data: profile, isLoading, error } = useProfileById(userId || 0);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  //   if (error || !profile) {
  //     return (
  //       <div className="flex flex-col items-center justify-center h-screen text-gray-800">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-16 w-16 text-gray-400 mb-4"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //           />
  //         </svg>
  //         <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
  //         <p className="text-gray-600 mb-4">
  //           The requested profile could not be loaded.
  //         </p>
  //         <button
  //           onClick={() => navigate(-1)}
  //           className="px-4 py-2 bg-secondary text-white rounded-md hover:opacity-80 transition-colors"
  //         >
  //           Go Back
  //         </button>
  //       </div>
  //     );
  //   }

  // Extract skills data for visualization
  const skills = profile?.profile?.skills || [];

  // Format location
  const location = [profile?.city, profile?.state, profile?.country]
    .filter(Boolean)
    .join(", ");

  // Calculate percentage for proficiency
  const getProficiencyPercentage = (level: string) => {
    switch (level) {
      case "beginner":
        return "25%";
      case "intermediate":
        return "50%";
      case "advanced":
        return "75%";
      case "expert":
        return "90%";
      default:
        return "50%";
    }
  };
  const parentId = 1; // Replace this with actual logged-in parent ID

  const handleAddChild = (childData: any) => {
    console.log("Submitting child:", childData);
    // You can now POST this to your API
  };
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setChildren(SampleChildrenData);
  }, []);
  return (
    <div className="bg-gray-50 z-0  flex flex-col gap-3 h- ">
      {/* Header/Banner Section */}
      <Header />
      <div className="bg-[#FCF259] h-44 relative mt-20">
        {/* Profile Information Overlay */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6 sm:px-32 ">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden pb-10 pt-4">
            <div className="flex flex-col md:flex-row md:items-end">
              {/* Profile Picture */}
              <div className="flex justify-center md:justify-start px-6 -mt-16 md:mt-0 md:-mb-6 relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <img
                    src={profile?.profile_picture_url || profilepic}
                    alt={`${profile?.first_name || "User"}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name and Basic Info */}
              <div className="p-6 pt-8 md:pt-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile?.first_name || "yacine"}{" "}
                      {profile?.last_name || "djaaraoui"}
                    </h1>

                    <p className="text-gray-600 text-extrabold">
                      {profile?.role || "administrateur"}
                    </p>

                    {/* <p className="text-gray-500 text-sm mt-1">
                      {location || "Location not specified"}
                    </p> */}
                  </div>

                  {/* <div className="mt-4 md:mt-0 flex space-x-2">
                    <button className="px-4 py-2 bg-secondary text-white rounded-md hover:opacity-80 transition-colors text-sm font-medium">
                      ajouter
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                      Contacter
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            {/* <div className="px-6 border-t border-gray-100 mt-2">
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "about"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "skills"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Skills
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "projects"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "education"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Education
                </button>
              </nav>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-32 w-full px-6 sm:px-32  mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informations
              </h2>

              <div className="space-y-4">
                {profile?.email && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        Email
                      </h3>
                      <p className="text-sm text-gray-600">{profile?.email}</p>
                    </div>
                  </div>
                )}

                {/* {profile.phone_number && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        Phone
                      </h3>
                      <p className="text-sm text-gray-600">
                        {profile.phone_number}
                      </p>
                    </div>
                  </div>
                )}

                {location && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        Location
                      </h3>
                      <p className="text-sm text-gray-600">{location}</p>
                    </div>
                  </div>
                )}

                {profile.profile?.matricule && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        Student ID
                      </h3>
                      <p className="text-sm text-gray-600">
                        {profile.profile.matricule}
                      </p>
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            {/* <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h2>

              {skills.length > 0 ? (
                <div className="space-y-4">
                  {skills.map((skill: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          {skill.name}
                        </h3>
                        <span className="text-xs text-gray-500 capitalize">
                          {skill.proficiency_level}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-blue-600`}
                          style={{
                            width: getProficiencyPercentage(
                              skill.proficiency_level
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No skills listed</p>
              )}
            </div> */}
          </div>

          {/* Main Content Area */}
          {/* <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About
              </h2>
              <div className="prose max-w-none">
                {profile.resume ? (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {profile.resume}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    No information provided
                  </p>
                )}
              </div>
            </div>

          
            {profile?.user_type == "student" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills
                </h2>

                {skills.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                    {skills.map((skill: any, index: number) => {
                      const percentage = getProficiencyPercentage(
                        skill.proficiency_level
                      );
                      const numericPercentage = parseInt(percentage);

                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative w-20 h-20 mb-2">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e6e6e6"
                                strokeWidth="2"
                              />
                              <path
                                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#19488e"
                                strokeWidth="2"
                                strokeDasharray={`${numericPercentage}, 100`}
                              />
                              <text
                                x="18"
                                y="20.5"
                                textAnchor="middle"
                                fill="#19488e"
                                fontSize="8"
                              >
                                {percentage}
                              </text>
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No skills listed
                  </p>
                )}
              </div>
            )}
          </div> */}
        </div>
      </div>
      <AddChildForm parentId={parentId} onSubmit={handleAddChild} />
      <ChildrenList childrenList={children} />
    </div>
  );
};

export default UserProfilePage;
