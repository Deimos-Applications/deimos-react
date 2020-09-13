import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import withAuth from "../../auth/components/withAuth";

interface HomePageProps extends RouteComponentProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="flex flex-col flex-center">
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/example">Example Page</Link>
          <Link to="/users">User Crud Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default withAuth(HomePage, { roles: ["isAdmin"] });
