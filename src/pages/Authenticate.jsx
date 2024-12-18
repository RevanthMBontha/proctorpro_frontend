import { FaGraduationCap, FaGoogle } from "react-icons/fa6";
import { auth, provider, signInWithPopup } from "./../firebase.js";
import { useNavigate } from "react-router";
import axios from "axios";

const Authenticate = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      const thisUser = {
        id: user.uid,
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email,
        tests: [],
      };

      //   Store in localstorage
      localStorage.setItem("user", JSON.stringify(thisUser));

      //   Navigate to home
      navigate("/test-admin");

      //   // Send user data to the server
      //   const response = await axios.post("http://localhost:5000/api/users", {
      //     uid: user.uid,
      //     email: user.email,
      //     name: user.displayName,
      //   });

      //   console.log("User saved:", response.data);
    } catch (error) {
      console.error("Error during Google login:", error);
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        // No response received
        console.error("No response from server:", error.request);
      } else {
        // Something else caused the error
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="flex h-fit w-[600px] flex-col items-center justify-center gap-y-16 rounded-md bg-white p-16 text-white shadow-2xl">
        <div className="flex h-fit w-full items-center justify-center gap-x-2 text-black">
          <FaGraduationCap size={84} />
          <span className="text-7xl font-semibold">ProctorPro</span>
        </div>
        <div
          onClick={handleLogin}
          className="flex cursor-pointer items-center justify-center gap-x-4 rounded-full bg-black p-4 px-8"
        >
          <span className="rounded-full bg-white p-2">
            <FaGoogle size={24} className="text-black" />
          </span>
          <span>Continue with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
