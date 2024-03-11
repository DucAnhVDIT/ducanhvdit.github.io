import React, { useState } from 'react';
import ServiceCard from '../ServiceCard';

const ServiceCategories = ({ services }: { services: { CategoryName: string }[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getGroupedServices = (services: { CategoryName: string }[]) => {
    const categories: string[] = [];
    services.forEach((service) => {
      const category = service.CategoryName || 'Uncategorized';
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    return categories;
  };

  const categories = getGroupedServices(services);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category}>
          <button onClick={() => handleCategoryClick(category)}>{category}</button>
          {selectedCategory === category && (
            <ul>
              {/* Render the list of services for the selected category */}
              {services
                .filter((service) => service.CategoryName === category)
                .map((service) => (
                    <ServiceCard key={""} service={service} onSelect={()=>{}} />
                ))}
            </ul>
            )}
        </div>
      ))}
    </div>
  );
};

export default ServiceCategories;
