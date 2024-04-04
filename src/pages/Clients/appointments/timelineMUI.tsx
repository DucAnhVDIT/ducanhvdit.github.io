import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '../../../base-components/Button';

export default function TimelineMUI() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Timeline>
            <TimelineItem>
                <TimelineSeparator>
                <TimelineDot style={{backgroundColor : '#1E40AF'}}>
                    <CalendarTodayIcon style={{fontSize:'20px'}} />
                </TimelineDot>
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Card sx={{ minWidth: 500 }}>
                    <CardContent>
                        <div className='flex justify-between' >
                            <h5 className="vertical-timeline-element-subtitle">Mon 3 March 2024 11:54 am</h5>
                            <h5 className="status text-[#1E40AF] font-semibold text-lg">Booked</h5>
                        </div>
                        <p className='mt-4 font-semibold text-lg'>
                            Pedicure - John
                        </p>
                    </CardContent>
                    <CardActions>
                        <div className='flex justify-between items-center'>
                            <Button
                            variant="primary"
                            type="button"
                            className="w-32 mr-72"
                            >
                            Pay
                            </Button>
                            <h1 className='font-bold text-2xl'>£30</h1>
                        </div>
                    </CardActions>
                </Card>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineSeparator>
                <TimelineDot style={{backgroundColor : '#1E40AF'}}>
                    <CalendarTodayIcon style={{fontSize:'20px'}} />
                </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Card sx={{ minWidth: 500 }}>
                        <CardContent>
                        <div className='flex justify-between' >
                            <h5 className="vertical-timeline-element-subtitle">Tue 15 Jun 2023 2:54 pm</h5>
                            <h5 className="status text-green-700 font-semibold text-lg">Completed</h5>
                        </div>
                        <p className='mt-4 font-semibold text-lg'>
                            Full Set - Linh
                        </p>
                        </CardContent>
                        <CardActions>
                        <div className='flex justify-between items-center'>
                            <Button
                            variant="primary"
                            type="button"
                            className="w-32 mr-72"
                            >
                            Rebook
                            </Button>
                            <h1 className='font-bold text-2xl'>£45</h1>
                        </div>
                        </CardActions>
                    </Card>
                </TimelineContent>

            </TimelineItem>
        </Timeline>
    </div>
  );
}