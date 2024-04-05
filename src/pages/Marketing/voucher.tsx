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
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function Voucher() {
  return (

        <Card sx={{width:'30%', boxShadow:'none', border:'solid 1px grey'}}>
            <CardHeader
                sx={{ display: 'flex', alignItems: 'center' }}
                title={<Typography variant="h5">Vouchers</Typography>}
                avatar={
                <Avatar sx={{ backgroundColor: '#1E40AF'}}>
                    <CardGiftcardIcon />
                </Avatar>
                }
            />
            <CardContent>
                <Typography variant="body1" className=' text-gray-500'>
                Seamlessly manage various aspects of your voucher program, including creation, customization, distribution, and tracking, all from one centralized platform.
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

export default Voucher