import { useLogin } from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { StyledLoginForm } from "../../styles/forms.styles";

const LoginForm = () => {
  const {login, error, isLoading} = useLogin();
  const navigate = useNavigate();
  const handleLogin = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");

    const respStatus = await login(email, password);

    if(respStatus == 200) {
      navigate('/');
    }
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
        <br /><br />

        {error && 
          <span className="formError">{error}</span>}

        <br /><br />
        <span>Need to create an account? <Link to='/signup'>Click here</Link></span>
        
        
      </StyledLoginForm>
      
    </>
  )
}
export default LoginForm