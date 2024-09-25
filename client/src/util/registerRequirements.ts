import { passwordStrength } from "check-password-strength";

export type RegisterRequirements = "emailFormat" | "passwordMatch" | "passwordLength" | "passwordStrength";
type RequirementObject = { [key in RegisterRequirements]: boolean | string };

interface Props {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const MIN_PASSWORD_LENGTH = 8;
export const errorMessages: RequirementObject = {
  emailFormat: "Invalid email format",
  passwordMatch: "Passwords do not match",
  passwordLength: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  passwordStrength: "Password is not strong enough",
};

export const checkRegisterRequirements = ({ email, password, confirmPassword, firstName, lastName }: Props) => {
  // The order of this object is the order in which the requirements are checked
  const requirements = {
    firstName: firstName.length > 0,
    lastName: lastName.length > 0,
    emailFormat: checkEmailFormat(email),
    passwordMatch: checkPasswordMatch(password, confirmPassword),
    passwordLength: checkPasswordLength(password),
    passwordStrength: checkPasswordStrength(password),
  } as RequirementObject;

  // Return the first requirement that is not met
  const failedRequirement = Object.keys(requirements).find((key) => !requirements[key as RegisterRequirements]) as RegisterRequirements;
  return failedRequirement ? { success: false, error: failedRequirement } : { success: true };
};

// Password checkers
const checkPasswordMatch = (password: string, confirmPassword: string): boolean => password === confirmPassword;
const checkPasswordLength = (password: string): boolean => password.length >= MIN_PASSWORD_LENGTH;
const checkPasswordStrength = (password: string) => passwordStrength(password).id >= 1;

// Email checkers
const checkEmailFormat = (email: string): boolean => email.includes("@") && email.includes(".");
