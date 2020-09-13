import { RouteComponentProps, useNavigate } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppConfig } from "../../../config/app.config";
import { DeimosFirebase } from "../../../lib/deimos-crud-firestore/deimos-firebase";
import { UruFormAdapter } from "../../../lib/deimos-crud/components/forms/uru.model";
import UruForm from "../../../lib/deimos-crud/components/forms/UruForm";
import { DeimosFirebaseAuth } from "../../../lib/deimos-firebase-auth/deimos-firebase-auth";
import DeimosButton, {
  DeimosButtonVariant,
} from "../../../lib/deimos-ui/components/deimos-button/DeimosButton";
import {
  loggedInSelector,
  setLoggedIn,
  setUserAuth,
  updateUserAuth,
} from "../auth.slice";
import { LoginSchema } from "./login.schema";

interface LoginPageProps extends RouteComponentProps {}

const loginFields = [
  { name: "email", type: "email", label: "Correo Electrónico" },
  { name: "password", type: "password", label: "Contraseña" },
];

class LoginAdapter implements UruFormAdapter {
  id = "LoginAdapter";
  dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  async onProcess(payload: { email: string; password: string }) {
    try {
      const { user } = await DeimosFirebase.auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );

      const formattedUserAuth = {
        uid: user?.uid ?? "",
        email: user?.email ?? "",
        displayName: user?.displayName ?? "",
        emailVerified: user?.emailVerified ?? false,
        photoURL:
          user?.photoURL ?? "https://via.placeholder.com/150?text=Avatar",
      };

      const userDataFromFirestore = await DeimosFirebaseAuth.onLogin(
        formattedUserAuth
      );

      if (user) {
        this.dispatch(setLoggedIn(true));
        this.dispatch(setUserAuth(formattedUserAuth));

        if (!!userDataFromFirestore) {
          this.dispatch(updateUserAuth(userDataFromFirestore));
        }

        toast(`Bienvenido ${user.displayName}!`, { type: "success" });
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(loggedInSelector);

  useEffect(() => {
    if (loggedIn === true) {
      navigate("/home");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="container mx-auto mx-auto h-full flex justify-center items-center">
      <div className="w-full max-w-sm">
        <img
          src="https://via.placeholder.com/400x150?text=DeimosReact"
          alt=""
        />
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <UruForm
            fields={loginFields}
            validationSchema={LoginSchema}
            adapter={new LoginAdapter(dispatch)}
            hideCancelButton={true}
            submitButtonText="Iniciar Sesión"
            actions={
              <DeimosButton
                variant={DeimosButtonVariant.Link}
                onClick={() => navigate("/register")}
              >
                Crear cuenta
              </DeimosButton>
            }
          ></UruForm>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;{new Date().getFullYear()} {AppConfig.APP_NAME}. Todo los
          derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
