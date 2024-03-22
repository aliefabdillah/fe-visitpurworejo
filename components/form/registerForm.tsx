'use client'

import Link from "next/link";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (type: string) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <form className="w-2/3 bg-white rounded-lg shadow-2x p-12">
      <h2 className="text-center text-2xl font-bold mb-2">Daftar Akun</h2>
      <label htmlFor="username" className="block mb-2 text-sm">
        Username
      </label>
      <input
        type="text"
        id="username"
        placeholder="JohnDoe"
        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-orange-300"
      />

      <label htmlFor="email" className="block mb-2 text-sm">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="example@example.com"
        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-orange-300"
      />

      <label htmlFor="password" className="block mb-2 text-sm">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 pr-10 focus:outline-none focus:border-orange-300"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility('password')}
          className="absolute inset-y-0 right-0 flex items-center px-3 mb-4 text-gray-500"
        >
          {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>

      <label htmlFor="confirmPassword" className="block mb-2 text-sm">
        Konfirmasi Password
      </label>
      <div className="relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 pr-10 focus:outline-none focus:border-orange-300"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility('confirmPassword')}
          className="absolute inset-y-0 right-0 flex items-center px-3 mb-4 text-gray-500 "
        >
          {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-secondary text-white rounded-md p-2 text-sm transition ease-in-out hover:bg-orange-400 hover:font-bold"
      >
        Daftar
      </button>
      <div className="flex justify-center items-center mt-4">
        <p className="text-center text-sm text-gray-500">
          Sudah memiliki akun?&nbsp;
        </p>
        <Link
          href={'/id/auth/login'}
          className="text-sm font-medium text-primary hover:underline hover:font-bold"
        >
          Masuk
        </Link>
      </div>
    </form>
  );
}
