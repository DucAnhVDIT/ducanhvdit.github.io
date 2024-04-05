import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import { MdCake } from 'react-icons/md'; 
import Button from '../../base-components/Button';

function BirthdayReminder() {
  return (
    <Card sx={{width:'30%', boxShadow:'none', border:'solid 1px grey'}}>
      <CardHeader
        sx={{ display: 'flex', alignItems: 'center' }}
        title={<Typography variant="h5">Birthday Reminder</Typography>}
        avatar={
          <Avatar sx={{ backgroundColor: '#1E40AF'}}>
            <MdCake />
          </Avatar>
        }
      />
      <CardContent>
        <Typography variant="body1">
          This feature allows you to send personalized birthday reminders to your customers. 
          Set up this feature today to enhance your customer experience
          and make your business stand out.
        </Typography>
      </CardContent>
      {/* Card Actions with setup button */}
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="primary" className='w-32'>
          Set Up
        </Button>
      </CardActions>
    </Card>
  );
}

export default BirthdayReminder;
