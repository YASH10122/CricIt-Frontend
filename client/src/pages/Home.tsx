
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/register")
  } 

  return (
  <div>
      <button onClick={handlelogin}>Login</button>
    <button onClick={handleRegister}>Register</button>  
  </div>
  )
}

export default Home