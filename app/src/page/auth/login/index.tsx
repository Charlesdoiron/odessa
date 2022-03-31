import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

import { Input } from "components/form/inputs/input";
import API from "services/api";
import { useNavigate } from "react-router-dom";
import { useCount } from "context/user-context";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useCount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (form) => {
    const response = await API.post({
      path: "/user/login",
      body: { ...form },
    });

    if (!response.ok) return alert(response.error);
    else {
      dispatch({ type: "logged", payload: response });
      navigate("/");
    }
  });
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
              Se connecter
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-2">
                <Input
                  type="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Renseigner votre addresse email"
                  label="Adresse email"
                  register={register("email", {
                    required: true,
                  })}
                  error={errors.email}
                />
              </div>
              <div>
                <Input
                  type="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Renseigner votre mot de passe"
                  label="Mot de passe"
                  register={register("password", {
                    required: true,
                  })}
                  error={errors.password}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  defaultChecked
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Se rappeler de moi
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forget-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500 "
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Je me connecte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
