const constants = require('../helpers/constants.js')
const knex = require('../config/mysql_db.js')

const wpNumber = constants.whatsappFrom

module.exports = () => {
  const tableName = 'orders',
    selectableProps = [],
    timeout = 1000
  const query = knex.from(tableName)

  const create = props => {
    delete props.id

    return knex.insert(props).returning(selectableProps).into(tableName).timeout(timeout)
  }

  const findAll = () => {
    return knex.select(selectableProps).from(tableName).timeout(timeout)
  }

  const find = filters => {
    return knex.select(selectableProps).from(tableName).where(filters).timeout(timeout)
  }

  const update = (id, props) => {
    delete props.id

    return knex
      .update(props)
      .from(tableName)
      .where({
        id
      })
      .returning(selectableProps)
      .timeout(timeout)
  }

  const destroy = id => {
    return knex
      .del()
      .from(tableName)
      .where({
        id
      })
      .timeout(timeout)
  }

  const addInitialOrder = async (asset_url, number) => {
    const status = await knex('orders').insert({ asset_url, number })
    if (status) {
      return {
        error: false,
        message: 'Request submitted Successfully.',
        data: {
          status
        }
      }
    }
  }

  return {
    query,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    update,
    destroy,
    addInitialOrder
  }
}
