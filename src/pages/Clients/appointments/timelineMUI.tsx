import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '../../../base-components/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedCustomer } from '../../../stores/customerSlide';
import './styles.css'

interface TimelineMUIProps {
    
}

export default function TimelineMUI() {
    const selectedCustomer = useSelector(selectSelectedCustomer);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
                    <Timeline>
                        {selectedCustomer?.Customer?.Appointments?.map((appointment: any, id: any) => (
                            <TimelineItem key={id}>
                                <TimelineSeparator>
                                    <TimelineDot style={{ backgroundColor: '#1E40AF' }}>
                                        <CalendarTodayIcon style={{ fontSize: '20px' }} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Card sx={{ minWidth: '800px' }}>
                                        <CardContent>
                                            <div className='flex justify-between'>
                                                <h5 className="vertical-timeline-element-subtitle">{appointment.BookDate}</h5>
                                                <h5 className="status text-[#1E40AF] font-semibold text-lg">{appointment.StatusName}</h5>
                                            </div>
                                            <p className='mt-4 font-semibold text-lg'>
                                                {/* {appointment.service} - {appointment.customer} */}
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
                                                {/* <h1 className='font-bold text-2xl'>{appointment.price}</h1> */}
                                            </div>
                                        </CardActions>
                                    </Card>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </div>
            )}
        </div>
    );
}
