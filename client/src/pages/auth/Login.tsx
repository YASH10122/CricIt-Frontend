import { useState } from 'react';
const URL = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })

   const navigate = useNavigate()

  const handleLogin = async(e:React.FormEvent) => {
    e.preventDefault()

    try{
      const response = await fetch(`${URL}/api/users/login`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(formData)
      })

      const data = await response.json()
      
      if(response.ok){
        localStorage.setItem('token', data.token)
        alert("Login successful!")
        setFormData({ email: "", password: "" })
       navigate("/team")
      } else {
        alert(data.msg ||"Login failed")
      }
     
    } catch (error) {
      console.error('Login error:', error)
      alert("Error: " + error)
    }
  }

  return (
    <div>
        <h2>Login</h2>
    
  <form onSubmit={handleLogin}>

    <label>Email:</label>
    <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email : e.target.value})} />

    <label>Password:</label>
    <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password : e.target.value})} />

    <button type="submit">Login</button>

  </form>
    </div>
  )
}

export default Login