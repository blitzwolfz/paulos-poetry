// The login and register page will use the same stylesheet
import { useState } from "react";
import { handleRegister } from "../../util/handleLogin";
import "../styles/loginPage.scss";
import { checkRegisterRequirements, errorMessages } from "../../util/registerRequirements";
import PasswordStrength from "../../components/PasswordStrength";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // Register button is clicked
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Make sure all requirements are met
    const registerRequirements = checkRegisterRequirements({ email, password, confirmPassword, firstName, lastName });
    if (registerRequirements.error) {
      setErrorMessage(errorMessages[registerRequirements.error] as string);
      return;
    }

    // Send the register request to the server
    const data = await handleRegister({ email, password, firstName, lastName });

    // TODO: Check for user exists (in a deferred value) everytime the username updates
    // Check for errors from the server
    if (data.error) {
      setErrorMessage(data.error);
      return;
    }

    // If there are no errors, clear the error message
    setErrorMessage("");

    // Redirect to the login page
    window.location.href = "/login";
  };

  // Update state when the user types in the email or password input
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const updateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h1 className="login-page--title">Register</h1>
        {errorMessage ? <div className="login-page--error">{JSON.stringify(errorMessage)}</div> : null}
        <input type="email" placeholder="Email" autoComplete="username" value={email} onChange={updateEmail} />
        <div>
          <input
            className="login-page--name"
            type="text"
            autoComplete="given-name"
            placeholder="First Name"
            value={firstName}
            onChange={updateFirstName}
          />
          <input
            className="login-page--name"
            type="text"
            autoComplete="family-name"
            placeholder="Last Name"
            value={lastName}
            onChange={updateLastName}
          />
        </div>
        <input type="password" placeholder="Password" autoComplete="new-password" value={password} onChange={updatePassword} />
        <input type="password" placeholder="Confirm Password" autoComplete="new-password" value={confirmPassword} onChange={updateConfirmPassword} />
        <button type="submit">Register</button>
        <div>
          Already signed up? <a href="/login">Sign in here!</a>
        </div>
      </form>
      <PasswordStrength password={password} />
    </div>
  );
}
