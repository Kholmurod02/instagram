/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "../../(protected)/authForm";
import { useLoginMutation } from "../../../entities/account/api/authApi";
import WebLogo from "../../../assets/photo_2025-04-04_16-36-44.jpg";
// import "../../../app/i18n"; 

export default function LoginPage() {
  // const [isDarkMode, setDarkMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

<<<<<<< HEAD
  const handleLogin = async (data: { userName: string; password: string }) => {
=======
  const handleLogin = async (data: { email: string; password: string }) => {
>>>>>>> e4766e3beb45db785fde0e37310d3e02eb3bbe29
    try {
      const response = await login(data).unwrap();
  
      const token = response?.data;
  
      if (token) {
        localStorage.setItem("access_token", token.token); 
        navigate("/");
      } else {
        setError("Invalid login response");
      }
<<<<<<< HEAD
    } catch (error: any) {
     console.error(error)
=======
    } catch (error) {
     console.log(error)
>>>>>>> e4766e3beb45db785fde0e37310d3e02eb3bbe29
    }
  };
  
  

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 p-4">
      <div className="sm:w-1/2 flex justify-center sm:justify-start">
        <img
          src={WebLogo}
          alt="Instagram Logo"
          className="w-32 sm:w-40 lg:w-[75%] mt-[70px] ml-[150px] hidden sm:block"
        />
      </div>

      <div className="w-full sm:w-83.5">
        <LoginForm onSubmit={handleLogin} />
        {error && <p className="text-red-500">{error}</p>}
        {isLoading && <p>Загрузка...</p>}

   
      </div>
    </div>
  );
}
