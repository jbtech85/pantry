import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
  const signup = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");
  }

  return (
    <>
      <form action={signup}>
        <label>Email: 
          <input type="email" name="email" />
        </label>
        <label>Password: 
          <input type="password" name="password" />
        </label>

        <button type="submit">
          Login
        </button>
      </form>
      <br />
      Need to create an account? <Link to='/signup'>Click here</Link>
    </>
  )
}
export default SignupPage