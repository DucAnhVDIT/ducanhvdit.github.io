import React, { useEffect, useState } from "react";
import eposRepository from "../../../../repositories/eposRepository";
import { MoreVertical, Plus } from "lucide-react";
import EditModal from "../Modal/editModal";

function ServiceCat() {
  const [servicesCategory, setServicesCategory] = useState<any[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServicesCategory();
  }, []);

  const getServicesCategory = async () => {
    setLoading(true);
    try {
      // Simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await eposRepository.getServicesCategory();
      setServicesCategory(res.data.Categories);
      console.log(res.data.Categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleEditCategory = (category: any) => {
    setCurrentCategory(category);
    setShowEditModal(true);
  };

  const handleSaveCategory = async (categoryId: number, newName: string) => {
    console.log("Save category", categoryId, newName);
    const updatedCategories = servicesCategory.map((cat: any) =>
      cat.CategoryID === categoryId ? { ...cat, CategoryName: newName } : cat
    );
    setServicesCategory(updatedCategories);
  };

  const handleDeleteCategory = (categoryId: number) => {
    console.log("Delete category", categoryId);
  };

  return (
    <div className="relative min-h-screen p-6 w-full">
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="skeleton">
              <div className="border p-4 rounded-md shadow-md flex justify-between items-center bg-gray-200 ">
                <div className="flex items-center space-x-4 bg-gray-200 ">
                  <span className="bg-gray-300 w-6 h-6 rounded"></span>
                  <span className="h-6 bg-gray-300 w-32 rounded"></span>
                </div>
                <span className="bg-gray-300 w-6 h-6 rounded"></span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {servicesCategory.map((category: any, index: number) => (
            <div
              key={category.CategoryID}
              className="border p-4 rounded-md shadow-md relative flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <span className="cursor-grab text-gray-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-align-left"
                  >
                    <line x1="17" y1="10" x2="3" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="17" y1="18" x2="3" y2="18"></line>
                  </svg>
                </span>
                <h2 className="text-xl font-bold">{category.CategoryName}</h2>
              </div>
              <button
                onClick={() => handleDropdownToggle(index)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <MoreVertical size={24} />
              </button>
              {dropdownVisible === index && (
                <div className="absolute right-0 top-10 bg-white border rounded-md shadow-lg z-10 w-32">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.CategoryID)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showEditModal && currentCategory && (
        <EditModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveCategory}
          categoryId={currentCategory.CategoryID}
          initialName={currentCategory.CategoryName}
        />
      )}
    </div>
  );
}

export default ServiceCat;
