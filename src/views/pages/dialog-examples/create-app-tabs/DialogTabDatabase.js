// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const TabDatabase = () => {
  const [value, setValue] = useState('firebase')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <CustomTextField fullWidth sx={{ mb: 4 }} label='Database Name' placeholder='eparmar_database' />
      <Typography variant='h5' sx={{ mb: 4 }}>
        Select Database Engine
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() => setValue('firebase')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='tabler:brand-firebase' />
            </CustomAvatar>
            <div>
              <Typography>Firebase</Typography>
              <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                Cloud Firestore
              </Typography>
            </div>
          </Box>
          <Radio value='firebase' onChange={handleChange} checked={value === 'firebase'} />
        </Box>
        <Box
          onClick={() => setValue('aws')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='warning' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='tabler:brand-amazon' />
            </CustomAvatar>
            <div>
              <Typography>AWS</Typography>
              <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                Amazon Fast NoSQL Database
              </Typography>
            </div>
          </Box>
          <Radio value='aws' onChange={handleChange} checked={value === 'aws'} />
        </Box>
        <Box
          onClick={() => setValue('sql')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='tabler:database' />
            </CustomAvatar>
            <div>
              <Typography>MySQL</Typography>
              <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                Basic MySQL database
              </Typography>
            </div>
          </Box>
          <Radio value='sql' onChange={handleChange} checked={value === 'sql'} />
        </Box>
      </Box>
    </div>
  )
}

export default TabDatabase
