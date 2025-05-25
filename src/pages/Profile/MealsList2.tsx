
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

const MealsList2: React.FC<MealsListProps> = ({ 
  mealsList, 
  isLoading = false,
  isError = false 
}) => {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-[#00b4d8] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-[#f72585] font-medium">
          Error loading meals. Please try again later.
        </p>
      </div>
    );
  }

  // Function to get meal type color
  const getMealTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'breakfast':
        return 'bg-[#00b4d8]/10 text-[#00b4d8]';
      case 'lunch':
        return 'bg-[#f72585]/10 text-[#f72585]';
      case 'snack':
        return 'bg-[#4cc9f0]/10 text-[#4cc9f0]';
      case 'dinner':
        return 'bg-[#7209b7]/10 text-[#7209b7]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8 text-center">
        Meal History
      </h2>

      {mealsList.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">
            No meals have been added yet. Add your first meal to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealsList.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getMealTypeColor(meal.type)}`}>
                  {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(meal.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>

                {meal.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                    <p className="text-gray-700">{meal.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList2;