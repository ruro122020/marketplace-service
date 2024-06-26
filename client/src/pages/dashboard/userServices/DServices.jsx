import React, { useState } from 'react'
import Form from './Form'
import { Button, Grid } from '@mui/material'
import ServiceCard from './ServiceCard'
import { post, update } from '../../../api'
import { useAuth } from '../../../components/contexts/AuthContext'

const DServices = () => {
  const [showForm, setShowForm] = useState(false)
  const [editService, setEditService] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const { user, isLoggedIn, updateUser } = useAuth()

  const handleAddService = async (serviceObj) => {
    if (serviceObj) {
      const newService = await post('/api/services', serviceObj)
      setShowForm(false)
      updateUser({ ...user, services: [...user.services, newService] })
    }
  }
  const handleDelete = (id) => {
    const newServiceObj = user.services.filter(service => service.id !== id)
    const providerBookings = user.provider_bookings.filter(booking => booking.service_id !== id)

    updateUser({ ...user, services: newServiceObj, provider_bookings: providerBookings })
  }

  const handleEdit = async (serviceObj) => {
    console.log('serviceObj', serviceObj)
    const newService = await update(`/api/services/${serviceObj.id}`, serviceObj)
    const newServiceList = user.services.map(service => {
      if (service.id === newService.id) {
        return newService
      } else {
        return service
      }
    })
    updateUser({ ...user, services: newServiceList })
    setEditService({})
    setShowForm(false)
    setIsEdit(false)
  }

  const receiveServiceObj = (serviceObj) => {
    setIsEdit(true)
    setEditService(serviceObj)
    setShowForm(true)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setShowForm(false)
  }

  if (!isLoggedIn) return <div>Loading Services ...</div>

  return (
    <div>
      <h1>Services</h1>
      <Button onClick={() => setShowForm(!showForm)}> {showForm ? '-' : '+'} Service</Button>
      {isEdit ?
        showForm && <Form onSubmit={handleEdit} initialValues={editService} onCancel={handleCancel} />
        :
        showForm && <Form onSubmit={handleAddService} initialValues={{
          title: '',
          description: '',
          price: '',
          location: '',
          category: ''
        }}
          onCancel={handleCancel}
        />}

      <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '15px' }}>
        {user.services.map(service => <ServiceCard
          key={service.id}
          service={service}
          onDelete={handleDelete}
          onEdit={receiveServiceObj} />)}
      </Grid>

    </div>
  )
}

export default DServices
