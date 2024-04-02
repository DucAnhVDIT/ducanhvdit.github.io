import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import customerRepository from '../../repositories/customerRepository';

function ClientsMainPage() {
    const [customersList, setCustomersList] = useState<any[]>([]);

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            const response = await customerRepository.getCustomer();
            console.log("API Response:", response.data); 
            if (response.data.Customers && Array.isArray(response.data.Customers)) {
                console.log("Customer data:", response.data.Customers);
                setCustomersList(response.data.Customers);
            } else {
                console.error("No customer data found in response:", response.data);
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'CustomerCardID', headerName: 'Customer ID', width: 180 },
        { field: 'FirstName', headerName: 'First Name', width: 150 },
        { field: 'LastName', headerName: 'Last Name', width: 150 },
        // Add more columns as needed
    ];

    const rows = customersList.map(customer => ({
        id: customer.CustomerID,
        CustomerCardID: customer.CustomerCardID,
        FirstName: customer.FirstName,
        LastName: customer.LastName,
        // Add more fields as needed
    }));

    return (
        <div style={{ height: 650, width: '100%' }} className='mt-10'>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

export default ClientsMainPage;
