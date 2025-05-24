import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProfileById } from "@/hooks/profile";
import profilepic from "@/assets/Colorful Finger Paint Fun_ Engaging Kids….jpeg";
import Header from "@/Notification/Header";
import AddChildForm from "./AddChildForm";
import ChildrenList from "./ChildrenList";
import { useChildren } from "@/hooks/children";
import { useAddChild } from "@/hooks/children";

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id && !isNaN(Number(id)) ? parseInt(id) : null;
  const { data: profile, isLoading, error } = useProfileById(userId || 0);
  const navigate = useNavigate();
  
  // Use the children hook
  const { data: children = [], refetch } = useChildren();
  const addChildMutation = useAddChild();
  
  // Replace this with actual logged-in parent ID
  const parentId = 1; 

  const handleAddChild = async (childData: any) => {
    try {
      await addChildMutation.mutateAsync({
        ...childData,
        parent: { id: parentId }
      });
      refetch(); // Refresh the children list after adding
    } catch (error) {
      console.error("Error adding child:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Child Form */}
      <AddChildForm 
        parentId={parentId} 
        onSubmit={handleAddChild} 
        isLoading={addChildMutation.isPending}
      />
      
      {/* Children List */}
      <ChildrenList childrenList={children} />
    </div>
  );
};

export default UserProfilePage;