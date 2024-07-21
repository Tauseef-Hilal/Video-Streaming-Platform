import useAuth from "@/hooks/auth";
import SignInButton from "./SignInButton";

const Subscriptions: React.FC = () => {
  const { isLoggedIn } = useAuth()

  return (
    <div
      className={`
        flex flex-col gap-3 items-start px-7 py-5 border-b-[1px] 
        border-[#4c4c4cb4]
      `}
    >
      {isLoggedIn ? (
        "[Subscriptions]"
      ) : (
        <>
          <p className="text-sm">
            Sign in to like videos,
            <br />
            comment, and subscribe
          </p>
          <SignInButton />
        </>
      )}
    </div>
  );
};

export default Subscriptions;
