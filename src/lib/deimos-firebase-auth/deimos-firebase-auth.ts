import { toast } from "react-toastify";
import { collection, get, onGet, upset } from "typesaurus";
import { Collections } from "../../config/app.collections";
import { UserAuth } from "../../modules/auth/models/userAuth.model";
import { User } from "../../modules/user/user.model";
import { DeimosFirebase } from "../deimos-crud-firestore/deimos-firebase";

export class DeimosFirebaseAuth {
  public static collectionRef = collection<User>(Collections.USER);

  public static initSync(
    onUserChange: (user: firebase.User) => void,
    onNoUser: () => void
  ) {
    DeimosFirebase.auth.onAuthStateChanged((user) => {
      if (user) {
        onGet(collection(Collections.USER), user.uid, (userDoc) => {
          if (userDoc && userDoc.data) {
            onUserChange(userDoc.data as any);
          }
        });

        onUserChange(user);
      } else {
        onNoUser();
      }
    });
  }

  public static async onLogin(payload: UserAuth): Promise<User | null> {
    try {
      await upset(this.collectionRef, payload.uid as string, payload as any);
      const userData = await get(this.collectionRef, payload.uid as string);
      return userData?.data as User;
    } catch (error) {
      toast("Ocurrión un error al guardar tu información de sesión...", {
        type: "error",
      });

      return null;
    }
  }
}
