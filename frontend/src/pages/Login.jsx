import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const login = () => navigate("/dashboard");

  return (
    <div className="card">
      <h2>Login</h2>
      <input placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
  );
}
