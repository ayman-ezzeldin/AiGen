import { useDispatch } from "react-redux"
import { logoutUser } from "../../store/auth-slice"
const UserHome = () => {

  const dispatch = useDispatch()
    
  return (
    <div>
      <h1>User Home</h1>
      <button onClick={()=> dispatch(logoutUser()) } >Log out</button>
    </div>
  )
}

export default UserHome