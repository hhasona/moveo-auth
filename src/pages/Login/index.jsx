import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import Button from "@mui/material/Button"

const Login = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //checking some validations.
  const validate = (email, password) => {
    if (!email || !password) {
      setError("Something went wrong,Please try again.")
      return true
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!password.match(regex)) {
      setError(
        "The password is less than 6 characters or dosent conatin letters and numbers."
      )
      return true
    }
    if (!email.includes("@")) {
      setError("Invalid Email,Please try again.")
      return true
    }
  }
  const signIn = () => {
    setLoading(true)
    if (validate(email, password)) {
      setLoading(false)
      return
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }
  return (
    <div className="container">
      <div className="back-img">
        <div className="layer"></div>
      </div>
      <h1>Login</h1>
      <div>
        <form className="form" action="">
          <label className="username">
            <input
              placeholder="Email"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              required
              type="email"
            />
          </label>

          <label className="password">
            <input
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              type="password"
              required
            />
          </label>
        </form>
        {/* showing the error */}
        <p>{error}</p>
        <Button
          onClick={signIn}
          variant="contained"
          endIcon={<AssignmentIndIcon />}
        >
          Sign In
        </Button>
      </div>
      {loading && <div className="loader"></div>}
    </div>
  )
}

export default Login
