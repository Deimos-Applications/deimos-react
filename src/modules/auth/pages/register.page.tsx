import { RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppConfig } from "../../../config/app.config";
import { DeimosFirebase } from "../../../lib/deimos-crud-firestore/deimos-firebase";
import { UruFormAdapter } from "../../../lib/deimos-crud/components/forms/uru.model";
import UruForm from "../../../lib/deimos-crud/components/forms/UruForm";
import { DeimosFirebaseAuth } from "../../../lib/deimos-firebase-auth/deimos-firebase-auth";
import { RegisterSchema } from "./register.schema";

interface RegisterPageProps extends RouteComponentProps {}

const registerFields = [
  { name: "email", type: "email", label: "Correo Electrónico" },
  { name: "displayName", type: "text", label: "Nombre Completo" },
  { name: "password", type: "password", label: "Contraseña" },
  { name: "repassword", type: "password", label: "Confirmar Contraseña" },
];

class RegisterAdapter implements UruFormAdapter {
  id = "RegisterAdapter";
  dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  async onProcess(payload: {
    email: string;
    password: string;
    displayName: string;
  }) {
    try {
      const { user } = await DeimosFirebase.auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      if (user) {
        await user.updateProfile({
          displayName: payload.displayName,
          photoURL: AppConfig.DEFAULT_AVATAR,
        });

        toast("Cuenta creada correctamente!", { type: "success" });
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }
}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mx-auto h-full flex justify-center items-center">
      <div className="w-full max-w-xs">
        <img
          src="https://via.placeholder.com/400x150?text=DeimosReact"
          alt=""
        />
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <UruForm
            fields={registerFields}
            validationSchema={RegisterSchema}
            adapter={new RegisterAdapter(dispatch)}
            hideCancelButton={true}
            submitButtonText="Crear cuenta"
            onValidate={(payload) => {
              console.log(payload);

              if (!payload.password && !payload.repassword) {
                toast("Ingresa tu contraseña y confirmala.", { type: "error" });
                return false;
              }

              if (payload.password !== payload.repassword) {
                toast("Tu contraseña no coincide", { type: "error" });
                return false;
              }

              return true;
            }}
            postSubmit={() => {
              navigate("/");
            }}
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

export default RegisterPage;
