/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from '../../assets/photo_2025-04-04_16-36-39.jpg';
import "../../app/i18n";

const loginSchema = z.object({
  userName: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

const registerSchema = z
  .object({
    userName: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
    fullName: z.string().min(6, "Полное имя должно содержать минимум 6 символов"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

const LoginOptions = () => {

  const handleFacebookLogin = () => {
    window.location.href = "https://www.facebook.com/login/";
  };
  
  const handleForgotPassword = () => {
    window.location.href = "https://www.instagram.com/accounts/password/reset/";
  };
  
  const handleRegister = () => {
    window.location.href = "/registration";
  };

  return (
    <>
      <div className="w-full text-center">
        <div className="flex items-center my-4 w-full relative dark:bg-black">
          <hr className="w-full border-t dark:border-white" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#090909] px-2 text-gray-500 dark:text-white">
            Start
          </span>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-white rounded-md w-full hover:bg-blue-600 hover:text-white dark:bg-[#090909]  dark:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-1000 ease-in-out mt-5" onClick={handleFacebookLogin}>
          <FaFacebook size={20} /> Facebook Login
        </button>
        <p className=" text-blue-600 cursor-pointer hover:underline mt-5" onClick={handleForgotPassword}>
          Forgot Password
        </p>
        <div className="border-t mt-5 pt-4">
          <p className="text-gray-700">
            Already have an account? 
            <span className="text-blue-600 cursor-pointer hover:underline ml-1" onClick={handleRegister}>
              Register here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export function LoginForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(loginSchema) });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-4 border rounded-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <img className="w-35 ml-[75px]" src={Logo} alt="" />
      <motion.input {...register("userName")} placeholder="Имя пользователя" className="border p-2 rounded w-[323px] sm:w-[300px]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} />
      {/* {errors.userName && <p className="text-red-500">{errors.userName.message}</p>} */}

      <div className="relative">
        <motion.input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Пароль" className="border p-2 rounded w-full" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} />
        <button type="button" className="absolute right-3 top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <motion.button type="submit" className="bg-blue-500 text-white p-2 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Login
      </motion.button>

      <LoginOptions />
    </motion.form>
  );
}

export function RegisterForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(registerSchema) });

  const handleFacebookLogin = () => {
    window.location.href = "https://www.facebook.com/login/";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6 border rounded-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h3 className="w-[200px] text-center ml-5 text-sm">Registration</h3>
      <div className="w-full text-center">
        <div className="flex items-center my-4 w-full relative dark:bg-black">
          <hr className="w-full border-t dark:border-white" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#090909] px-2 text-gray-500 dark:text-white">
            Start
          </span>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-white rounded-md w-full hover:bg-blue-600 hover:text-white dark:bg-[#090909]  dark:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-1000 ease-in-out mt-5" onClick={handleFacebookLogin}>
          <FaFacebook size={20} /> Facebook Login
        </button>
      </div>
      <input {...register("userName")} placeholder="Имя пользователя" className="border p-2 rounded" />
      {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
      <input {...register("fullName")} placeholder="Фамилия пользователя" className="border p-2 rounded" />
      {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
      <input {...register("email")} placeholder="Email" className="border p-2 rounded" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input {...register("password")} type="password" placeholder="Пароль" className="border p-2 rounded" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <input {...register("confirmPassword")} type="password" placeholder="Подтвердите пароль" className="border p-2 rounded" />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      <p className="w-66 text-center text-xs">Password should be at least 6 characters</p>
      <p className="w-66 text-center text-xs">Please confirm your password</p>
      <motion.button type="submit" className="bg-blue-500 text-white p-2 rounded" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Register
      </motion.button>
      <div className="border-t mt-5 pt-4 text-center">
        <p className="text-gray-700">
          Already have an account? 
          <span className="text-blue-600 cursor-pointer hover:underline ml-1" onClick={handleLogin}>
            Login here
          </span>
        </p>
      </div>
    </motion.form>
  );
}
