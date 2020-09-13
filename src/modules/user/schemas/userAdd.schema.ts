import * as Yup from "yup";

export const UserAddSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  // age: Yup.number().required(),
  // email: Yup.string()
  //   .required("El correo es obligatorio")
  //   .email("Correo invalido"),
  // phone: Yup.string().notRequired(),
  // cp: Yup.string().notRequired(),
  // state: Yup.string().notRequired(),
  // password: Yup.string().required("La contrasena es obligatoria"),
  // repassword: Yup.string().required("La confirmacion es obligatoria"),
});
