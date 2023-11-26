interface CustomProcessEnv {
  readonly APP_NAME: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CustomProcessEnv {}
  }
}

export {};
