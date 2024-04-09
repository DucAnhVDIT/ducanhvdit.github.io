import Card from '@mui/material/Card/Card'
import CardActions from '@mui/material/CardActions/CardActions'
import CardContent from '@mui/material/CardContent/CardContent'
import React from 'react'
import Button from '../../base-components/Button'
import BirthdayReminder from './birthdayReminder'
import ReturnCustomer from './returnCustomer'
import ReviewSettings from './reviewSettings'
import Voucher from './voucher'
import Campaigns from './campaigns'
import Templates from './templates'

function MainPage() {
  return (
    <div className='p-7 flex flex-col opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay'>
        <div className='flex justify-between'>
            <BirthdayReminder />
            <Voucher />
            <ReviewSettings />
        </div>
        
        <div className='flex justify-between mt-10'>
            <ReturnCustomer />
            <Campaigns />
            <Templates />
        </div>
    </div>
  )
}

export default MainPage