import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { StyledSignupForm } from "../../styles/forms.styles";
import { useState } from "react";
import { Tooltip } from 'react-tooltip';
import { GoInfo } from "react-icons/go";


const SignupForm: React.FC = () => {
  const {signup, error, isLoading} = useSignup();
  const navigate = useNavigate();
  const handleSignup = async (formData: FormData) => {
    let email = formData.get("email");
    let password = formData.get("password");
    
    await signup(email, password);

    // TODO: check for reference URL
    navigate('/');
  }
  
  const [householdChecked, setHouseholdChecked] = useState(true);
  const handleHouseholdCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHouseholdChecked(event.target.checked);
  };

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
      <div id="divRadio">
        <label>
          <input
            type="checkbox"
            checked={householdChecked}
            onChange={handleHouseholdCheckbox}
          /> Create a default household
        </label>
        <a data-tooltip-id="checkboxTooltip" data-tooltip-content={checkboxTooltipText}><GoInfo /></a>
        <br />
        <span>Don't worry, you can always add a household later if you need to.  tldr, your pantry/grocery items go in a household.  This helps users share a pantry, and helps users that might live in multiple places.</span>
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