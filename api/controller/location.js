const model = require('../model/location.js')
const validation = require('../validation/location.js')
const functions = require('../helpers/functions.js')
const constants = require('../helpers/constants.js')

const createLocation = async (req, res) => {
  try {
    const { name } = req.body
    const files = req.files

    // validations
    const data = {
      name,
      status: '1'
    }
    const checkValidation = validation.createValidate(data)
    if (checkValidation.error) {
      const errorDetails = checkValidation.error.details

      const message = errorDetails.map(i => {
        const err_msg = i.message

        return err_msg.replace(/\"/g, '')
      })

      return res.json({
        error: true,
        message: message
      })
    }

    // file validation
    if (files) {
      const imageValidate = {
        fieldname: files.image.name,
        originalname: files.image.name,
        encoding: files.image.encoding,
        mimetype: files.image.mimetype,
        size: files.image.size
      }
      const checkImageValidation = validation.imageValidate(imageValidate)
      if (checkImageValidation.error) {
        const errorDetails = checkImageValidation.error.details

        const message = errorDetails.map(i => {
          const err_msg = i.message

          return err_msg.replace(/\"/g, '')
        })

        return res.json({
          error: true,
          message: message
        })
      }
    }

    // file upload
    data.image = null
    if (files) {
      const filePath = `${constants.indexPath}/uploads/`
      const imageFile = files.image

      const uploadStatus = await functions.uploadFile(filePath, imageFile)
      data.image = uploadStatus.data
    }

    const id = await model.insertLocation(data)
    if (id) {
      return res.json({
        error: false,
        message: 'Location has been created',
        data: id
      })
    }

    return res.json({
      error: true,
      message: 'Sorry location is not added',
      data: error
    })
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const paginateLocation = async (req, res) => {
  try {
    let { offset = 0, limit = 10, order = 'asc', sort = 'id', search, status } = req.body

    // filter
    let searchFrom = ['name']

    // total
    const total = (await model.paginateLocationTotal(searchFrom, search, status)).total

    // rows and file url
    let rows = await model.paginateLocation(limit, offset, searchFrom, status, sort, search, order)
    rows = rows.map(row => {
      if (row.image) row.image_url = functions.getStaticUrl(row.image)

      return row
    })

    // sorting
    const data_rows = []
    if (order === 'asc') {
      let sr = offset + 1
      rows.forEach(row => {
        row.sr = sr
        data_rows.push(row)
        sr++
      })
    } else {
      let sr = total - limit * offset
      rows.forEach(row => {
        row.sr = sr
        data_rows.push(row)
        sr--
      })
    }

    return res.status(200).json({
      error: false,
      message: 'Location received successfully.',
      data: {
        rows: data_rows,
        total
      }
    })
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const updateLocation = async (req, res) => {
  try {
    const { id, name, image, isImageReset } = req.body
    const files = req.files

    // validation
    const data = {
      id,
      name,
      image
    }
    const checkValidation = validation.updateValidate(data)
    if (checkValidation.error) {
      const errorDetails = checkValidation.error.details

      const message = errorDetails.map(i => {
        const err_msg = i.message

        return err_msg.replace(/\"/g, '')
      })

      return res.json({
        error: true,
        message: message
      })
    }

    // file validation
    if (files) {
      const imageValidate = {
        fieldname: files.image.name,
        originalname: files.image.name,
        encoding: files.image.encoding,
        mimetype: files.image.mimetype,
        size: files.image.size
      }
      const checkImageValidation = validation.imageValidate(imageValidate)
      if (checkImageValidation.error) {
        const errorDetails = checkImageValidation.error.details

        const message = errorDetails.map(i => {
          const err_msg = i.message

          return err_msg.replace(/\"/g, '')
        })

        return res.json({
          error: true,
          message: message
        })
      }
    }

    // file upload/remove
    const filePath = `${constants.indexPath}/uploads/`
    const oldImage = data.image
    if (files) {
      const imageFile = files.image

      const uploadStatus = await functions.uploadFile(filePath, imageFile)
      data.image = uploadStatus.data

      if (!uploadStatus.error) await functions.removeFile(filePath, oldImage)
    } else if (isImageReset) {
      await functions.removeFile(filePath, oldImage)
      data.image = null
    }

    // update
    const update = await model.updateLocation(id, data)
    if (update) {
      return res.json({
        error: false,
        message: 'Location has been updated'
      })
    }

    return res.json({
      error: true,
      message: 'Location is not found'
    })
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const getDetail = async (req, res) => {
  try {
    const { id } = req.body

    // validation
    const data = {
      id
    }
    const checkValidation = validation.idValidate(data)
    if (checkValidation.error) {
      const errorDetails = checkValidation.error.details

      const message = errorDetails.map(i => {
        const err_msg = i.message

        return err_msg.replace(/\"/g, '')
      })

      return res.json({
        error: true,
        message: message
      })
    }

    const detail = await model.getDetail(data)

    if (detail.length) {
      return res.json({
        error: false,
        message: 'success. Location details receive',
        data: detail
      })
    }

    return res.json({
      error: false,
      message: 'sorry. no record found',
      data: []
    })
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.body

    const data = {
      id
    }
    const checkValidation = validation.idValidate(data)
    if (checkValidation.error) {
      const errorDetails = checkValidation.error.details

      const message = errorDetails.map(i => {
        const err_msg = i.message

        return err_msg.replace(/\"/g, '')
      })

      return res.json({
        error: true,
        message: message
      })
    }

    const status = await model.deleteLocation(data)

    if (status) {
      return res.json({
        error: false,
        message: 'Location has been deleted'
      })
    }

    return res.json({
      error: true,
      message: 'Location id is not found'
    })
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const getDetailsByStatus = async (req, res) => {
  try {
    const { status = 1 } = req.body

    let data = await model.getDetail({ status })
    if (data.length) {
      data = data.map(row => {
        row.image ? (row.image_url = functions.getStaticUrl(row.image)) : delete row.image

        return row
      })

      return res.json({
        error: false,
        message: 'success. Location details receive',
        data: data
      })
    }

    return res.json({
      error: false,
      message: 'sorry. no record found',
      data: []
    })
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

module.exports = {
  createLocation,
  paginateLocation,
  updateLocation,
  deleteLocation,
  getDetail,
  getDetailsByStatus
}
