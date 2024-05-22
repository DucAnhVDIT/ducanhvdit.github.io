import React, { useState } from 'react';

interface Service {
  ProductID: number;
  CategoryID: number;
  CompanyID: number | null;
  ProductName: string;
  CategoryName: string;
  Duration: string;
  Price: string;
}

interface StaffServicesContentProps {
  staffServiceData: Service[];
}

function StaffServicesContent({ staffServiceData }: StaffServicesContentProps) {
  if (!staffServiceData) return <div>No services available</div>;

  const categories: string[] = Array.from(new Set(staffServiceData.map(service => service.CategoryName)));
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <div className="flex overflow-x-auto mb-4 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 whitespace-nowrap ${activeCategory === category ? 'border-b-2 border-black' : 'border-transparent'} hover:border-black`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div>
        {categories.map((category) => (
          <div key={category} className={activeCategory === category ? '' : 'hidden'}>
            <h3 className="text-xl font-semibold mt-4 mb-2">{category}</h3>
            {staffServiceData.filter(service => service.CategoryName === category).map(service => (
              <div key={service.ProductID} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-primary rounded"
                    defaultChecked
                  />
                  <div>
                    <p className="font-bold">{service.ProductName}</p>
                    <p className="text-sm text-gray-600">{service.Duration} mins</p>
                  </div>
                </div>
                <div className="text-gray-900">£{service.Price}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffServicesContent;
