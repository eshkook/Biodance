import { Outlet } from "react-router-dom"

export default function OverAllLayouts() {
    return (
        <>
          <h1>All Pages</h1>
          <Outlet />  
        </>
    )
}
