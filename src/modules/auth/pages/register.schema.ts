import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required("El correo es obligatorio")
    .email("Correo invalido"),
  displayName: Yup.string().required("El nombre es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  repassword: Yup.string().required("Ingresa de nuevo tu contraseña"),
});
