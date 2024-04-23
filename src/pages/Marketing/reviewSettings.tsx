import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Divider, Typography } from '@mui/material';
import { MdCake } from 'react-icons/md'; 
import Button from '../../base-components/Button';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ReviewsIcon from '@mui/icons-material/Reviews';

function ReviewSettings() {
  return (
    <Card sx={{width:'25%', display: 'flex', flexDirection: 'column'}}>
      <CardHeader
        sx={{ display: 'flex', alignItems: 'center' }}
        title={<Typography variant="h6">Review Settings</Typography>}
        avatar={
          <Avatar sx={{ backgroundColor: '#1E40AF'}}>
            <ReviewsIcon />
          </Avatar>
        }
      />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="body1" className=' text-gray-500'>
            Managing and monitoring customer reviews.
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

export default ReviewSettings