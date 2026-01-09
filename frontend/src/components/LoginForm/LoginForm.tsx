import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import { StyledLoginForm } from "../../styles/forms.styles";

const LoginForm = () => {
  const {login, error, isLoading} = useLogin();
  
  const handleLogin = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");

    await login(email, password);
  }


  return (
    <>
      <StyledLoginForm action={handleLogin}>
        <label>Email:&nbsp;
          <input type="email" name="email" />
        </label>
        <br />
        <label>Password:&nbsp;
          <input type="password" name="password" />
        </label>
        <br />
        <button disabled={isLoading} type="submit">
          Login
        </button>
        <br /><br /><br />
        <span>Need to create an account? <Link to='/signup'>Click here</Link></span>
      </StyledLoginForm>
      
      {error && <div className="error">{error}</div>}
    </>
  )
}
export default LoginForm