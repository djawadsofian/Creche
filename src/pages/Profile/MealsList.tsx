// src/components/MealsList.tsx
import React from "react";

interface Meal {
  id: number;
  date: string;
  type: string;
  notes: string;
}

interface MealsListProps {
  mealsList: Meal[];
  isLoading?: boolean;
  isError?: boolean;
}

const MealsList: React.FC<MealsListProps> = ({ 
  mealsList, 
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
          Error loading meals. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-[#F16767] mb-8 text-center">
        Meal History
      </h2>

      {mealsList.length === 0 ? (
        <p className="text-center text-gray-500">
          No meals added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mealsList.map((meal) => (
            <div
              key={meal.id}
              className="bg-white shadow-md rounded-lg p-5 border border-[#FCE3E3]"
            >
              <h3 className="text-xl font-semibold text-[#F16767] mb-2">
                {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {new Date(meal.date).toLocaleDateString()}
              </p>
              {meal.notes && (
                <p className="text-gray-700">
                  <strong>Notes:</strong> {meal.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList;