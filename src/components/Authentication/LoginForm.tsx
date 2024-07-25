import { useState } from "react";
import { dmSans } from "@/global/fonts";
import { CgSpinner } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useMutation } from "@apollo/client";

import useAuth from "@/hooks/auth";
import FloatingLabelInput from "../FloatingLabelInput";
import LoadingIndicator from "../LoadingIndicator";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "@/lib/graphql/client/generated/graphql";
import { BiCheckCircle } from "react-icons/bi";

interface LoginFormProps {
  onComplete: () => void;
  onFormChangeRequest: (form: "register" | "passwordReset") => void;
}

interface FormError {
  emailError?: string;
  passwordError?: string;
  authError?: string;
}

interface FormState {
  status: "idle" | "submiting" | "success";
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onComplete,
  onFormChangeRequest,
}) => {
  const { login } = useAuth();
  const [errors, setErrors] = useState<FormError>({});
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    email: "",
    password: "",
  });

  const setTokenAndCloseModal = async (token: string) => {
    if (await login(token)) {
      setFormState({ ...formState, status: "success" });
      setTimeout(() => onComplete(), 1000);
      return;
    }

    setErrors({ authError: "Failed to log in! Please try again" });
    setFormState({ ...formState, status: "idle" });
  };

  const [gqlLogin] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    {
      variables: {
        email: formState.email,
        password: formState.password,
      },
      onCompleted: ({ login }) => {
        setTimeout(() => {
          if (!login?.token) return;
          setTokenAndCloseModal(login.token);
        }, 1000);
      },
      onError: (error) => {
        setErrors({ ...errors, authError: error.message });
        setFormState({ ...formState, status: "idle" });
      },
    }
  );

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formState.email || !emailRegex.test(formState.email)) {
      setErrors({
        ...errors,
        emailError: "Please enter a valid email",
      });
      return;
    }

    setErrors({ ...errors, emailError: "" });
  };

  const validatePassword = () => {
    if (formState.password.length < 8) {
      setErrors({
        ...errors,
        passwordError: "Password length must be 8 or more",
      });
      return;
    }

    setErrors({ ...errors, passwordError: "" });
  };

  const handleSubmit = () => {
    if (isSubmitBtnDisabled || errors.emailError || errors.passwordError) {
      return;
    }

    gqlLogin();
    setFormState({ ...formState, status: "submiting" });
  };

  const inputFieldClassName = `
    border border-neutral-700 bg-black p-2 rounded-md 
    text-neutral-300 outline-none focus:border-neutral-300
  `;

  const isSubmitBtnDisabled =
    formState.status == "submiting" || formState.status == "success";

  return (
    <form
      action={handleSubmit}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          handleSubmit();
        }
      }}
      className={`
        text-neutral-100 flex flex-col gap-4 px-6 items-center relative 
        ${dmSans.className}
      `}
    >
      <div className="flex justify-between items-start w-full">
        <h2 className={`text-2xl font-bold mb-2 text-start w-full`}>Sign In</h2>
        <button className="text-red-500" onClick={onComplete}>
          <IoIosCloseCircleOutline size={28} />
        </button>
      </div>

      <div className="flex flex-col gap-4 w-72">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <FloatingLabelInput
            required
            id="emailInput"
            name="email"
            type="email"
            label="Email"
            value={formState.email}
            ariaDescribedBy="emailError"
            onBlur={validateEmail}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            className={`
              ${inputFieldClassName}
              ${errors.emailError ? "border-red-600" : ""}
            `}
          />
          {errors.emailError && (
            <p
              id="emailError"
              aria-atomic={true}
              aria-live="polite"
              className="text-red-600 text-sm flex gap-2 items-center"
            >
              <IoIosCloseCircleOutline size={24} />
              {errors.emailError}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <FloatingLabelInput
            required
            id="passwordInput"
            name="password"
            type="password"
            label="Password"
            value={formState.password}
            ariaDescribedBy="passwordError"
            onBlur={validatePassword}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            className={`
              ${inputFieldClassName}
              ${errors.passwordError ? "border-red-600" : ""}
            `}
          />
          {errors.passwordError && (
            <p
              id="passwordError"
              aria-atomic={true}
              aria-live="polite"
              className="text-red-600 text-sm flex gap-2 items-center"
            >
              <IoIosCloseCircleOutline size={24} />
              {errors.passwordError}
            </p>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 items-center">
        <button
          type="submit"
          disabled={isSubmitBtnDisabled}
          className={`
            w-full pointer bg-red-600 rounded-md p-2 hover:bg-red-700 flex 
            gap-2 justify-center items-center disabled:cursor-not-allowed
          `}
        >
          {formState.status == "submiting" && (
            <LoadingIndicator icon={CgSpinner} iconClassName="text-xl" />
          )}
          {formState.status == "success" && (
            <BiCheckCircle className="text-xl" />
          )}
          Sign In
        </button>
        {errors.authError && (
          <p
            className={`
              text-red-600 text-sm flex gap-2 items-center text-center
            `}
          >
            <IoIosCloseCircleOutline size={24} />
            {errors.authError}
          </p>
        )}
        <button
          type="button"
          className="w-full pointer rounded-md text-neutral-300 text-sm"
          onClick={() => onFormChangeRequest("passwordReset")}
        >
          Forgot password?
        </button>
      </div>

      <div className="text-sm">
        <span className="text-neutral-300 mr-2">
          Don&apos;t have an account?
        </span>
        <button type="button" onClick={() => onFormChangeRequest("register")}>
          Sign up now
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
