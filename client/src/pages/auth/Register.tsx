import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URL;



const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    phone : "",
    password : ""
  })


const navigate = useNavigate();



  const handleRegister = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${URL}/api/users/register`, {
        method : "POST",
        body : JSON.stringify(formData),
        headers : {"Content-Type" : "application/json" }
      })
      const data = await response.json()
      if (response.ok) {
        alert("Registration successful!");
        setFormData({ username: "", email: "", age: "", phone: "", password: "" })
        navigate('/login');
      } else {
        alert(data.msg || "Registration failed")
      }
    } catch (error) {
      alert("Error: " + error)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.username} onChange={(e) => setFormData({...formData, username : e.target.value})}/>

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email : e.target.value})} />

        <label>Mobile:</label>
        <input type="tel" name="mobile"  value={formData.phone} onChange={(e) => setFormData({...formData, phone : e.target.value})}/>

        <label>age:</label>
        <input type="number" name="age"  value={formData.age} onChange={(e) => setFormData({...formData, age : e.target.value})}/>

        <label>Password:</label>
        <input type="password" name="password"  value={formData.password} onChange={(e) => setFormData({...formData, password : e.target.value})}/>

        <button type="submit">Register</button>
      </form>

 
    </div>
  )
}

export default Register;