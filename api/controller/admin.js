const md5 = require('md5')
const model = require('../model/admin_sequelize.js')
const validation = require('../validation/admin.js')
const Admin = require('../models/Admin.js')
const Role = require('../models/Roles.js')

// Function to create a new admin user
const createAdminUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role_id, role } = req.body

    const data = {
      firstname,
      lastname,
      email,
      password,
      role_id,
      status: 1 // Assuming new admin is active by default
    }

    const checkValidation = validation.createValidateUser(data)

    if (checkValidation.error) {
      const details = checkValidation.error.details
      const message = details.map(i => i.message.replace(/\"/g, ''))

      return res.json({
        error: true,
        message
      })
    }

    const checkEmail = await model.getUserDetail({ email })

    if (checkEmail) {
      return res.status(req.successStatus).json({
        error: true,
        message: 'Email already exists...',
        data: []
      })
    }

    const newAdmin = await Admin.create({ ...data, password: md5(password) })

    return res.status(req.successStatus).json({
      error: false,
      message: 'User has been created',
      data: newAdmin.id
    })
  } catch (e) {
    console.log(e)

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

    let dataRows = []
    if (order === 'asc') {
      let sr = total - limit * offset
      rows.forEach(row => {
        row.sr = sr
        dataRows.push(row)
        sr--
      })
    } else {
      let sr = offset + 1
      rows.forEach(row => {
        row.sr = sr
        dataRows.push(row)
        sr++
      })
    }
    res.status(req.successStatus).json({
      error: false,
      message: 'Admin received successfully.',
      data: {
        rows: dataRows,
        total
      }
    })
  } catch (error) {
    console.error(error)
    res.status(req.successStatus).json({ error: true, message: 'Something went wrong', data: error })
  }
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
    } else {
      return res.json({
        error: true,
        message: 'User is Already Update'
      })
    }
  } catch (error) {
    console.log(error)

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

    // Use Sequelize's destroy method to delete the admin
    const rowsDeleted = await Admin.destroy({ where: { id } })

    if (rowsDeleted > 0) {
      // If at least one row was deleted, respond with success message
      return res.json({
        error: false,
        message: 'User has been deleted'
      })
    } else {
      // If no rows were deleted (admin with given id not found), respond with appropriate message
      return res.json({
        error: true,
        message: 'User not found'
      })
    }
  } catch (error) {
    // If any error occurs during the deletion process, respond with error message
    return res.json({
      error: true,
      message: 'Something went wrong',
      data: error
    })
  }
}

const modulesListing = async (req, res) => {
  const modules = require('../config/modules.js')

  return res.json(modules)
}

const getPermissions = async (req, res) => {
  try {
    // Fetch the role associated with the logged-in user's role_id
    const roles = await Role.findAll({ where: { id: req.login_user.role_id } })

    // Update the admin's permission_reset field to '0'
    await Admin.update({ permission_reset: '0' }, { where: { id: req.login_user.id } })

    // If no roles found, respond with an empty array
    if (roles.length === 0) {
      return res.json([])
    }

    // Respond with the parsed permissions of the first role found
    res.json(JSON.parse(roles[0].permissions)).end()
  } catch (error) {
    // Handle any errors that occur during the process
    console.log(error)
    res.status(500).json({ error: true, message: 'Something went wrong', data: error })
  }
}

module.exports = {
  createAdminUser,
  paginateAdmin,
  updateAdmin,
  deleteAdmin,
  modulesListing,

  getPermissions
}
