import React, { useState } from "react";

interface AddChildFormProps {
  parentId: number;
  onSubmit: (child: ChildData) => void;
  isLoading?: boolean;
}

interface ChildData {
  name: string;
  birthDate: string;
  allergies: string;
  specialNeeds: string;
  parent: {
    id: number;
  };
}

const AddChildForm2: React.FC<AddChildFormProps> = ({ 
  parentId, 
  onSubmit,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    allergies: "",
    specialNeeds: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const child: ChildData = {
      ...formData,
      parent: { id: parentId },
    };
    onSubmit(child);
    setFormData({
      name: "",
      birthDate: "",
      allergies: "",
      specialNeeds: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
          Register Your Child
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] transition"
              disabled={isLoading}
              placeholder="Child's full name"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              required
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] transition"
              disabled={isLoading}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Allergies
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] transition"
              disabled={isLoading}
              rows={2}
              placeholder="List any allergies your child has"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Special Needs
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <textarea
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] transition"
              disabled={isLoading}
              rows={2}
              placeholder="Describe any special needs or requirements"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
                isLoading 
                  ? 'bg-[#00b4d8]/70 cursor-not-allowed'
                  : 'bg-[#00b4d8] hover:bg-[#0096c7] shadow-md'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering Child...
                </span>
              ) : (
                "Register Child"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildForm2;