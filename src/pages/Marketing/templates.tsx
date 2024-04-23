import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Divider, Typography } from '@mui/material';
import { MdCake } from 'react-icons/md';
import CakeIcon from '@mui/icons-material/Cake';
import Button from '../../base-components/Button';
import EmailIcon from '@mui/icons-material/Email';

function Templates() {
    return (
        <Card sx={{width:'25%', display: 'flex', flexDirection: 'column'}}>
          <CardHeader
            sx={{ display: 'flex', alignItems: 'center' }}
            title={<Typography variant="h6">Templates</Typography>}
            avatar={
              <Avatar sx={{ backgroundColor: '#1E40AF'}}>
                <EmailIcon />
              </Avatar>
            }
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="body1" className=' text-gray-500'>
                Creating reusable templates for various purposes
            </Typography>
          </CardContent>
          {/* Card Actions with setup button */}
          <CardActions sx={{ justifyContent: 'flex-end', flex: '0 0 auto' }}>
            <Button variant="primary" className='w-32'>
              Set Up
            </Button>
          </CardActions>
        </Card>
      )
}

export default Templates


{/* <Avatar sx={{ backgroundColor: '#1E40AF'}}>
                <EmailIcon />
            </Avatar> */}

//    Creating reusable templates for various purposes