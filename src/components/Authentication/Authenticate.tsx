import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PasswordResetForm from "./PasswordResetForm";

interface AuthenticateProps {
  onComplete: () => void;
}

type FormType = "login" | "register" | "passwordReset";

const Authenticate: React.FC<AuthenticateProps> = ({ onComplete }) => {
  const [formType, setFormType] = useState<FormType>("login");

  const handleFormChange = (formType: FormType) => {
    setFormType(formType);
  };

  switch (formType) {
    case "login":
      return (
        <LoginForm
          onComplete={onComplete}
          onFormChangeRequest={handleFormChange}
        />
      );
    case "register":
      return (
        <RegisterForm
          onComplete={onComplete}
          onFormChangeRequest={handleFormChange}
        />
      );
    default:
      return (
        <PasswordResetForm
          onComplete={onComplete}
          onFormChangeRequest={handleFormChange}
        />
      );
  }
};

export default Authenticate;
