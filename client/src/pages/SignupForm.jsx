import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material'
import { useAuth } from '../components/contexts/AuthContext';

const SignupForm = () => {
  const [error, setError] = useState(false)
  const { login, updateUser } = useAuth()
  let navigate = useNavigate()
  const formSchema = yup.object().shape({
    name: yup.string().matches(/^[a-z ]+$/i, 'Only alphabetic characters allowed').required("Must enter a name").min(3),
    username: yup.string().matches(/^[a-z ]+$/i, 'Only alphabetic characters allowed').required('Must enter username'),
    email: yup.string().email("Invalid email").required('Must enter email'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      image_url: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/api/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(user => {
          if (user.error === 'Unproccessable Entity') {
            setError(true)
          } else {
            login()
            updateUser(user)
            navigate('/services')
          }
        })
        .catch(error => console.log('error', error))
    }
  })
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        {error && <div style={{ color: 'green', fontSize: '25px', paddingBottom: '5px' }}>User Already Exist</div>}
        <div>
          <TextField
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Full Name"
            variant="standard"
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.name}</div>
          )}
        </div>
        <div>
          <TextField
            id='username'
            name='username'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.username}
            label="Username"
            variant="standard"
          />
          {formik.touched.username && formik.errors.username && (
            <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.username}</div>
          )}
        </div>
        <div>
          <TextField
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            label="Email"
            variant="standard"
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.email}</div>
          )}
        </div>

        <div>
          <TextField
            id='password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Password"
            variant="standard"
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.password}</div>
          )}
        </div>
        <div style={{ paddingTop: '12px' }}>
          <Button variant="outlined" type='submit'>Submit</Button>
        </div>
      </form>
      <p>
        Already have an account? &nbsp;
        <Button sx={{ textDecoration: 'none' }} to='/login' as={NavLink} onClick={() => setShowLogin(true)}>Log In</Button>
      </p>
    </Grid>
  )
}

export default SignupForm
