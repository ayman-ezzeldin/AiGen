import { useDispatch } from "react-redux"
import { logoutUser } from "../../store/auth-slice"
const AdminHome = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Admin Home</h1>
      <button onClick={()=> dispatch(logoutUser()) } >Log out</button>
    </div>
  )
}

export default AdminHome