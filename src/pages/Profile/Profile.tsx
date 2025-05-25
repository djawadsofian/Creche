import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useProfileById } from "@/hooks/profile";
import profilepic from "@/assets/Colorful Finger Paint Fun_ Engaging Kids….jpeg";
import Header from "@/Notification/Header";
import AddChildForm from "./AddChildForm";
import ChildrenList from "./ChildrenList";
import { useChildren } from "@/hooks/children";
import { useAddChild } from "@/hooks/children";
import { useUsers } from "@/hooks/useUsers";
import AddMealForm from "./AddMealForm";
import MealsList from "./MealsList";
import { useMeals } from "@/hooks/meals";
import { useAddMeal } from "@/hooks/meals";
import { useAnnouncements, useCreateAnnouncement } from "@/hooks/announcements";
import AddAnnouncementForm from "./AddAnnouncementForm";
import AnnouncementsList from "./AnnouncementList";

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const userId = id && !isNaN(Number(id)) ? parseInt(id) : null;
  
  // Get user data from localStorage based on current route
  const isParentDashboard = location.pathname.includes('parent');
  const isAdminDashboard = location.pathname.includes('admin');
  const userRole = isParentDashboard ? 'parent' : isAdminDashboard ? 'admin' : null;
  const storedUser = userRole ? JSON.parse(localStorage.getItem(userRole) || 'null') : null;

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileById(userId || 0);

  // Users data
  const { data: users = [], isLoading: isUsersLoading } = useUsers();
  
  // Use stored user data if available, otherwise fall back to API data
  const currentUser = storedUser || users[0] || {};

  // Children data
  const { data: children = [], refetch: refetchChildren } = useChildren();
  const addChildMutation = useAddChild();

  // Meals data
  const { data: meals = [], refetch: refetchMeals } = useMeals();
  const addMealMutation = useAddMeal();

  // Announcements data
  const { data: announcements = [], refetch: refetchAnnouncements } = useAnnouncements();
  const createAnnouncementMutation = useCreateAnnouncement();

  // Get parent ID from stored user or use default
  const parentId = storedUser?.id || 1;

  const handleAddChild = async (childData: any) => {
    try {
      await addChildMutation.mutateAsync({
        ...childData,
        parent: { id: parentId },
      });
      refetchChildren();
    } catch (error) {
      console.error("Error adding child:", error);
    }
  };

  const handleAnnouncementSubmit = async (announcementData: any) => {
    try {
      await createAnnouncementMutation.mutateAsync(announcementData);
      refetchAnnouncements();
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const handleAddMeal = async (mealData: any) => {
    try {
      await addMealMutation.mutateAsync(mealData);
      refetchMeals();
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  if (isProfileLoading || isUsersLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Combine profile data with current user data
  const userData = {
    ...currentUser,
    ...profile,
  };

  // Determine which components to show based on user role
  const showParentFeatures = userRole === 'parent';
  const showAdminFeatures = userRole === 'admin';

  return (
    <div className="bg-gray-50 z-0 flex flex-col gap-3 h-">
      {/* Header/Banner Section */}
      <Header />
      <div className="bg-[#FCF259] h-44 relative mt-20">
        {/* Profile Information Overlay */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6 sm:px-32">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden pb-10 pt-4">
            <div className="flex flex-col md:flex-row md:items-end">
              {/* Profile Picture */}
              <div className="flex justify-center md:justify-start px-6 -mt-16 md:mt-0 md:-mb-6 relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <img
                    src={userData?.profile_picture_url || profilepic}
                    alt={`${userData?.name || "User"}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name and Basic Info */}
              <div className="p-6 pt-8 md:pt-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userData?.name || "User"}
                    </h1>
                    <p className="text-gray-600 text-extrabold">
                      {userData?.role || "user"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-32 w-full px-6 sm:px-32 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informations
              </h2>
              <div className="space-y-4">
                {userData?.email && (
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
                      <p className="text-sm text-gray-600">
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent-specific features */}
      {showParentFeatures && (
        <>
          <AddChildForm
            parentId={parentId}
            onSubmit={handleAddChild}
            isLoading={addChildMutation.isPending}
          />

          <ChildrenList childrenList={children} />

          <AddMealForm
            onSubmit={handleAddMeal}
            isLoading={addMealMutation.isPending}
          />

          <MealsList mealsList={meals} />
        </>
      )}

      {/* Admin-specific features */}
      {showAdminFeatures && (
        <>
          <AddAnnouncementForm
            onSubmit={handleAnnouncementSubmit}
            isLoading={createAnnouncementMutation.isPending}
          />
          <AnnouncementsList announcements={announcements} />
        </>
      )}
    </div>
  );
};

export default UserProfilePage;