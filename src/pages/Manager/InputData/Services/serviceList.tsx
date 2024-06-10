import React, { useState, useEffect } from 'react';
import eposRepository from '../../../../repositories/eposRepository';

const ServicesList = () => {
  const [servicesCategory, setServicesCategory] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  // const getServicesCategory = async () => {
  //   try {
  //     const res = await eposRepository.getServicesCategory();
  //     setServicesCategory(res.data.Categories);
  //     console.log("cat",res.data)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getServicesList = async () => {
    try {
      const res = await eposRepository.getServices(0);
      setServicesList(res.data.Services);
      console.log("res",res.data.Services)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // getServicesCategory();
    getServicesList();
  }, []);

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-semibold mb-4">Services List</h2>
      <div className="space-y-4">
        {servicesCategory.length > 0 ? (
          servicesCategory.map((category) => (
            <div
              key={category.id}
              className="bg-gray-100 p-4 rounded-md shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              {category.services.map((service) => (
                <div key={service.id} className="pl-4">
                  <p className="text-lg">{service.name}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Loading service categories...</p>
        )}
        {servicesList.length > 0 ? (
          servicesList.map((service) => (
            <div key={service.id} className="bg-gray-200 p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-md">{service.description}</p>
            </div>
          ))
        ) : (
          <p>Loading services...</p>
        )}
      </div> */}
    </div>
  );
};

export default ServicesList;
