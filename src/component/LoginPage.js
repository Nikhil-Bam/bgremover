
import "./loginapge.css";
export default function Login() {
  return (
    <div className="login-container">
      <div className="login-tabs">
        <button className="tab active">Log in</button>
        <button className="tab">Sign up</button>
      </div>

      <div className="social-buttons">
        <button className="social-btn fb-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="FB" />
          Continue with Facebook
        </button>
        <button className="social-btn google-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" />
          Continue with Google
        </button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <div className="remember">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="login-btn">Log in</button>
      </form>
    </div>
  );
}
