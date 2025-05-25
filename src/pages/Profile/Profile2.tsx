import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useProfileById } from "@/hooks/profile";
import profilepic from "@/assets/Colorful Finger Paint Fun_ Engaging Kids….jpeg";

import AddChildForm2 from "./AddChildForm";
import ChildrenList2 from "./ChildrenList";
import { useChildren } from "@/hooks/children";
import { useAddChild } from "@/hooks/children";
import { useUsers } from "@/hooks/useUsers";
import AddMealForm2 from "./AddMealForm";
import MealsList2 from "./MealsList";
import { useMeals } from "@/hooks/meals";
import { useAddMeal } from "@/hooks/meals";
import { useAnnouncements, useCreateAnnouncement } from "@/hooks/announcements";
import AddAnnouncementForm2 from "./AddAnnouncementForm";
import AnnouncementsList2 from "./AnnouncementList2";
import Header2 from "@/Notification/Header2";

const Profile2: React.FC = () => {
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
      <div className="flex items-center justify-center h-screen bg-[#f8f9fa]">
        <div className="w-16 h-16 border-4 border-[#00b4d8] border-t-transparent rounded-full animate-spin"></div>
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
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* Header */}
      <Header2 />
      
      {/* Profile Banner */}
      <div className="relative bg-gradient-to-r from-[#1a1a2e] to-[#16213e] h-60">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl">
          <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden -mt-24 md:-mt-32">
              <img
                src={userData?.profile_picture_url || profilepic}
                alt={`${userData?.name || "User"}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {userData?.name || "User"}
              </h1>
              <div className="inline-block bg-[#00b4d8]/10 text-[#00b4d8] px-3 py-1 rounded-full text-sm font-medium mt-2">
                {userData?.role || "User"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                {userData?.email && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#00b4d8]/10 flex items-center justify-center text-[#00b4d8]">
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
                      <h3 className="text-sm font-medium text-gray-900">Email</h3>
                      <p className="text-sm text-gray-600">{userData?.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Parent-specific features */}
            {showParentFeatures && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">My Children</h2>
                  <AddChildForm2
                    parentId={parentId}
                    onSubmit={handleAddChild}
                    isLoading={addChildMutation.isPending}
                  />
                  <div className="mt-6">
                    <ChildrenList2 childrenList={children} />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Meal Plans</h2>
                  <AddMealForm2
                    onSubmit={handleAddMeal}
                    isLoading={addMealMutation.isPending}
                  />
                  <div className="mt-6">
                    <MealsList2 mealsList={meals} />
                  </div>
                </div>
              </>
            )}

            {/* Admin-specific features */}
            {showAdminFeatures && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Announcements</h2>
                <AddAnnouncementForm2
                  onSubmit={handleAnnouncementSubmit}
                  isLoading={createAnnouncementMutation.isPending}
                />
                <div className="mt-6">
                  <AnnouncementsList2 announcements={announcements} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile2;