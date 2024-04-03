import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import customerRepository from '../../repositories/customerRepository';
import {Box, CircularProgress, Typography} from '@mui/material'
import './styles.css'
import Button from '../../base-components/Button';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../base-components/Form/FormInput';
import Lucide from '../../base-components/Lucide';
import { Flip, ToastContainer, ToastContentProps, Zoom, toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function ClientsMainPage() {
    const [customersList, setCustomersList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchValueClient, setSearchValueClient] = useState("");
    const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);
    
    const theme = createTheme({
        palette: {
          mode: 'light', 
          background: {
            default: '#FFFFFF', 
          },
        },
      });
      

    useEffect(() => {
        fetchCustomerData();
    }, []);


    const handleSelectionChange = (newSelection: string[]) => {
        setSelectedRows(newSelection);
    };


    const fetchCustomerData = async () => {
        setTimeout(async () => {
            try {
                const response = await customerRepository.getCustomer();
                console.log("API Response:", response.data);
                if (response.data.Customers && Array.isArray(response.data.Customers)) {
                    // console.log("Customer data:", response.data.Customers);
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

    const navigate = useNavigate()

    const handleAddBtn = () => {
        navigate('/clients/add')
        console.log('hello')
    }

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

    const filteredRows = customersList
    ? customersList
        .filter(customer =>
            (customer.FirstName || '').toLowerCase().includes(searchValueClient.toLowerCase()) ||
            (customer.LastName || '').toLowerCase().includes(searchValueClient.toLowerCase()) ||
            (customer.Email || '').toLowerCase().includes(searchValueClient.toLowerCase()) ||
            (customer.Mobile || '').toLowerCase().includes(searchValueClient.toLowerCase()) ||
            (customer.CustomerCardID || '').toLowerCase().includes(searchValueClient.toLowerCase())
        )
        .map(customer => ({
            id: customer.CustomerID,
            CustomerCardID: customer.CustomerCardID || "-",
            FirstName: customer.FirstName || "-",
            LastName: customer.LastName || "-",
            Phone: customer.Mobile || "-",
            Email: customer.Email || "-",
        }))
    : [];


    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative text-slate-500 mt-2">
                <FormInput
                    type="text"
                    className=" w-96 h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                    placeholder="Search client"
                    value={searchValueClient}
                    onChange={(e) => setSearchValueClient(e.target.value)}
                />
                    {searchValueClient ? (
                        <Lucide
                        icon="XCircle"
                        className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3 cursor-pointer"
                        onClick={() => setSearchValueClient("")}
                        />
                    ) : (
                        <Lucide
                            icon="Search"
                            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                        />
                    )}
                </div>
            </div>
            <div>
                <Button className="w-32 px-6 bg-primary text text-white mr-3 mt-2" onClick={handleAddBtn}>
                    Add
                </Button>
                {selectedRows.length === 1 && (
                    <Button className="w-32 px-6 bg-primary text text-white mr-3 mt-2" onClick={()=>{}}>
                        Edit
                    </Button>
                )}
                {selectedRows.length > 0 && (
                    <Button className="w-32 px-6 bg-red-500 text text-white mr-3 mt-2" onClick={()=>{}}>
                        Delete
                    </Button>
                )}
            </div>
        </div>

        {loading ? ( // Show loading indicator if loading is true
                <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                    <CircularProgress />
                </Box>
            ) : (
                <div style={{ height: 640, width: '100%' }} className='mt-3'>
                        <DataGrid
                            sx={{
                                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                outline: "none !important",
                                },
                                '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                                    backgroundColor: "white",
                                    color: "black",
                                    fontWeight: 500,}
                            }}                         
                            rows={filteredRows}
                            // onRowClick={()=> {alert("Hello em")}}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            rowSelectionModel={selectedRows}
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setSelectedRows(newRowSelectionModel);
                            }}
                        />

                </div>

            )}
        </>
        
    );
}

export default ClientsMainPage;
