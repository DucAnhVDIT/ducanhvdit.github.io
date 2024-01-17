import VDITURL from "../../assets/images/vditheader.png"
import illustrationUrl from "../../assets/images/illustration.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import clsx from "clsx";

import { useNavigate } from 'react-router-dom';
import { registerData } from "../../types/user";
import { useState } from "react";
import userRepository from "../../repositories/userRepository";
import { toast, ToastContainer } from "react-toastify";
import { logErrorRegister } from "../../constant/log-error";

function Main() {
  const [formRegister, setFormRegister] = useState(registerData)
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormRegister((data) => ({ ...data, [name]: value}))
  }
  const handleRegister = () => {
    console.log(formRegister)
    userRepository.register(formRegister).then((res: any) => {
      const data = res.data.RegisterAccountStatus
      if (data === 0) {
        toast.success('register success')
        navigate('/login')
      } else {
        logErrorRegister(data)
      }
    }).catch((err: any) => {
      toast.error('Fail Register')
    })
  }
  return (
    <>
      <div
        className={clsx([
          "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Register Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <img
                  alt="VDIT Solutions"
                  className="w-6"
                  src={VDITURL}
                />
                <span className="ml-3 text-lg text-white"> VDIT Solutions </span>
              </a>
              <div className="my-auto">
                <img
                  alt="VDIT Solutions"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  A few more clicks to <br />
                  sign up to your account.
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Manage all your accounts in one place
                </div>
              </div>
            </div>
            {/* END: Register Info */}
            {/* BEGIN: Register Form */}
            <div className="flex h-screen py-5 my-10 xl:h-screen xl:py-0 xl:my-0 overflow-y-auto">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:pb-8 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Sign Up
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
                  A few more clicks to sign in to your account. Manage all your
                  accounts in one place
                </div>
                <div className="mt-8 intro-x">
                  <FormInput
                    type="text"
                    className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="First Name"
                    name="firstName"
                    value={formRegister.firstName}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Last Name"
                    name="lastName"
                    value={formRegister.lastName}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Company Name"
                    name="companyName"
                    value={formRegister.companyName}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Telephone"
                    name="telephone"
                    value={formRegister.telephone === 0 ? '' : formRegister.telephone}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Mobile"
                    name="mobile"
                    value={formRegister.mobile === 0 ? '' : formRegister.mobile}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Street 1"
                    name="street1"
                    value={formRegister.street1}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Street 2"
                    name="street2"
                    value={formRegister.street2}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Town"
                    name="town"
                    value={formRegister.town}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Post Code"
                    name="postcode"
                    value={formRegister.postcode}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Country"
                    name="country"
                    value={formRegister.country}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Email"
                    name="email"
                    value={formRegister.email}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Password"
                    name="password"
                    value={formRegister.password}
                    onChange={handleChange}
                  />
                  {/* <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
                    <div className="h-full col-span-3 rounded bg-success"></div>
                    <div className="h-full col-span-3 rounded bg-success"></div>
                    <div className="h-full col-span-3 rounded bg-success"></div>
                    <div className="h-full col-span-3 rounded bg-slate-100 dark:bg-darkmode-800"></div>
                  </div>
                  <a
                    href=""
                    className="block mt-2 text-xs intro-x text-slate-500 sm:text-sm"
                  >
                    What is a secure password?
                  </a> */}
                  <FormInput
                    type="text"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Password Confirmation // not done yet leave for later"
                  />
                </div>
                {/* <div className="flex items-center mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                  <FormCheck.Input
                    id="remember-me"
                    type="checkbox"
                    className="mr-2 border"
                  />
                  <label
                    className="cursor-pointer select-none"
                    htmlFor="remember-me"
                  >
                    I agree to the VDIT Solutions
                  </label>
                  <a className="ml-1 text-primary dark:text-slate-200" href="">
                    Privacy Policy
                  </a>
                  .
                </div> */}
                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                  <Button
                    variant="primary"
                    className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </div>
            {/* END: Register Form */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Main;
