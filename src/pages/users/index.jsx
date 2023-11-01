// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import TableServerSide from 'src/views/users/Table'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const DataGrid = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              Users
            </LinkStyled>
          </Typography>
        }
        subtitle={
          <Typography sx={{ color: 'text.secondary' }}>
            Data Grid is a fast and extendable react data table and react data grid.
          </Typography>
        }
      />

      <Grid item xs={12}>
        <TableServerSide />
      </Grid>
    </Grid>
  )
}

export default DataGrid
