const SignupPage: React.FC = () => {
  const signup = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");
  }

  return (
    <form action={signup}>
      <label>Email: 
        <input type="email" name="email" />
      </label>
      <label>Password: 
        <input type="password" name="password" />
      </label>

      <button type="submit">
        Sign up
      </button>
    </form>
  )
}
export default SignupPage