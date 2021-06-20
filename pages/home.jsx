import loadable from '@loadable/component'

const Sidebar = loadable(()=>import("../components/Sidebar-Component"))

export default function Index(){
  return(
    <Sidebar title="Dashboard - Kotakjualan" description="Dashboard - Kotakjualan.com">
      Hello
    </Sidebar>
  )
}