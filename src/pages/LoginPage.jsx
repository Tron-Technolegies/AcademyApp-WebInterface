import React from "react";
import { TiChevronRight, TiRefresh } from "react-icons/ti";
import { IoReload } from "react-icons/io5";
import { useLogin } from "../../hooks/auth/useAuth";
export default function LoginPage() {
  const { isPending, mutateAsync } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    await mutateAsync(data);
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen justify-center md:justify-evenly items-center gap-10 p-6 bg-[#f7f6fb]">
      <img src="/logo.png" alt="logo" className="w-24 md:w-30 object-contain" />
      <div className="font-kumbh bg-white p-6 md:p-8 rounded-2xl w-full max-w-md flex flex-col gap-3 shadow-sm border border-gray-100">
        <p className="text-xl font-semibold text-center text-[#252525]">
          Welcome,<br></br> Log into your account
        </p>
        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border border-[#A7A7A7] rounded-2xl outline-none p-3 w-full focus:border-[#C441F4] transition"
            placeholder="Email"
            name="email"
            required
          />
          <input
            type="password"
            className="border border-[#A7A7A7] rounded-2xl outline-none p-3 w-full focus:border-[#C441F4] transition"
            placeholder="Password"
            name="password"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="py-3 bg-black hover:bg-gray-800 duration-300 disabled:cursor-not-allowed ease-in-out text-white rounded-2xl flex gap-3 items-center justify-center font-medium shadow hover:shadow-md transition"
          >
            {isPending ? "Logging In" : " Login"}
            {isPending ? (
              <IoReload size={18} className="animate-spin" />
            ) : (
              <TiChevronRight size={22} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
