const md5 = require('md5')
const knex = require('../config/mysql_db.js')
const model = require('../model/admin.js')
const validation = require('../validation/admin.js')

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
}

const paginateAdmin = async (req, res) => {
  try {
    if (!req.validate('admin-read')) {
      return false
    }
    let { offset = 0, limit = 10, order = 'asc', sort = 'id', search, status } = req.body

    let searchFrom = ['firstname', 'lastname', 'email']
    const total = await model.paginateAdminTotal(searchFrom, search, status)

    const rows = await model.paginateAdmin(limit, offset, searchFrom, status, sort, search, order)

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
    res.status(req.successStatus).json({
      error: false,
      message: 'Admin received successfully.',
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
      message: 'something went wrong',
      data: error
    })
  }

  return res.end()
}

const modulesListing = async (req, res) => {
  const modules = require('../config/modules.js')

  return res.json(modules)
}

const getPermissions = async (req, res) => {
  const roles = await knex('roles').where({ id: req.login_user.role_id })
  await knex('admins').where({ id: req.login_user.id }).update({ permission_reset: '0' })
  if (roles.length === 0) {
    return res.json([])
  }

  res.json(JSON.parse(roles[0].permissions)).end()
}

module.exports = {
  createAdminUser,
  paginateAdmin,
  updateAdmin,
  deleteAdmin,
  modulesListing,
  getPermissions
}
