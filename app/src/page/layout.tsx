import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthLayout, PrimaryLayout, SimpleMenuLayout } from "components/layout";

type Props = {
  children: JSX.Element;
};
export const Layout = ({ children }: Props) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (pathname.includes("/connexion") || pathname.includes("/inscription")) {
    return <AuthLayout>{children}</AuthLayout>;
  } else if (
    pathname.includes("/convoy") ||
    pathname.includes("/collect") ||
    pathname.includes("/mentions-legales") ||
    pathname.includes("/a-propos")
  ) {
    return <SimpleMenuLayout>{children}</SimpleMenuLayout>;
  } else return <PrimaryLayout>{children}</PrimaryLayout>;
};
