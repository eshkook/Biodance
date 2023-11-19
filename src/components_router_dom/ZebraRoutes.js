import { Route, Routes } from "react-router-dom"
import Zebra from "./Zebra.js"

export default function ZebraRoutes() {
  return (
    <Routes>
      <Route index element={<Zebra />} />
    </Routes>
  )
}