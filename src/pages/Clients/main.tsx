import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import customerRepository from '../../repositories/customerRepository';
import {Box, CircularProgress, Typography} from '@mui/material'
import './styles.css'

function ClientsMainPage() {
    const [customersList, setCustomersList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetchCustomerData();
    }, []);




    const fetchCustomerData = async () => {
        setTimeout(async () => {
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
            } finally {
                setLoading(false); 
            }
        }, 1000); 
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) {
          return ''; // Handle null or undefined case
        }
      
        const names = name.split(' ');
        return names.map((name: string) => name[0]).join('');
      };

    const columns: GridColDef[] = [
        {
            field:"Avatar",
            headerName: '',
            renderCell: (params) => (
                <div className="flex items-center">
                    {/* Render picture if available, otherwise render initials */}
                    {params.row.picture ? (
                        <img src={params.row.picture} alt={params.value} className="w-14 h-14 rounded-full mr-2" />
                    ) : (
                        <div className="w-10 h-10 rounded-full p-2 bg-primary text-white flex items-center justify-center mr-2 mt-1">
                            <span className="text-lg">{getInitials(params.row.FirstName)}</span>
                        </div>
                    )}
                </div>
            )
        },
        { 
            field: 'CustomerCardID', 
            headerName: 'Customer ID', 
            width: 180, 
            headerClassName: 'desktop-only', 
            cellClassName: 'desktop-only', 
        },
        { 
            field: 'FirstName', 
            headerName: 'First Name', 
            width: 200, 
        },
        { field: 'LastName', headerName: 'Last Name', width: 150 },
        { field: 'Phone', headerName: 'Phone', width: 150 },
        { field: 'Email', headerName: 'Email', width: 150 },
        
    ];

    


    const rows = customersList.map(customer => ({
        id: customer.CustomerID,
        CustomerCardID: customer.CustomerCardID || "-", 
        FirstName: customer.FirstName || "-",
        LastName: customer.LastName || "-", 
        Phone: customer.Mobile || "-", 
        Email: customer.Email || "-", 
    }));

    return (
        <>
        {loading ? ( // Show loading indicator if loading is true
                <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                    <CircularProgress />
                </Box>
            ) : (
                <div style={{ height: 640, width: '100%' }} className='mt-3'>
                    {/* <Typography variant='h4' className='mb-2'>
                        Clients list
                    </Typography> */}
                    <DataGrid
                        rows={rows}
                        onRowClick={()=> {alert("Hello em")}}
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
            )}
        </>
    );
}

export default ClientsMainPage;
