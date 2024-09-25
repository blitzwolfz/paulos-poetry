import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { MIN_PASSWORD_LENGTH } from "../util/registerRequirements";

type Props = {
  password: string;
};

// const MAX_PASSWORD_STRENGTH = 3;
// const customOptions = [
//   { id: 0, value: "Too weak", minDiversity: 0, minLength: 0 },
//   { id: 1, value: "Weak", minDiversity: 2, minLength: MIN_PASSWORD_LENGTH },
//   { id: 2, value: "Medium", minDiversity: 4, minLength: 8 },
//   { id: 3, value: "Strong", minDiversity: 4, minLength: 10 },
//   { id: 4, value: "Very strong", minDiversity: 4, minLength: 12 },
// ];

export default function PasswordStrength({ password }: Props) {
  const [strength, setStrength] = useState<number>(0);
  useEffect(() => {
    setStrength(passwordStrength(password).id);
  }, [password]);

  return <div>{strength}</div>;
}
