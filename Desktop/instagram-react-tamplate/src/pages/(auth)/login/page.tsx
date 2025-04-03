import { useState, useEffect } from "react"; // ✅ Добавил useEffect
import { useNavigate } from "react-router";
import { LoginForm } from "../authForm";
import { useLoginMutation } from "../../../entities/comment/api/authApi";
import WebLogo from "../../../components/img/Instagram_web_logo-removebg-preview.png";
import "../../../app/i18n"; 
import { useTranslation } from "react-i18next";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function LoginPage() {
  const [isDarkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const TranslateClick = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    console.log("Отправляемые данные:", data);
    try {
      const response = await login(data).unwrap();
      console.log("Успешный вход:", response);
      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (err: any) {
      console.error("Ошибка при входе:", err);
      setError(err?.data?.message || err?.error || "Ошибка авторизации");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 p-4">
  <div className="sm:w-1/2 flex justify-center sm:justify-start">
    <img src={WebLogo} alt="Instagram Logo" className="w-32 sm:w-40 lg:w-[75%] mt-[70px] ml-[150px] hidden sm:block" />
  </div>

  <div className="w-full sm:w-83.5">
    <LoginForm onSubmit={handleLogin} />
    {error && <p className="text-red-500">{error}</p>}
    {isLoading && <p>Загрузка...</p>}

    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5 mt-4 sm:ml-[60px]">
      <button className="px-3 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg" onClick={() => TranslateClick("en")}>EN</button>
      <button className="px-3 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg" onClick={() => TranslateClick("ru")}>RU</button>
      <button className="px-3 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg" onClick={() => TranslateClick("tj")}>TJ</button>
      <DarkModeSwitch className="transition-all duration-300 ease-in-out" checked={isDarkMode} onChange={toggleDarkMode} size={25} />
    </div>
  </div>
</div>

  );
}
