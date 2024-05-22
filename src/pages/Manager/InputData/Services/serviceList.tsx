import React, { useState } from 'react'
import eposRepository from '../../../../repositories/eposRepository';

function ServiceList() {
  const [servicesCategory, setServicesCategory] = useState<any>([]);

  const getServicesCategory = async () => {
    try {
      const res = await eposRepository.getServicesCategory();
      setServicesCategory(res.data.Categories);
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <div>
        
    </div>
  )
}

export default ServiceList