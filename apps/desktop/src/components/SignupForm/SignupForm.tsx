import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { StyledSignupForm } from "../../styles/forms.styles";
import { TooltipDiv } from "../../styles/tooltip.styles";
import { Tooltip } from "react-tooltip";
import { GoInfo } from "react-icons/go";


const SignupForm: React.FC = () => {
  const {signup, error, isLoading} = useSignup();
  const navigate = useNavigate();
  const handleSignup = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");
    let createHousehold = formData.get("createHousehold") === 'on';
    
    const respStatus = await signup(email, password, createHousehold);

    // TODO: check for reference URL
    if(respStatus == 200){
      navigate('/');
    }
  }
  

  // if lang == english
  let checkboxTooltipText = "Households are what items go into.  This helps users share a list, and helps users that might need multiple lists.  Don't worry, you can always add additional households later if you don't add one now!  If you aren't joining someone elses, you will need to create your own to use the app features."

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
      <div id="divCheckbox">
        <label>
          <input
            type="checkbox"
            name="createHousehold"
          /> Create a default household
          <TooltipDiv>
            <a data-tooltip-id="default-household-tooltip" data-tooltip-content={checkboxTooltipText}>
              <GoInfo />
            </a>
            <Tooltip id="default-household-tooltip" />
          </TooltipDiv>
        </label>
      </div>
      <br />
      <button disabled={isLoading} type="submit">
        Sign up
      </button>

      {error && <div className="error">{error}</div>}
    </StyledSignupForm>
  )
}
export default SignupForm