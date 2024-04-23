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

function BirthdayReminder() {
  return (
    <Card className="w-[25%]">
      <CardHeader
        sx={{ display: 'flex', alignItems: 'center' }}
        title={<Typography variant="h6">Birthday Reminder</Typography>}
        avatar={
          <Avatar sx={{ backgroundColor: '#1E40AF'}}>
            <CakeIcon />
          </Avatar>
        }
      />
      <CardContent>
        <Typography variant="body1" className=' text-gray-500'>
         Sends automatic birthday wishes to clients when their special day is near.
        </Typography>
      </CardContent>
      {/* Card Actions with setup button */}
      <CardActions sx={{ justifyContent: 'flex-end', flex: '0 0 auto' }}>
        <Button variant="primary" className='w-32'>
          Set Up
        </Button>
      </CardActions>
    </Card>
  );
}

export default BirthdayReminder;
