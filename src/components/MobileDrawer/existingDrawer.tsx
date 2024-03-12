import React from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';


interface ExistingDrawerProps {
    setDrawerIsOpen: (value: boolean) => void;
    drawerIsOpen: any
}

function ExistingDrawer({drawerIsOpen, setDrawerIsOpen}: ExistingDrawerProps) {
  return (
    <div>
        <Drawer
            className="sm:hidden"
            anchor="bottom"
            open={drawerIsOpen}
            onClose={()=>{setDrawerIsOpen(false)}}
            ModalProps={{ keepMounted: true }}
            sx={{
                width: '80%',
                height: '100%',
                boxSizing: 'border-box',
                padding: '2rem',
                overflow: 'auto',
              }}
            >
               <h1 className="mr-auto font-bold text-2xl">
                  Edit Appoinment
              </h1>
            
        </Drawer>

    </div>
  )
}

export default ExistingDrawer