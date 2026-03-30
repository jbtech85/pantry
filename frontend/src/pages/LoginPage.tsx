import LoginForm from "../components/LoginForm/LoginForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  {user &&
    navigate('/')}
  
  if(!user){
    return (
      <LoginForm /> 
    )
  }
}
export default SignupPage