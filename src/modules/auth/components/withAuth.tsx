import { useNavigate } from "@reach/router";
import React, { useEffect } from "react";
import JSONPretty from "react-json-pretty";
import { useSelector } from "react-redux";
import { loggedInSelector } from "../auth.slice";

interface WithAuthProps {
  roles?: string[];
  route?: string;
}

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  data: WithAuthProps
): React.FC<P & WithAuthProps> => ({ roles, ...props }: WithAuthProps) => {
  const loggedIn = useSelector(loggedInSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate(data.route ?? "/");
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <JSONPretty
        data={{
          ...data,
          loggedIn,
        }}
      ></JSONPretty>
      <Component {...(props as P)} />
    </div>
  );
};

export default withAuth;
