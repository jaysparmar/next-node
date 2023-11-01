const md5 = require('md5')
const knex = require('../config/mysql_db.js')
const model = require('../model/admin.js')
const validation = require('../validation/admin.js')
const RoleModel = require('../model/role.js')

const createAdminUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      role: role,
      status: 1
    }

    const checkValidation = validation.createValidateUser(data)
    if (checkValidation.error) {
      const details = checkValidation.error.details

      const message = details.map(i => {
        const err_msg = i.message

        return err_msg.replace(/\"/g, '')
      })

      return res.json({
        error: true,
        message: message
      })
    }

    const checkEmail = await model.getUserDetail({ email })
    if (checkEmail.length) {
      return res.status(200).json({
        error: true,
        message: 'Email already exist...',
        data: []
      })
    }

    const id = await model.insertAdmin({ ...data, password: md5(password) })
    if (id) {
      return res.status(200).json({
        error: false,
        message: 'User has been created',
        data: id
      })
    }

    return res.json({
      error: true,
      message: 'User has been not created',
      data: id
    })
  } catch (e) {
    return res.json({ error: true, message: 'Something went wrong', data: e })
  }

  return res.end()
}

const paginateAdmin = async (req, res) => {
  try {
    let { offset = 0, limit = 10, order = 'asc', sort = 'id', search, status } = req.body

    let searchFrom = ['firstname', 'lastname', 'email']
    const total = await model.paginateAdminTotal(searchFrom, search, status)
    const roles = await knex('admin_roles').select('role_name as label', 'id as value')

    const rows = await model.paginateAdmin(limit, offset, searchFrom, status, sort, search, order)

    // rows = rows.map(row => {
    //     row.image = constants.getStaticUrl(row.image)
    //     return row
    // })
    let data_rows = []
    if (order === 'asc') {
      let sr = total.total - limit * offset
      await rows.forEach(row => {
        row.sr = sr
        data_rows.push(row)
        sr--
      })
    } else {
      let sr = offset + 1
      await rows.forEach(row => {
        row.sr = sr
        data_rows.push(row)
        sr++
      })
    }
    res.status(200).json({
      error: false,
      message: 'Admin received successfully.',
      data: {
        rows: data_rows,
        total,
        roles
      }
    })
    res.end()
  } catch (e) {
    console.log(e)
    res.json({ error: true, message: 'Something went wrong', data: e })
  }
  res.end()
}

const updateAdmin = async (req, res) => {
  try {
    const { id, firstname, lastname, email, role, password, status } = req.body

    const data = {
      id,
      firstname,
      lastname,
      password,
      email,
      role,
      status
    }
    const checkValidation = validation.validateUpdateUser(data)
    if (checkValidation.error) {
      const details = checkValidation.error.details

      const message = details.map(i => {
        const err_msg = i.message

        return err_msg.replace(/\"/g, '')
      })

      return res.json({
        error: true,
        message: message
      })
    }

    const checkEmail = await model.checkEmail({ email }, { id })
    if (checkEmail.length) {
      return res.status(200).json({
        error: true,
        message: 'Email already exist...',
        data: []
      })
    }

    const updateData = {
      firstname,
      lastname,
      email,
      role,
      status
    }
    if (password) updateData.password = md5(password)

    const update = await model.updateAdmin({ id }, updateData)
    if (update) {
      return res.json({
        error: false,
        message: 'User has been updated'
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.body
    const status = await model.deleteAdmin({ id })

    if (status) {
      res.json({
        error: false,
        message: 'User has been deleted'
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

const rolesListing = async (req, res) => {
  const { limit, offset, search, order, sort, status } = req.body
  const rows = await RoleModel.paginatRole(limit, offset, ['role_name'], status, sort, search, order)
  const total = await RoleModel.paginatRoleTotal(['role_name'], search, status)

  let data_rows = []
  if (order === 'asc') {
    let sr = total.total - limit * offset
    await rows.forEach(row => {
      row.sr = sr
      data_rows.push(row)
      sr--
    })
  } else {
    let sr = offset + 1
    await rows.forEach(row => {
      row.sr = sr
      data_rows.push(row)
      sr++
    })
  }

  res.json({
    error: false,
    message: 'Data received successfully',
    data: {
      rows: data_rows,
      total: total.total
    }
  })
}

const modulesListing = async (req, res) => {
  // try {
  if (!req.validate('admin', 'read')) {
    return false
  }
  const { role_id = -1 } = req.body

  let data = await knex('admin_roles as ar')
    .leftJoin('admin_roles_permissions as rp', 'ar.id', 'rp.role_id')
    .leftJoin('modules as m', 'm.id', 'rp.module_id')
    .where('ar.id', '=', role_id)
    .select(
      'm.module_key',
      'rp.createP as create',
      'rp.updateP as update',
      'rp.deleteP as delete',
      'rp.readP as read',
      'ar.role_name'
    )
  let role_name = ''
  if (data.length && data.length != 0) {
    role_name = data[0].role_name
  }

  let permissions = data.map(val => {
    delete val.role_name
    Object.keys(val).map(data => {
      if (data != 'module_key') {
        if (val[data] == '1') {
          val[data] = true
        } else {
          val[data] = false
        }
      }
    })

    return val
  })
  const modules = await knex('modules')
  res.json({
    error: false,
    message: 'Modules recieved successfully',
    data: {
      modules,
      permissions,
      role_name
    }
  })

  return res.end()

  // } catch (err) {
  //     res.json({
  //         error: false,
  //         message: "Something went Wrong",
  //         data: {
  //             err
  //         }
  //     })
  //     return res.end()
  // }
}

module.exports = {
  createAdminUser,
  paginateAdmin,
  updateAdmin,
  deleteAdmin,
  rolesListing,
  modulesListing
}
