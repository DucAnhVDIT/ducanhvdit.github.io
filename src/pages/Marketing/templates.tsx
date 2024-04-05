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
    <Card sx={{width:'30%', boxShadow:'none', border:'solid 1px grey'}}>
        <CardHeader
            sx={{ display: 'flex', alignItems: 'center' }}
            title={<Typography variant="h5">Templates</Typography>}
            avatar={
            <Avatar sx={{ backgroundColor: '#1E40AF'}}>
                <EmailIcon />
            </Avatar>
            }
        />
        <CardContent>
            <Typography variant="body1" className=' text-gray-500'>
            Simplify your outreach efforts by creating reusable templates for various purposes, from promotions and announcements to customer service interactions. 
            </Typography>
        </CardContent>
        <Divider />
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