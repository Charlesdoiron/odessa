import { useState } from "react";
import { signup } from "call/auth";
import { signupInputsData } from './utills';
import { SignupBody } from "call/auth";

export const Signup = () => {
  const [signupState, setSignupState] = useState<SignupBody>({});
  const onSignupInputsChange = (e: any) => {
    setSignupState({...signupState, [e.target.name]: e.target.value})
  }

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log('submit');
    signup(signupState).then((res) => console.log(res ,'res'));
  }
 
  return ( 
    <>
      <div className="min-h-full flex items-center justify-center md:w-2/6 sm:w-3/6 w-full mx-10 md:mx-0 md:min-w-[500px] ">
        <div className=" w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              S'inscrire
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {signupInputsData.map(({id, name, type, placeholder}) => {
                return(
                  <div>
                    <input
                      onChange={onSignupInputsChange}
                      style={{ padding: "20px" }}
                      id={id}
                      name={name}
                      type={type}
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder={placeholder}
                    />
                  </div>
                )
              })}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Je m'inscris
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
