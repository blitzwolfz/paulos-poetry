// The login and register page will use the same stylesheet
import { useContext, useState } from "react";
import { handleLogin } from "../../util/handleLogin";
import "../styles/loginPage.scss";
import { Store } from "../../App";

export default function LoginPage() {
  const { setUser } = useContext(Store);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // Login button is clicked
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await handleLogin({ email, password });

    // TODO: Handle logins and errors
    if (data.error) {
      setErrorMessage(data.error);
      return;
    }

    // If there are no errors, clear the error message
    setErrorMessage("");

    setUser(data);

    // Redirect to the home page
    window.location.href = "/";
  };

  // Updates state when the user types in the email or password input
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="login-page">
      <form onSubmit={onSubmit}>
        <h1 className="login-page--title">Login</h1>
        {errorMessage ? <div className="login-page--error">{JSON.stringify(errorMessage)}</div> : null}
        <input type="email" placeholder="Email" autoComplete="username" value={email} onChange={updateEmail} />
        <input type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={updatePassword} />
        <a href="/forgot-password">Forgot Password?</a>
        <button type="submit">Login</button>
        <div>
          New here? <a href="/register">Sign up here!</a>
        </div>
      </form>
    </div>
  );
}
