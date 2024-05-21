const Admin = require('../models/Admin.js')
const Role = require('../models/Roles.js')
const Sequelize = require('sequelize')

const updateRole = async (req, res) => {
  try {
    const { roleName, permissions, id } = req.body

    // Ensure permissions is a string
    const permissionsString = JSON.stringify(permissions)

    const role = await Role.findByPk(id)
    if (!role) {
      return res.status(404).json({ error: true, message: 'Role not found' })
    }

    role.name = roleName
    role.permissions = permissionsString // Assign the stringified permissions
    await role.save()

    await Admin.update({ permission_reset: '1' }, { where: { role_id: id } })

    return res.json({
      error: false,
      message: 'Role has been updated',
      data: role
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Something went wrong', data: error })
  }
}

const createRole = async (req, res) => {
  try {
    const { roleName, permissions } = req.body

    const permissionsString = JSON.stringify(permissions)

    const role = await Role.create({
      name: roleName,
      permissions: permissionsString
    })

    res.status(req.successStatus).json({
      error: false,
      message: 'Role has been created',
      data: role
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Something went wrong', data: error })
  }
}

const paginateRole = async (req, res) => {
  try {
    const roles = await Role.findAll()

    const cardData = roles.map(role => ({
      totalUsers: 6, // Assuming you'll get this value dynamically
      title: role.name,
      avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'],
      permissions: role.permissions,
      id: role.id
    }))

    return res.status(req.successStatus).json({
      error: false,
      message: 'Received successfully.',
      data: {
        cardData
      }
    })
  } catch (error) {
    console.error(error)
    res.status(req.successStatus).json({ error: true, message: 'Something went wrong', data: error })
  }
}

const deleteRole = async (req, res) => {
  try {
    const { id } = req.body

    const associatedAdmins = await Admin.count({ where: { role_id: id, status: { [Sequelize.Op.not]: 2 } } })

    console.log(id)

    if (associatedAdmins > 0) {
      return res.json({ error: true, message: 'There are users already associated with this Role.' })
    } else if ([1, 2].includes(id)) {
      return res.json({ error: true, message: 'Sorry, you cannot delete this role.' })
    }

    const deletedRows = await Role.destroy({ where: { id } })

    if (deletedRows > 0) {
      return res.json({ error: false, message: 'Role has been deleted' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Something went wrong', data: error })
  }
}

const getRoleDetail = async (req, res) => {
  try {
    const { id } = req.body

    const role = await Role.findByPk(id)
    if (role) {
      res.json({
        error: false,
        message: 'Success. Role details received',
        data: role
      })
    } else {
      res.json({
        error: false,
        message: 'Sorry, no record found',
        data: []
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Something went wrong', data: error })
  }
}

module.exports = {
  createRole,
  paginateRole,
  updateRole,
  deleteRole,
  getRoleDetail
}
