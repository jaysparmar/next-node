// ** Demo Components Imports
import CreateDeal from 'src/views/pages/wizard-examples/create-deal'

// ** Custom Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Container } from '@mui/system'
import { Card, CardContent, Typography } from '@mui/material'

const WizardExamples = () => {
  return (
    <Container sx={{ marginTop: '20px' }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Medser Pharmacy Registration Form
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Welcome to our pharmacy registration portal. To register your pharmacy, please fill in the required details
            in the provided form. Upon submission, your application will undergo a thorough review process that usually
            takes 2-3 days. Once approved, you will receive confirmation and be authorized to operate as a registered
            pharmacy.
          </Typography>
        </CardContent>
      </Card>
      <DatePickerWrapper sx={{ marginTop: '20px' }}>
        <CreateDeal />
      </DatePickerWrapper>
    </Container>
  )
}

WizardExamples.getLayout = page => <BlankLayout>{page}</BlankLayout>
WizardExamples.authGuard = false

export default WizardExamples
