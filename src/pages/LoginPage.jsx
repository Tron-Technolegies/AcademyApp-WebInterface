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
    <div className="flex min-h-screen justify-evenly items-center">
      <img src="/logo.png" alt="logo" className="w-30" />
      <div className="font-kumbh bg-white p-5 rounded-2xl min-w-md flex flex-col gap-3">
        <p className="text-xl font-semibold text-center">
          Welcome,<br></br> Log into your account
        </p>
        <form className="mt-7 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border border-[#A7A7A7] rounded-2xl outline-none p-3 w-full"
            placeholder="Email"
            name="email"
            required
          />
          <input
            type="password"
            className="border border-[#A7A7A7] rounded-2xl outline-none p-3 w-full"
            placeholder="Password"
            name="password"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="py-3 bg-black hover:bg-gray-800 duration-300 disabled:cursor-not-allowed ease-in-out text-white rounded-2xl flex gap-3 items-center justify-center"
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
