// @ts-nocheck
import React, { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon, ArrowDownIcon } from "@heroicons/react/solid";
import classNames from "services/classNames";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Filters } from "components/filters";
import { useAuth } from "hooks/auth";
import { useTranslation } from "react-i18next";
import { InputLocation } from "components/form/inputs/input-location";

const user = {
  name: "Charles d'Oiron",
  email: "charles@fragile.studio",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

interface Props {
  showFilters?: boolean;
  isSimple?: boolean;
}

export const Header: React.FC<Props> = ({
  showFilters = false,
  isSimple = false,
}) => {
  const { i18n, t } = useTranslation();
  const [placeName, setPlaceName] = useState(null);
  const [placeGeometry, setPlaceGeometry] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  let auth = useAuth();
  const logout = async () => {
    auth.logout(() => {
      navigate("/connexion");
    });
  };

  const userNavigation = [
    { name: "Votre profil", onClick: () => navigate("/profile") },
    { name: "Se connecter", onClick: () => navigate("/connexion") },
    { name: "Se déconnecter", onClick: () => logout() },
  ];
  type ItemLngs = {
    nativeName: string;
  };

  const lngs: Record<string, ItemLngs> = {
    en: { nativeName: "English" },
    fr: { nativeName: "Français" },
  };

  return (
    <Popover as="header" className="pb-24 bg-indigo-600">
      {({ open }) => (
        <>
          <div className="md:max-w-screen-3xl max-w-screen-4xl mx-auto lg:px-10 lg:py-0  px-5  py-5 ">
            <div className="relative py-5 flex items-center justify-center lg:justify-between">
              {/* Logo */}
              <div
                className="absolute left-0 flex-shrink-0 lg:static hover:cursor-pointer text-white font-bold"
                onClick={() => navigate("/")}
              >
                <p className="text-[30px]">Caravane</p>
              </div>

              {!isSimple && (
                <div className="w-3/6 ml-10 lg:visible invisible">
                  <div className="">
                    <label htmlFor="mobile-search" className="sr-only">
                      {t("layout.inputSearch")}
                    </label>
                    <div className="relative text-white focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <InputLocation
                        withSearchIcon
                        placeholder={t("layout.inputSearch")}
                        id="place"
                        name={placeName}
                        geometry={placeGeometry}
                        onChange={setPlaceName}
                        onChangeGeometry={(geometry) => {
                          setPlaceGeometry(geometry);
                          const searchParamsObject: any = {};
                          for (const [key, param] of searchParams.entries()) {
                            searchParamsObject[key] = param;
                          }
                          setSearchParams({
                            ...searchParamsObject,
                            location: geometry.coordinates.join(","),
                          });
                        }}
                      />
                      {/* <input
                        id="mobile-search"
                        className="block w-full bg-white bg-opacity-20 py-5 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder={t("layout.inputSearch")}
                        type="search"
                        name="search"
                      /> */}
                    </div>
                  </div>
                </div>
              )}

              {/* Right section on desktop */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                {!isSimple && (
                  <>
                    <Link
                      to="/convoy-create"
                      type="button"
                      className="flex-shrink-0 rounded-md hover:text-white bg-indigo-800 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white p-2 text-white mr-5 px-5"
                    >
                      {t("layout.createConvoy")}
                    </Link>
                    <Link
                      to="/collect-create"
                      type="button"
                      className="flex-shrink-0 rounded-md hover:text-white bg-indigo-800 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white p-2 text-white mr-5 px-5"
                    >
                      {t("layout.createCollect")}
                    </Link>
                    {/* <Link
                      to="/driver-create"
                      type="button"
                      className="flex-shrink-0 rounded-md hover:text-white bg-indigo-800 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white p-2 text-white mr-5 px-5"
                    >
                      {t("layout.driver")}
                    </Link> */}
                  </>
                )}

                <div className="ml-5 flex flex-col">
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm  ring-opacity-20 focus:outline-none focus:ring-opacity-100 px-3 py-2 flex text-indigo-500">
                        <p className="mt-[1px]">
                          {i18n.language === "fr" ? "🇫🇷" : "🇪🇺"}
                        </p>
                        <ArrowDownIcon
                          className="h-3 w-3 mt-1 ml-2"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right w-full z-40 absolute -right-0 mt-2  rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-[100px]">
                        {Object.keys(lngs).map((lng) => (
                          <Menu.Item key={lng}>
                            {({ active }) => (
                              <button
                                onClick={() => i18n.changeLanguage(lng)}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 w-full text-sm text-gray-700 text-left"
                                )}
                              >
                                {lngs[lng].nativeName}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              onClick={() => item.onClick()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 w-full text-sm text-gray-700 text-left"
                              )}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Search MOBILE */}
              {!isSimple && (
                <div className="flex-1 min-w-full  lg:hidden mx-auto">
                  <div className=" w-full ">
                    <label htmlFor="desktop-search" className="sr-only">
                      {t("layout.inputSearch")}
                    </label>
                    <div className="relative text-white focus-within:text-gray-600 w-[80%]">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="desktop-search"
                        className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder={t("layout.inputSearch")}
                        type="search"
                        name="search"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Menu button */}
              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
            {showFilters && (
              <div className="hidden lg:block border-t border-white border-opacity-20 ">
                <Filters />
              </div>
            )}
          </div>

          <Transition.Root as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        <a
                          href="/convoy-create"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Je crée un convoi
                        </a>
                        {/* <a
                              href="/collect-create"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Je crée une collecte
                            </a>
                            <a
                              href="/driver-create"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Je suis chauffeur
                            </a>
                            <a
                              href="/hospitality-create"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Je propose un logement
                            </a> */}
                      </div>
                    </div>
                    <div className="pt-4 pb-2">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="text-base font-medium text-gray-800 truncate">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium text-gray-500 truncate">
                            {user.email}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => item.onClick()}
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
};
