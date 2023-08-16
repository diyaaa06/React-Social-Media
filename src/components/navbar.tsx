import {Link} from "react-router-dom"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
export const Navbar=()=>{
  const [user,loading]=useAuthState(auth);
  const signUserOut=async()=>{
    await signOut(auth);
  }
  return (
  <div>
    <div className="navbar">
      <div className="navbarcontains">
      <Link to="/" className="Link">Home</Link>
      {!user && <Link to="/login" className="Link">Login</Link>}
      {user &&
      <>
      <Link to="/createpost" className="Link">Create Post</Link>
      <text className="Link">{user?.displayName}</text>
      <img src={user?.photoURL || ""}className="Userphoto"></img>
      <button onClick={signUserOut} style={{borderRadius:"50px" ,backgroundColor:"azure", }}>Log Out</button>
      </>
      }
      </div>
    </div>
    <div>
    </div>
  </div>
  )
}