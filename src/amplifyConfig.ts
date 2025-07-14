import { Amplify } from "aws-amplify";
import type { ResourcesConfig } from "@aws-amplify/core";

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      loginWith: {
        email: true,
        username: false,
        phone: false,
      },
    },
  },
};

Amplify.configure(amplifyConfig);
