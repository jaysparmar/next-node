import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormLabel,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Table
} from '@mui/material'
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Box } from '@mui/system'
import CustomTextField from 'src/@core/components/mui/text-field'

const LocationSearch = () => {
  const [open, setOpen] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [autocomplete, setAutocomplete] = useState(null)
  const [map, setMap] = useState(null)
  const [geocoder, setGeocoder] = useState(null)

  const [location, setLocation] = useState({
    address_components: []
  })

  const handleSelect = () => {
    const place = autocomplete.getPlace()
    setSelectedPlace({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    })

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMarkerDrag = e => {
    setSelectedPlace({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })

    if (geocoder) {
      geocoder.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            setLocation(results[0]) // Complete location object with address details
            console.log(results[0]) // Complete location object with address details
          }
        }
      })
    }
  }

  const onMapLoad = map => {
    setMap(map)
    if (window.google) {
      setGeocoder(new window.google.maps.Geocoder())
    }
  }

  return (
    <div>
      <LoadScript googleMapsApiKey='AIzaSyAjeC2w8ekfa4BCKHMdu-su-muNQmT7xnk' libraries={['places']}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Autocomplete onLoad={autoComp => setAutocomplete(autoComp)} onPlaceChanged={handleSelect}>
              <CustomTextField fullWidth label='Address' placeholder='Enter Address' />
            </Autocomplete>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} lg={6} xl={7}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        borderBottom: 0,
                        verticalAlign: 'top',
                        '&:last-of-type': { px: '0 !important' },
                        '&:first-of-type': { pl: '0 !important' },
                        py: theme => `${theme.spacing(0.75)} !important`
                      }
                    }}
                  >
                    {location.address_components.map((row, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
                              {row.types.map((heading, index) => {
                                if (heading === 'political') {
                                  return ''
                                }
                                if (index === 0) {
                                  return heading
                                }

                                return ' or ' + heading
                              })}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: 'text.secondary' }}>{row.long_name}</Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          {location.address_components.length !== 0 && (
            <Grid item xs={12} sm={12}>
              <TextField
                multiline
                maxRows={12}
                value={location.formatted_address}
                label='Full Address'
                id='textarea-outlined-controlled'
              />
            </Grid>
          )}
        </Grid>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>Selected Location</DialogTitle>
          <DialogContent>
            {selectedPlace && (
              <div style={{ height: '400px', width: '100%' }}>
                <GoogleMap
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  center={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                  zoom={15}
                  onLoad={onMapLoad}
                >
                  {selectedPlace && (
                    <Marker
                      position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                      draggable={true}
                      onDragEnd={handleMarkerDrag}
                    />
                  )}
                </GoogleMap>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </LoadScript>
    </div>
  )
}

export default LocationSearch
