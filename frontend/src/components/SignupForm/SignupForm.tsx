import { useSignup } from "../../hooks/useSignup";
import { StyledSignupForm } from "../../styles/forms.styles";

const SignupForm = () => {
  const {signup, error, isLoading} = useSignup();

  const handleSignup = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");

    await signup(email, password);
  }

  return (
    <StyledSignupForm action={handleSignup}>
      <label>Email: 
        <input type="email" name="email" />
      </label>
      <br />
      <label>Password: 
        <input type="password" name="password" />
      </label>
      <br />
      <button disabled={isLoading} type="submit">
        Sign up
      </button>

      {error && <div className="error">{error}</div>}
    </StyledSignupForm>
  )
}
export default SignupForm