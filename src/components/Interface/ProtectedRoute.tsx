import React from "react";
import { UserContext } from "@/app/UserContext";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }: any) {
  const User = React.useContext(UserContext);

  if (User && User.login === true) {
    return children;
  } else if (User && User.login === false) {
    return redirect("/conta/login");
  } else {
    return <></>;
  }
}
