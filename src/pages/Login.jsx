import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!email || !password) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)

      // Simulate redirect after success
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    }, 1500)
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="login-container">
      <div className="background-effects">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      <div className="login-card">
        {!showSuccess ? (
          <>
            <div className="login-header">
              <div className="logo-icon">⚡</div>
              <h2>Sign In</h2>
              <p>Access your account</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <label htmlFor="email">Email</label>
                  <span className="input-line"></span>
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <span className={`toggle-icon ${showPassword ? 'show-password' : ''}`}></span>
                  </button>
                  <span className="input-line"></span>
                </div>
              </div>

              <div className="form-options">
                <div className="remember-wrapper">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                </div>
              </div>

              <button type="submit" className={`login-btn btn ${isLoading ? 'loading' : ''}`}>
                <span className="btn-text">Sign In</span>
                <span className="btn-loader"></span>
                <span className="btn-glow"></span>
              </button>
            </form>
          </>
        ) : (
          <div className="success-message show">
            <div className="success-icon">✓</div>
            <h3>Welcome back!</h3>
            <p>Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
