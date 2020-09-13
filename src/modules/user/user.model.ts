import { Collections } from "../../config/app.collections";
import { DeimosCrudFirestoreModel } from "../../lib/deimos-crud-firestore/deimos-crud-firestore-model";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const userCrudModel = new DeimosCrudFirestoreModel<User>(
  Collections.USER,
  "User"
);
