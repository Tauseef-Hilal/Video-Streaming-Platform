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
  PasswordResetDocument,
  PasswordResetMutation,
  PasswordResetMutationVariables,
} from "@/lib/graphql/client/generated/graphql";
import { sendOtp } from "@/lib/utils/auth";

interface PasswordResetFormProps {
  onComplete: () => void;
  onFormChangeRequest: (form: "register") => void;
}

interface FormError {
  emailError?: string;
  otpError?: string;
  passwordError?: string;
  authError?: string;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  onComplete,
  onFormChangeRequest,
}) => {
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<FormError>({});
  const [formState, setFormState] = useState({
    loading: false,
    verified: false,
    email: "",
    otp: "",
    password: "",
  });

  const setTokenAndCloseModal = (token: string) => {
    login(token);
    onComplete();
  };

  const [resetPassword] = useMutation<
    PasswordResetMutation,
    PasswordResetMutationVariables
  >(PasswordResetDocument, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ passwordReset }) => {
      setFormState({ ...formState, loading: false });
      setTimeout(() => {
        if (!passwordReset?.token) return;
        setTokenAndCloseModal(passwordReset.token);
      }, 1000);
    },
    onError: (error) => {
      setErrors({ ...errors, authError: error.message });
      setFormState({ ...formState, loading: false });
    },
  });

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

  const validateOtp = () => {
    if (formState.password.length < 8) {
      setErrors({
        ...errors,
        passwordError: "Password length must be 8 or more",
      });
      return;
    }

    setErrors({ ...errors, passwordError: "" });
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
    if (!otp) {
      sendOtp(formState.email).then((res) => {
        setFormState({ ...formState, loading: false });

        if (res.success) {
          setOtp(res.otp!);
          setErrors({ ...errors, authError: "" });
          return;
        }

        setErrors({ ...errors, authError: "Failed to send OTP" });
      });
    } else if (!formState.verified) {
      setFormState({ ...formState, verified: true, loading: false });

      if (formState.otp == otp) {
        setErrors({ ...errors, authError: "" });
        return;
      }

      setErrors({ ...errors, authError: "Invalid OTP" });
    } else {
      if (errors.passwordError) return;
      resetPassword()
    }

    setFormState({ ...formState, loading: true });
  };

  const inputFieldClassName = `
    border border-neutral-700 bg-black p-2 rounded-md 
    text-neutral-300 outline-none focus:border-neutral-300
  `;

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
        <h2 className={`text-2xl font-bold mb-2 text-start w-full`}>
          Reset Password
        </h2>
        <button className="text-red-500" onClick={onComplete}>
          <IoIosCloseCircleOutline size={28} />
        </button>
      </div>

      <div className="flex flex-col gap-4 w-72">
        {/* Email */}
        {!formState.verified && (
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
        )}

        {/* OTP */}
        {otp && !formState.verified && (
          <div className="flex flex-col gap-2">
            <FloatingLabelInput
              required
              id="otpInput"
              name="otp"
              type="text"
              label="OTP"
              value={formState.otp}
              ariaDescribedBy="otpError"
              onBlur={validateOtp}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  otp: e.target.value,
                })
              }
              className={`
              ${inputFieldClassName}
              ${errors.otpError ? "border-red-600" : ""}
            `}
            />
            {errors.otpError && (
              <p
                id="otpError"
                aria-atomic={true}
                aria-live="polite"
                className="text-red-600 text-sm flex gap-2 items-center"
              >
                <IoIosCloseCircleOutline size={24} />
                {errors.otpError}
              </p>
            )}
          </div>
        )}

        {/* Password */}
        {formState.verified && (
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
        )}
      </div>

      <div className="w-full flex flex-col gap-2 items-center">
        <button
          type="submit"
          disabled={formState.loading}
          className={`
            w-full pointer bg-red-600 rounded-md p-2 hover:bg-red-700 flex 
            gap-2 justify-center items-center disabled:cursor-not-allowed
          `}
        >
          {formState.loading && (
            <LoadingIndicator icon={CgSpinner} iconClassName="text-xl" />
          )}
          {!otp && "Send OTP"}
          {otp && !formState.verified && "Verifiy OTP"}
          {formState.verified && "Change Password"}
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

export default PasswordResetForm;
