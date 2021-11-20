import Head from "next/head";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [passHidden, setPasshidden] = useState(true);
  const [logincred, setLogincred] = useState({ email: "", password: "" });
  const router = useRouter();
  const setValue = (e) => {
    setLogincred({ ...logincred, [e.target.name]: e.target.value });
  };
  /**
   *
   * @param {String} word - Normmal String
   * @returns {String} String changed to title Case.
   */
  const capitalize = ([first, ...rest]) => {
    return first.toUpperCase() + rest.join("");
  };
  const submitCred = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(logincred),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      const data = await response.json();
      console.log(data);
      if (response.status >= 400) {
        alert(capitalize(data.status));
      } else {
        localStorage.setItem("acs_tkn", data.acs_tkn);
        localStorage.setItem("ref_tkn", data.ref_tkn);
        router.push("/home");
      }
    } catch (err) {
      alert("Cannot login. Ensure you have an active internet connection.");
    }
  };
  return (
    <div>
      <Head>
        <title>Appytree</title>
        <meta name="description" content="Appytree Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <div className="w-2/3 md:w-1/2 lg:w-1/5 m-auto mx-auto pt-20">
          <img
            src="/logo.png"
            alt="Appytree"
            className="rounded-full object-contain md:object-scale-down"
          />
        </div>
      </div>

      <form className="grid grid-cols-1 justify-items-stretch">
        <div className="my-4 mx-4 lg:justify-self-center">
          <label
            htmlFor="email"
            className=" font-sans block text-2xl font-medium text-blue-400 subpixel-antialiased"
          >
            Email
          </label>
          <input
            placeholder="abcd@xyz.com"
            id="email"
            name="email"
            type="email"
            onChange={setValue}
            className="focus:ring-blue-400 focus:border-blue-400 w-full lg:w-80 py-2 sm:text-lg border-gray-400 rounded-md"
          />
        </div>
        <div className=" my-4 mx-4 lg:justify-self-center">
          <label
            htmlFor="pass"
            className=" font-sans text-2xl block font-medium text-blue-400 subpixel-antialiased "
          >
            Password
          </label>
          <input
            placeholder="password"
            id="pass"
            name="password"
            type={passHidden ? "password" : "text"}
            onChange={setValue}
            className="focus:ring-blue-400 focus:border-blue-400 w-full lg:w-80 py-2 sm:text-lg border-gray-400 rounded-md"
          />
        </div>
        <div className="my-4 mx-4 justify-self-center">
          <button
            className="text-sm bg-red-500 text-white rounded py-2 px-4 inline-flex items-center hover:bg-red-300 mr-4"
            onClick={(e) => {
              e.preventDefault();
              setPasshidden(!passHidden);
            }}
          >
            <span className="pr-2">
              {passHidden ? "Unhide Password" : "Hide Password"}
            </span>
            {passHidden ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeOffIcon className="h-5 w-5" />
            )}
          </button>
          <button
            className="text-2xl bg-gray-800 text-white rounded py-2 px-4 inline-flex items-center hover:bg-blue-300"
            type="submit"
            onClick={submitCred}
          >
            <span className="pr-2">Login</span>
          </button>
        </div>
      </form>
    </div>
  );
}
