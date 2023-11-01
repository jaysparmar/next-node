import { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** ThirdParty Components
import axios from 'axios'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  return (
    <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
      {getInitials(`${row.firstname} ${row.lastname}` ? `${row.firstname} ${row.lastname}` : 'John Doe')}
    </CustomAvatar>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 290,
    field: 'full_name',
    headerName: 'Name',
    renderCell: params => {
      const { row } = params
      console.log(row)

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {`${row.firstname} ${row.lastname}`}
            </Typography>
            <Typography noWrap variant='caption'>
              {row.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'salary',
    headerName: 'Id',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.id}
      </Typography>
    )
  }

  // {
  //   flex: 0.125,
  //   field: 'age',
  //   minWidth: 80,
  //   headerName: 'Age',
  //   renderCell: params => (
  //     <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //       {params.row.age}
  //     </Typography>
  //   )
  // }
]

const UsersTable = () => {
  // ** States
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('asc')
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('id')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  function loadServerRows(currentPage, data) {
    return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
  }

  const fetchTableData = useCallback(
    async (sort, q, column) => {
      await axios
        .post('/api/admin/listing', {
          search: q,
          order: sort,
          sort: column,
          limit: paginationModel.pageSize,
          offset: Math.round(Math.round(paginationModel.page) * paginationModel.pageSize)
        })
        .then(res => {
          setTotal(res.data.data.total.total)
          setRows(res.data.data.rows)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  )
  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn)
  }, [fetchTableData, searchValue, sort, sortColumn])

  const handleSortModel = newModel => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  const handleSearch = value => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn)
  }

  return (
    <Card>
      <CardHeader title='Server Side' />
      <DataGrid
        autoHeight
        pagination
        rows={rows}
        rowCount={total}
        columns={columns}
        checkboxSelection
        sortingMode='server'
        paginationMode='server'
        pageSizeOptions={[1, 5, 10, 25, 50]}
        paginationModel={paginationModel}
        onSortModelChange={handleSortModel}
        slots={{ toolbar: ServerSideToolbar }}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'tonal'
          },
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default UsersTable
