// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { useSelector, useDispatch } from 'react-redux'
import { setRegistrationData } from 'src/store/apps/pharmacy'

// ** Custom Components Imports

const ImgWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 4, 0, 4)
  },
  [theme.breakpoints.up('sm')]: {
    height: 250,
    padding: theme.spacing(5, 5, 0, 5)
  },
  '& img': {
    height: 'auto',
    maxWidth: '100%'
  }
}))

const GeneralDetails = () => {
  // ** States

  // ** Hook
  const theme = useTheme()
  const dispatch = useDispatch()
  const data = useSelector(state => state.pharmacy).registrationData

  return (
    <>
      <Grid container sx={{ mb: 6 }} spacing={4}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <ImgWrapper>
            <img width={650} alt='illustration' src={`/images/pages/create-deal-type-${theme.palette.mode}.png`} />
          </ImgWrapper>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            type='text'
            value={data.full_name}
            onChange={e => {
              dispatch(setRegistrationData({ ...data, full_name: e.target.value }))
            }}
            label='Full Name'
            placeholder='Enter Full Name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            type='number'
            max='10'
            value={data.contact}
            onChange={e => {
              dispatch(setRegistrationData({ ...data, contact: e.target.value }))
            }}
            label='Contact no.'
            placeholder='Enter Contact Number'
          />
        </Grid>
      </Grid>
    </>
  )
}

export default GeneralDetails
