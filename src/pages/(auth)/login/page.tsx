import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "../../(protected)/authForm";
import { useLoginMutation } from "../../../entities/account/api/authApi";
import WebLogo from "../../../assets/photo_2025-04-04_16-36-44.jpg";
import "../../../app/i18n"; 

export default function LoginPage() {
  // const [isDarkMode, setDarkMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data: { userName: string; password: string }) => {
    console.log("Отправляемые данные:", data);
    try {
      const response = await login(data).unwrap();
      console.log("Успешный вход:", response);
  
      const token = response?.data; // The token is directly in response.data
  
      if (token) {
        localStorage.setItem("access_token", token);
        navigate("/");
      } else {
        console.error(error);
        setError(error);
      }
    } catch (err: any) {
     console.log(error)
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
