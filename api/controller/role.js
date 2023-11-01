const knex = require('../config/mysql_db.js')
const model = require('../model/role.js')

const updateRole = async (req, res) => {
  try {
    if (!req.validate('roles', 'update')) {
      return false
    }
    const { role_name, permissions, id } = req.body

    const data = {
      role_name,
      permissions
    }
    const update = await model.updateRole(id, data)
    if (update) {
      res.json({
        error: false,
        message: 'Role has been updated'
      })
    }
  } catch (error) {
    res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const createRole = async (req, res) => {
  try {
    if (!req.validate('roles', 'create')) {
      return false
    }
    const { role_name, permissions } = req.body

    const data = {
      role_name,
      permissions
    }
    const id = await model.insertRole(data)

    if (id) {
      res.status(200).json({
        error: false,
        message: 'Role has been created',
        data: id
      })
    }
  } catch (e) {
    console.log(e)
    res.json({ error: true, message: 'Something went wrong', data: e })
  }
  res.end()
}

const paginateRole = async (req, res) => {
  try {
    if (!req.validate('roles', 'read')) {
      return false
    }
    let { offset = 0, limit = 10, order = 'asc', sort = 'id', search, status } = req.body

    let searchFrom = ['role_name', 'role_key']
    const total = await model.paginatRoleTotal(searchFrom, search, status)

    const rows = await model.paginatRole(limit, offset, searchFrom, status, sort, search, order)

    // rows = rows.map(row => {
    //     row.image = constants.getStaticUrl(row.image)
    //     return row
    // })
    let data_rows = []
    if (order === 'asc') {
      let sr = offset + 1
      await rows.forEach(row => {
        row.sr = sr
        data_rows.push(row)
        sr++
      })
    } else {
      let sr = total.total - limit * offset
      await rows.forEach(row => {
        row.sr = sr
        data_rows.push(row)
        sr--
      })
    }
    res.status(200).json({
      error: false,
      message: 'Role received successfully.',
      data: {
        rows: data_rows,
        total
      }
    })
    res.end()
  } catch (e) {
    console.log(e)
    res.json({ error: true, message: 'Something went wrong', data: e })
  }
  res.end()
}

const deleteRole = async (req, res) => {
  try {
    if (!req.validate('roles', 'delete')) {
      return false
    }
    const { id } = req.body
    const data = await knex('admins').where({ role: id }).count('id as total').where('status', '!=', 2).first()

    // console.log(data.total)
    // return
    if (data.total > 0) {
      res.json({
        error: true,
        message: 'There are users already associated with this Role.'
      })

      return res.end()
    } else if ([1, 2].includes(id)) {
      res.json({
        error: true,
        message: 'Sorry you can not delete this role.'
      })

      return res.end()
    }
    const status = await model.deleteRole(id)

    if (status) {
      res.json({
        error: false,
        message: 'Role has been deleted'
      })
    }
  } catch (error) {
    res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const getRoleDetail = async (req, res) => {
  try {
    if (!req.validate('roles', 'read')) {
      return false
    }
    const { id } = req.body
    const data = await model.getRoleDetail({ id: id })
    if (data.length) {
      res.json({
        error: false,
        message: 'success. Role details receive',
        data: data
      })
    } else {
      res.json({
        error: false,
        message: 'sorry. no record found',
        data: []
      })
    }
  } catch (error) {
    res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

module.exports = {
  createRole,
  paginateRole,
  updateRole,
  deleteRole,
  getRoleDetail
}
