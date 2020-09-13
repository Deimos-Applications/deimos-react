export class EnvService {
  public static getEnvVariable(key: string) {
    return process.env[`REACT_APP_${key}`];
  }
}
