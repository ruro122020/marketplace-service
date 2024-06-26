import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/contexts/AuthContext'
import { apiLogin } from '../api'
import { NavLink } from 'react-router-dom'
import { Grid, TextField, Button } from '@mui/material'

const LoginForm = () => {
  const [error, setError] = useState(false)
  const { login, updateUser } = useAuth()
  let navigate = useNavigate()

  const formSchema = yup.object().shape({
    username: yup.string().required('Must enter username'),
    password: yup.string().required('Must enter password')
  })
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const userObj = await apiLogin(values)
      if (userObj) {
        login()
        updateUser(userObj)
        navigate('/services')
      } else {
        setError(true)
      }
    }
  })

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {error && <div style={{ color: 'red', paddingBottom: '4px' }}>Invalid Username or Password</div>}
        <div>
          <TextField
            id='username'
            name='username'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.username}
            label='Username'
            variant='standard'
          />
          {formik.touched.username && formik.errors.username && (
            <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.username}</div>
          )}
        </div>
        <div>
          <TextField
            id='password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            label='Password'
            variant='standard'
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.password}</div>
          )}
        </div>
        <div style={{ paddingTop: '12px' }}>
          <Button
            variant='outlined'
            type='submit' >Login</Button>
        </div>
      </form>
      <p>
        Don't have an account? &nbsp;
        <Button sx={{ textDecoration: 'none' }} as={NavLink} to='/signup' onClick={() => setShowLogin(false)}> Sign Up</Button>
      </p>
    </Grid>
  )
}

export default LoginForm
