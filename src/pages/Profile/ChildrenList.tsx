import React from "react";

interface Child {
  id: number;
  name: string;
  birthDate: string;
  allergies: string;
  specialNeeds: string;
}

interface ChildrenListProps {
  childrenList: Child[];
  isLoading?: boolean;
  isError?: boolean;
}

const ChildrenList: React.FC<ChildrenListProps> = ({ 
  childrenList, 
  isLoading = false,
  isError = false 
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
          Error loading children. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-[#F16767] mb-8 text-center">
        Your Children
      </h2>

      {childrenList.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any children yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {childrenList.map((child) => (
            <div
              key={child.id}
              className="bg-white shadow-md rounded-lg p-5 border border-[#FCE3E3]"
            >
              <h3 className="text-xl font-semibold text-[#F16767] mb-2">
                {child.name}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Birth Date:</strong> {new Date(child.birthDate).toLocaleDateString()}
              </p>
              {child.allergies && (
                <p className="text-gray-700 mb-1">
                  <strong>Allergies:</strong> {child.allergies}
                </p>
              )}
              {child.specialNeeds && (
                <p className="text-gray-700">
                  <strong>Special Needs:</strong> {child.specialNeeds}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildrenList;