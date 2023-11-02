const knex = require('../config/mysql_db.js')

const updateRole = async (req, res) => {
  try {
    // if (!req.validate('roles', 'update')) {
    //   return false
    // }
    const { roleName, permissions, id } = req.body

    const data = {
      name: roleName,
      permissions: JSON.stringify(permissions)
    }
    const update = await knex('roles').update(data).where({ id })
    if (update) {
      res.json({
        error: false,
        message: 'Role has been updated',
        data: update
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const createRole = async (req, res) => {
  // try {
  // if (!req.validate('roles', 'create')) {
  //   return false
  // }
  const { roleName, permissions } = req.body

  const data = {
    name: roleName,
    permissions: JSON.stringify(permissions)
  }
  const id = await knex('roles').insert(data)
  if (id) {
    res.status(200).json({
      error: false,
      message: 'Role has been created',
      data: id
    })
  }

  // } catch (e) {
  //   console.log(e)
  //   res.json({ error: true, message: 'Something went wrong', data: e })
  // }
  res.end()
}

const paginateRole = async (req, res) => {
  try {
    const data = await knex('roles')

    const cardData = data.map(val => {
      val.totalUsers = 6
      val.title = val.name
      val.avatars = ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png']

      return val
    })

    return res
      .json({
        error: false,
        message: 'Received successfully.',
        data: {
          cardData
        }
      })
      .end()
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
