import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function Timelines() {
  return (
    <div>
        <VerticalTimeline
            layout="1-column-left"
            className='w-[50%]'
            lineColor={"grey"}
        >
            <VerticalTimelineElement
                className="vertical-timeline-element--work "
                // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="£25"
                iconStyle={{ background: '#1E40AF', color: '#fff' }}
                icon={<CalendarTodayIcon />}
            >
                <div className='flex justify-between' >
                    <h5 className="vertical-timeline-element-subtitle">Mon 3 March 2024 11:54 am</h5>
                    <h5 className="status text-[#1E40AF] font-semibold">Booked</h5>
                </div>  
                <p>
                    Pedicure - John
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="£50"
                iconStyle={{ background: '#1E40AF', color: '#fff' }}
                icon={<CalendarTodayIcon />}
            >   
                <div className='flex justify-between'>
                    <h5 className="vertical-timeline-element-subtitle">Tue 15 Jun 2023 2:54 pm</h5>
                    <h5 className="status text-green-700 font-semibold">Completed</h5>
                </div>
                <p>
                    Full Set - Linh
                </p>
            </VerticalTimelineElement>
        </VerticalTimeline>
    </div>
  )
}

export default Timelines