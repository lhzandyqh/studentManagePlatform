import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import treeTableRouter from './modules/tree-table'
// import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        // component: () => import('@/views/dashboard/index'),
        component: () => import('@/myViews/homePage/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  {
    path: '/diagnosticplatformManagement',
    component: Layout,
    redirect: '/diagnosticplatformManagement/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '诊改平台管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'diagnosticnewsManagement',
        component: () => import('@/myViews/diagnosticplatformManagement/diagnosticnewsManagement'),
        name: 'diagnosticnewsManagement',
        meta: {
          title: '通知公告管理',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'platformusermanagement',
        component: () => import('@/myViews/diagnosticplatformManagement/platformUserManagement'),
        name: 'platformusermanagement',
        meta: {
          title: '平台用户管理',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
        // children: [
        //   {
        //     path: 'aaa', // A 组件
        //     component: resolve => require(['@/myViews/diagnosticplatformManagement/componentViews/aaa.vue'], resolve)
        //   }
        // ]
      },
      {
        path: 'draftbox',
        component: () => import('@/myViews/diagnosticplatformManagement/componentViews/draftBoxIndex.vue'),
        name: 'draftbox',
        meta: {
          title: '通知草稿箱'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/disciplineManagement',
    component: Layout,
    redirect: '/disciplineManagement/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '违纪处分管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // {
      //   path: 'disciplineMonitor',
      //   component: () => import('@/myViews/disciplineManagement/disciplineMonitor'),
      //   name: 'disciplineMonitor',
      //   meta: {
      //     title: '违纪监控',
      //     roles: ['admin', 'editor'] // or you can only set roles in sub nav
      //   }
      // },
      {
        path: 'disciplineExecute',
        component: () => import('@/myViews/disciplineManagement/disciplineExecute'),
        name: 'disciplineExecute',
        meta: {
          title: '违纪处分执行',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/pleasecancelManaagement',
    component: Layout,
    redirect: '/pleasecancelManaagement/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '请销假管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // {
      //   path: 'monitor',
      //   component: () => import('@/myViews/pleasecancelManaagement/monitor'),
      //   name: 'monitor',
      //   meta: {
      //     title: '请销假监控',
      //     roles: ['admin', 'editor'] // or you can only set roles in sub nav
      //   }
      // },
      {
        path: 'check',
        component: () => import('@/myViews/pleasecancelManaagement/check'),
        name: 'check',
        meta: {
          title: '请销假审核',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'history',
        component: () => import('@/myViews/pleasecancelManaagement/history'),
        name: 'history',
        meta: {
          title: '请销假历史',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/campusLifeManagement',
    component: Layout,
    redirect: '/campusLifeManagement/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '校园生活管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'activityReleased',
        component: () => import('@/myViews/campusLifeManagement/activityReleased'),
        name: 'assessmentreleased',
        meta: {
          title: '活动发布',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'activityDraft',
        component: () => import('@/myViews/campusLifeManagement/activityDraftBox'),
        name: 'activitydraft',
        meta: {
          title: '活动草稿箱',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        hidden: true
      }
    ]
  },
  {
    path: '/secondClassroomManagement',
    component: Layout,
    redirect: '/secondClassroomManagement/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '第二课堂管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'assessmentreleased',
        component: () => import('@/myViews/secondClassroomManagement/assessmentreleased'),
        name: 'assessmentreleased',
        meta: {
          title: '测评发布',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'evaluationresultsMonitoring',
        component: () => import('@/myViews/secondClassroomManagement/evaluationresultsMonitoring'),
        name: 'evaluationresultsMonitoring',
        meta: {
          title: '测评结果监控',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/campusgrantManagement',
    component: Layout,
    redirect: '/campusgrantManagement/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '校园奖助管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'scholarshipManagement',
        component: () => import('@/myViews/campusgrantManagement/scholarshipManagement'),
        name: 'scholarshipManagement',
        meta: {
          title: '奖学金管理',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'fellowshipManagement',
        component: () => import('@/myViews/campusgrantManagement/fellowshipManagement'),
        name: 'fellowshipManagement',
        meta: {
          title: '助学金管理',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: '两层导航测试',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'oneindex',
  //       component: () => import('@/myViews/test/oneIndex'),
  //       name: 'oneindex',
  //       meta: {
  //         title: '页面1',
  //         roles: ['admin', 'editor'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'twoindex',
  //       component: () => import('@/myViews/test/twoIndex'),
  //       name: 'twoindex',
  //       meta: {
  //         title: '页面2',
  //         roles: ['admin', 'editor'] // or you can only set roles in sub nav
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'rolePermission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // treeTableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/mergeHeader'),
  //       name: 'MergeHeader',
  //       meta: { title: 'mergeHeader' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'pdf', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
