import Error401 from 'src/pages/401'
import { store } from 'src/store'

const allPermissions = ['admin-read', 'admin-update', 'admin-delete', 'admin-create']

const getPermissions = () => {
  const state = store.getState()

  return state.permissions.userPermissions

  // return allPermissions
  // const data = localStorage.getItem('userData')
  // if (data) {
  //   return JSON.parse(data).permissions
  // }

  // return []
}

const validateView = (View, module, permission = null) => {
  if (permission == null) {
    if (
      getPermissions().includes(module + '-read') ||
      getPermissions().includes(module + '-write') ||
      getPermissions().includes(module + '-update') ||
      getPermissions().includes(module + '-delete')
    ) {
      return View
    }

    return Error401
  }
  if (getPermissions().includes(module + '-' + permission)) {
    return View
  }

  return Error401
}

const checkPermission = (module, permission = null) => {
  if (permission == null) {
    if (
      getPermissions().includes(module + '-read') ||
      getPermissions().includes(module + '-write') ||
      getPermissions().includes(module + '-update') ||
      getPermissions().includes(module + '-delete')
    ) {
      return true
    }

    return false
  }
  if (getPermissions().includes(module + '-' + permission)) {
    return true
  }

  return false
}

const hasPermission = (module, permission) => {
  const permissions = getPermissions()

  return permissions.includes(module + '-' + permission)
}

export default {
  validateView,
  checkPermission,
  hasPermission
}