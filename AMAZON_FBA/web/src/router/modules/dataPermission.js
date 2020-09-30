import Layout from '@/layout'



const dataPermission = {
  path: '/dataPermission',
  component: Layout,
  redirect: '/dataPermission/shopPermissionSetting',
  alwaysShow: true,
  meta: {
    title: '数据权限',
    icon: 'tree-table',
  },
  children: [
  //   {
  //   path: 'shopPermissionRole',
  //   component: () => import("@/views/dataPermission/shopPermissionRole"),
  //   name: 'shopPermissionRole',
  //   meta: { title: '店铺权限角色', noCache: true }
  // },
  {
    path: 'shopPermissionSetting',
    component: () => import("@/views/dataPermission/shopPermissionSetting"),
    name: "shopPermissionRole",
    meta: { title: '店铺权限配置', noCache: true }
  }]
}
export default dataPermission