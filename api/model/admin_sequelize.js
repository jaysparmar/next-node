const User = require('../models/Admin') // Import your Sequelize model
const { Op } = require('sequelize')

// Define the getUserDetail function
const getUserDetail = async where => {
  try {
    const user = await User.findOne({ where: { email: where.email } })

    return user // Return the user object if found, or null if not found
  } catch (error) {
    throw error // Throw any errors encountered during the query
  }
}

const paginateAdminTotal = async (searchFrom, search, status) => {
  try {
    const whereClause = {}
    if (status) {
      whereClause.status = status
    }
    if (search) {
      whereClause[Op.or] = searchFrom.map(field => ({ [field]: { [Op.like]: `%${search}%` } }))
    }
    const total = await User.count({ where: whereClause })

    return total
  } catch (error) {
    throw error
  }
}

const paginateAdmin = async (limit, offset, searchFrom, status, sort, search, order) => {
  try {
    const whereClause = {}
    if (status) {
      whereClause.status = status
    }
    if (search) {
      whereClause[Op.or] = searchFrom.map(field => ({ [field]: { [Op.iLike]: `%${search}%` } }))
    }
    const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC'

    return await User.findAll({
      where: whereClause,
      order: [[sort, sortOrder]],
      limit,
      offset
    })
  } catch (error) {
    throw error
  }
}

const checkEmail = async ({ email, id }) => {
  try {
    const whereCondition = {
      email,
      id: { [Op.ne]: id } // Exclude the current user's ID from the search
    }

    console.log(whereCondition.email)

    const result = await User.findOne({
      where: whereCondition
    })

    return result ? true : false // Return true if email already exists, false otherwise
  } catch (error) {
    throw error
  }
}

const updateAdmin = async (id, updateData) => {
  try {
    console.log(updateData)

    const result = await User.update(
      { firstname: updateData?.firstname },
      {
        where: {
          id: id.id
        }
      }
    )

    console.log(result)

    return result[0] === 1 // Returns true if one row was affected (updated), false otherwise
  } catch (error) {
    throw error
  }
}

module.exports = {
  getUserDetail,
  paginateAdmin,
  paginateAdminTotal,
  updateAdmin,
  checkEmail
}
