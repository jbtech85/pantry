import { Link } from "react-router-dom";
import { StyledLoginForm } from "../../styles/forms.styles";

const LoginForm = () => {
  const signup = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");

    console.log(`email: ${email}. password: ${password}`);
  }

  return (
    <>
      <StyledLoginForm action={signup}>
        <label>Email:&nbsp;
          <input type="email" name="email" />
        </label>
        <br />
        <label>Password:&nbsp;
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">
          Login
        </button>
        <br /><br /><br />
        <span>Need to create an account? <Link to='/signup'>Click here</Link></span>
      </StyledLoginForm>
      
    </>
  )
}
export default LoginForm