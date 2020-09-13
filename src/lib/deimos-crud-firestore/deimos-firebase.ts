import * as firebase from "firebase/app";

// Firebase Modules
import "firebase/auth";
import "firebase/firestore";
import { EnvService } from "../env.service";

const FIREBASE_ENV_PREFIX = "FIREBASE_";

export class DeimosFirebase {
  public static db: firebase.firestore.Firestore;
  public static auth: firebase.auth.Auth;

  static readonly firebaseConfig = {
    apiKey: EnvService.getEnvVariable(`${FIREBASE_ENV_PREFIX}apiKey`),
    authDomain: EnvService.getEnvVariable(`${FIREBASE_ENV_PREFIX}authDomain`),
    databaseURL: EnvService.getEnvVariable(`${FIREBASE_ENV_PREFIX}databaseURL`),
    projectId: EnvService.getEnvVariable(`${FIREBASE_ENV_PREFIX}projectId`),
    storageBucket: EnvService.getEnvVariable(
      `${FIREBASE_ENV_PREFIX}storageBucket`
    ),
    messagingSenderId: EnvService.getEnvVariable(
      `${FIREBASE_ENV_PREFIX}messagingSenderId`
    ),
    appID: EnvService.getEnvVariable(`${FIREBASE_ENV_PREFIX}appID`),
  };

  static initialize() {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Initializing DeimosFirebase configuration`,
        DeimosFirebase.firebaseConfig
      );
    }
    firebase.initializeApp(DeimosFirebase.firebaseConfig);

    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }
}
