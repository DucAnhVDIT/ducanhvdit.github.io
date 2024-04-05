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
import CampaignIcon from '@mui/icons-material/Campaign';

function Campaigns() {
  return (
    <Card sx={{width:'30%', boxShadow:'none', border:'solid 1px grey'}}>
        <CardHeader
            sx={{ display: 'flex', alignItems: 'center' }}
            title={<Typography variant="h5">Campaigns</Typography>}
            avatar={
            <Avatar sx={{ backgroundColor: '#1E40AF'}}>
                <CampaignIcon />
            </Avatar>
            }
        />
        <CardContent>
            <Typography variant="body1" className=' text-gray-500'>
            Effortlessly create, schedule, and monitor targeted campaigns tailored to your audience's preferences and behaviors.Ensuring every campaign delivers impactful results.
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

export default Campaigns