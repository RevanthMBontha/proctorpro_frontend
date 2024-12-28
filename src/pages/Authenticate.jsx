import { FaGraduationCap, FaGoogle } from "react-icons/fa6";
import { auth, provider, signInWithPopup } from "./../firebase.js";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../api-routes.js";

const Authenticate = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDetails = {
        id: user.uid,
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email,
        tests: [],
      };

      const response = await axios.post(`${BASE_URL}/auth/login`, userDetails);

      // Add the user and the token to localstorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("iat", response.data.issuedAt);
      localStorage.setItem("exp", response.data.expiresIn);
    },
    onSuccess: () => {
      navigate(-1);
    },
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="flex h-fit w-[600px] flex-col items-center justify-center gap-y-16 rounded-md bg-white p-16 text-white shadow-2xl">
        <div className="flex h-fit w-full items-center justify-center gap-x-2 text-black">
          <FaGraduationCap size={84} />
          <span className="text-7xl font-semibold">ProctorPro</span>
        </div>
        <div
          onClick={loginMutation.mutate}
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
