import Card from '@mui/material/Card/Card'
import CardActions from '@mui/material/CardActions/CardActions'
import CardContent from '@mui/material/CardContent/CardContent'
import React from 'react'
import Button from '../../base-components/Button'
import BirthdayReminder from './birthdayReminder'
import ReturnCustomer from './returnCustomer'

function MainPage() {
  return (
    <div className='p-7'>
        <div className='flex justify-between'>
            <BirthdayReminder />
            <ReturnCustomer />
            <BirthdayReminder />
        </div>
    </div>
  )
}

export default MainPage