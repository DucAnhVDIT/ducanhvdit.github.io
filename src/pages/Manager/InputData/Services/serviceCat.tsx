import React, { useEffect, useState } from "react";
import eposRepository from "../../../../repositories/eposRepository";
import { MoreVertical, Plus } from "lucide-react";
import EditModal from "../Modal/editModal";


function ServiceCat() {
  const [servicesCategory, setServicesCategory] = useState<any>([]);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);

  useEffect(() => {
    getServicesCategory();
  }, []);

  const getServicesCategory = async () => {
    try {
      const res = await eposRepository.getServicesCategory();
      setServicesCategory(res.data.Categories);
      console.log(res.data.Categories);
    } catch (err) {
      console.error(err);
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
    <div className="relative min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {servicesCategory.map((category: any, index: number) => (
          <div
            key={category.CategoryID}
            className="border p-4 rounded-md shadow-md relative"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-2">
                {category.CategoryName}
              </h2>
              <button
                onClick={() => handleDropdownToggle(index)}
                className="text-gray-600"
              >
                <MoreVertical size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              {category.Description || "No description available"}
            </p>
            {dropdownVisible === index && (
              <div className="absolute right-4 top-10 bg-white border rounded-md shadow-lg z-10 w-32">
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
