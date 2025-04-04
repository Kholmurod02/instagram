/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { RegisterForm } from "../../(protected)/authForm";
import { useRegisterMutation } from "../../../entities/account/api/authApi";
// import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function RegistrationPage() {
    // const [isDarkMode, setDarkMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  
    // const toggleDarkMode = (checked: boolean) => {
    //   setDarkMode(checked);
    // };

  const handleRegister = async (data: any) => {
    console.log("Регистрация:", data);

    try {
      const response = await register(data).unwrap();
      console.log("Успешная регистрация:", response);
      navigate("/login");
    } catch (err: any) {
      console.error("Ошибка при регистрации:", err.data?.message || err.message);
      setError(err.data?.message || "Ошибка регистрации");
    }
  };

  return (
    <div className="flex flex-col sm:items-start gap-4 p-4 ml-0 sm:ml-[650px]">
  <div className="sm:w-80">
    <RegisterForm onSubmit={handleRegister} />
    {error && <p className="text-red-500">{error}</p>}
    {isLoading && <p>Загрузка...</p>}
  </div>

  {/* <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5 w-full sm:w-auto sm:ml-[60px]">
    <button
      className="px-3 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
      // onClick={() => TranslateClick("en")}
    >
      EN
    </button>
    <button
      className="px-3 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
      onClick={() => TranslateClick("ru")}
    >
      RU
    </button>
    <button
      className="px-3 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
      onClick={() => TranslateClick("tj")}
    >
      TJ
    </button>

    <DarkModeSwitch
      className="transition-all duration-300 ease-in-out"
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={25}
    />
  </div> */}
</div>

  );
}
