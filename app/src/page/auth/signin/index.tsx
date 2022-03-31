import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

import { Input } from "components/form/inputs/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/auth";

export const Signin: React.FC = () => {
  const navigate = useNavigate();
  let location = useLocation();

  let auth = useAuth();
  // @ts-ignore: React router typescript error / need to find solution
  let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (form) => {
    auth.signin({ ...form }, () => {
      navigate(from, { replace: true });
    });
  });
  return (
    <>
      <div className="min-h-full flex items-center justify-center md:w-2/6 sm:w-3/6 w-full mx-10 md:mx-0 md:min-w-[500px] ">
        <div className=" w-full ">
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
          <form className=" space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm ">
              <div className="mb-2">
                <Input
                  required
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

              <div className="grid grid-cols-6 gap-6 mb-5 ">
                <div className="col-span-6 sm:col-span-3">
                  <Input
                    required
                    type="text"
                    id="name"
                    autoComplete="firstName"
                    placeholder="Renseigner votre prénom et nom"
                    label="Prénom et nom"
                    register={register("name", {
                      required: true,
                    })}
                    error={errors.name}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Input
                    type="text"
                    id="phone"
                    autoComplete="email"
                    placeholder="Renseigner votre téléphone"
                    label="Téléphone"
                    register={register("phone", {
                      required: true,
                    })}
                    error={errors.phone}
                  />
                </div>
              </div>
              <div className="mb-2">
                <Input
                  required
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

              <div className="mb-2">
                <Input
                  required
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  placeholder="Confirmation de votre mot de passe"
                  label="Mot de passe"
                  register={register("confirmPassword", {
                    required: true,
                  })}
                  error={errors.confirmPassword}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  defaultChecked
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
