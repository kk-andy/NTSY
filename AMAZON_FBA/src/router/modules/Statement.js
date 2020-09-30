import Layout from '@/layout'



const Statement = {
  path: '/Statement',
  component: Layout,
  redirect: '/Statement/signDiffStatement',
  alwaysShow: true,
  meta: {
    title: '报表',
    icon: 'tree-table',
  },
  children: [

    {
      path: 'signDiffStatement',
      component: () => import("@/views/Statement/signDiffStatement"),
      name: "signDiffStatement",
      meta: { title: '签收差异报表', noCache: true }
    },
    {
      path: 'checkSave',
      component: () => import("@/views/Statement/checkSave"),
      name: "checkSave",
      meta: { title: '盘存', noCache: true }
    }
  ]
}
export default Statement