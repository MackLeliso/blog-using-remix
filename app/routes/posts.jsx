import { Outlet } from "@remix-run/react"

function posts() {
  return (
    <div>
      <Outlet />
      </div>
  )
}

export default posts