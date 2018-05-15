export default {
    items: [
        {
            title: true,
            name: '功能',
            wrapper: {
                element: '',
                attributes: {}
            },
        },
        {
            divider: true
        },
        {
            name: '术语管理',
            url: '/concept',
            icon: 'icon-drop',
        },
        {
            divider: true
        },
        {
            name: '系统管理',
            icon: 'icon-puzzle',
            children: [
                {
                    name: '领域专家管理',
                    url: '/domainExpert',
                    icon: 'icon-pencil'
                }
            ]
        },
        {
            divider: true
        },

        {
            name: '模式管理',
            url: '/scheme',
            icon: 'icon-pie-chart'
        },
        {
            divider: true
        },
        {
            name: '实体管理',
            url: '/entity',
            icon: 'icon-star'
        },
        {
            divider: true
        },
        {
            name: '事件管理',
            url: '/events',
            icon: 'icon-star'
        },
        {
            divider: true
        },

        {
            name: '权限管理',
            icon: 'icon-puzzle',
            children: [
                {
                    name: '用户列表',
                    url: '/authorityManagement',
                    icon: 'icon-pencil'
                },
                {
                    name: '搜索用户',
                    url: '/searchUsers',
                    icon: 'icon-pencil'
                }
            ]
        },
        {
            divider: true
        },

        /*
      {
        name: 'Pages',
        url: '/pages',
        icon: 'icon-star',
        children: [
          {
            name: 'Login',
            url: '/login',
            icon: 'icon-star'
          },
          {
            name: 'Register',
            url: '/register',
            icon: 'icon-star'
          },
          {
            name: 'Error 404',
            url: '/404',
            icon: 'icon-star'
          },
          {
            name: 'Error 500',
            url: '/500',
            icon: 'icon-star'
          }
        ]
      } */
    ]
};
