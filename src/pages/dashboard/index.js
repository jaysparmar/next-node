import { Card, CardHeader } from '@mui/material'
import React from 'react'
import themeConfig from 'src/configs/themeConfig'

function index() {
  return (
    <Card>
      <CardHeader title={`Welcome To ${themeConfig.templateName} Dashboard`} />
    </Card>
  )
}

export default index
