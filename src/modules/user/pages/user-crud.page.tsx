import React from "react";
import { RouteComponentProps } from "@reach/router";
import DeimosCrudTable from "../../../lib/deimos-crud/components/crud-table/deimos-crud-table";
import { User, userCrudModel } from "../user.model";
import { UserAddSchema } from "../schemas/userAdd.schema";

interface UserCrudPageProps extends RouteComponentProps {}

const columns = [
  { name: "id", selector: "id" },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
];

const fields = [{ name: "name", label: "Nombre", type: "text" }];

const UserCrudPage: React.FC<UserCrudPageProps> = () => {
  return (
    <div className="w-100">
      <h1>Users</h1>
      <DeimosCrudTable<User>
        model={userCrudModel}
        title="Users"
        columns={columns}
        fields={fields}
        addSchema={UserAddSchema}
        editSchema={UserAddSchema}
      ></DeimosCrudTable>
    </div>
  );
};

export default UserCrudPage;
