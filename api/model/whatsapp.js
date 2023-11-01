const constants = require('../helpers/constants.js')
const knex = require('../config/mysql_db.js')

const wpNumber = constants.whatsappFrom
const tableName = ''

module.exports = () => {
  const tableName = 'messages',
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

  const addOutgoingMessage = (wp_id, wp_to, type, message = '', file_path = null, reply_id = null, caption = null) => {
    return knex.from(tableName).insert({
      wp_id,
      wp_to,
      type,
      message,
      file_path,
      reply_id,
      caption,
      wp_from: wpNumber
    })
  }

  const addIncommingMessage = (
    wp_id,
    wp_from,
    type,
    message = '',
    file_path = null,
    reply_id = null,
    caption = null
  ) => {
    return knex.from(tableName).insert({
      wp_id,
      wp_to: wpNumber,
      type,
      message,
      file_path,
      reply_id,
      caption,
      wp_from
    })
  }

  const updateStatus = (messageId, deliveredAt = null, readAt = null) => {
    console.log(messageId)

    return knex.from(tableName).update({ delivered_at: deliveredAt, read_at: readAt }).where({ wp_id: messageId })
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
    addOutgoingMessage,
    addIncommingMessage,
    updateStatus
  }
}
