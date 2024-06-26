import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignup";
// import toast from "react-hot-toast";

const SignUp = () => {
  const { loading, signup } = useSignUp();

  // states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckboxChange = (gender: string) => {
    setInput({ ...input, gender });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(input);
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-extrabold text-center mb-3 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              <span>Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Fullname"
              required
              className="rounded-md p-2 px-6 outline-none font-semibold"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              <span>Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              required
              className="rounded-md p-2 px-6 outline-none font-semibold"
              value={input.userName}
              onChange={(e) => setInput({ ...input, userName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Password"
                required
                minLength={6}
                className="rounded-md p-2 px-6 pr-10 outline-none font-semibold"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              {showPassword ? (
                <img
                  src="/hide.png"
                  alt="hide"
                  className="absolute top-[10px] right-3"
                  width={21}
                  height={21}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <img
                  src="/view.png"
                  alt="show"
                  className="absolute top-[10px] right-3"
                  width={21}
                  height={21}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              <span>Confirm Password</span>
            </label>
            <div className="relative">
              <input
                type={`${showPassword1 ? "text" : "password"}`}
                placeholder="Confirm Password"
                required
                className="rounded-md p-2 px-6 pr-10 outline-none font-semibold"
                value={input.confirmPassword}
                onChange={(e) =>
                  setInput({ ...input, confirmPassword: e.target.value })
                }
              />
              {showPassword1 ? (
                <img
                  src="/hide.png"
                  alt="hide"
                  className="absolute top-[10px] right-3"
                  width={21}
                  height={21}
                  onClick={() => setShowPassword1(!showPassword1)}
                />
              ) : (
                <img
                  src="/view.png"
                  alt="show"
                  className="absolute top-[10px] right-3"
                  width={21}
                  height={21}
                  onClick={() => setShowPassword1(!showPassword1)}
                />
              )}
            </div>
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={input.gender}
          />
          <Link
            to="/login"
            className="text-gray-600 font-semibold text-sm hover:text-blue-500 transition-all ease-in-out duration-300"
          >
            have an account already?
          </Link>
          <button
            type="submit"
            className={`bg-blue-500 p-2 rounded-md font-bold text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-all duration-300 ease-in-out tracking-wide`}
            disabled={loading}
          >
            {loading ? <p>loading...</p> : <p>Sign Up</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
