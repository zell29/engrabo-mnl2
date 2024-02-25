import { React, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import styles from '../../styles/style';
import { Link } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState('');
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="../../assets/logo/engrabo-logo.jpg"
          alt="Logo"
          className="mx-auto w-24 mb-6"
        />

        <h2 className="mt-6 text-center text-3xl font-extrabold text-brown-dark">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded lg:px-10">
          <form action="" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-brown-semidark"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-brown-lightdark rounded-md shadow-sm placeholder-brown-lightdark focus:outline-none focus:ring-brown-semidark focus:border-brown-semidark"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-brown-semidark"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-brown-lightdark rounded-md shadow-sm placeholder-brown-lightdark focus:outline-none focus:ring-brown-semidark focus:border-brown-semidark"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-brown-semidark focus:ring-brown-semidark border-brown-lightdark rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-brown-semidark"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium  text-brown-semidark hover:text-brown-dark"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-brown-lightdark bg-brown-semidark hover:bg-brown-dark"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link
                to="/sign-up"
                className="ml-2 text-brown-semidark hover:text-brown-dark"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
