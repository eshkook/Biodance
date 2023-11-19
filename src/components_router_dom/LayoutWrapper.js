import { Outlet } from "react-router-dom"
import BottomLayout from './BottomLayout'
import TopLayout from './TopLayout'

export default function LayoutWrapper() {
    return (
        <>
            <TopLayout />
            <Outlet />  {/* This line is important for rendering nested routes */}
            <BottomLayout />
        </>
    )
}
