const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboard'
    },
    {
      title: 'admin',
      icon: 'mdi:users',
      path: '/admins'
    },
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'Roles & Permissions',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    }
  ]
}

export default navigation
