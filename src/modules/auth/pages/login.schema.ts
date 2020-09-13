import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("El correo es obligatorio")
    .email("Correo invalido"),
  password: Yup.string().required("La contraseña es obligatoria"),
});
