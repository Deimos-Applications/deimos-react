import React, { useEffect } from "react";
import "./App.scss";
import AppRouter from "./app.router";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loggedInSelector,
  setLoggedIn,
  setUserAuth,
  updateUserAuth,
  userSelector,
} from "./modules/auth/auth.slice";
import JSONPretty from "react-json-pretty";
import { DeimosFirebaseAuth } from "./lib/deimos-firebase-auth/deimos-firebase-auth";
import { collection, get } from "typesaurus";
import { Collections } from "./config/app.collections";
import DeimosButton, {
  DeimosButtonVariant,
} from "./lib/deimos-ui/components/deimos-button/DeimosButton";
import { DeimosFirebase } from "./lib/deimos-crud-firestore/deimos-firebase";

function App() {
  const dispatch = useDispatch();

  const loggedIn = useSelector(loggedInSelector);
  const userAuth = useSelector(userSelector);

  useEffect(() => {
    DeimosFirebaseAuth.initSync(
      async (user) => {
        try {
          const userData = await get(collection(Collections.USER), user.uid);

          if (userData && userData.data) {
            dispatch(updateUserAuth(userData.data as any));
            dispatch(setLoggedIn(true));
          }
        } catch (error) {
          console.log(error);

          toast(
            "Ocurrió un error al sincronizar tus datos de inicio de sesión",
            { type: "error" }
          );
        }
      },
      () => {
        dispatch([setLoggedIn(false), setUserAuth(null)]);
      }
    );
  }, []);

  const logout = async () => {
    try {
      await DeimosFirebase.auth.signOut();
      dispatch(setLoggedIn(false));
      dispatch(setUserAuth(null));
      window.location.href = "/";
    } catch (error) {
      toast("Ocurrió un error al cerrar tu sesión...");
    }
  };

  return (
    <div className="deimos-react bg-grey-lighter">
      <header className="flex flex-col flex-center">
        <a
          href="https://github.com/Deimos-Applications/deimos-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deimos React
        </a>
        {loggedIn && (
          <DeimosButton variant={DeimosButtonVariant.Light} onClick={logout}>
            Logout
          </DeimosButton>
        )}
        <JSONPretty
          data={{
            loggedIn,
            userAuth,
          }}
        ></JSONPretty>
      </header>
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
