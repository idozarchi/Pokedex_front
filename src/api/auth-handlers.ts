import { signIn, signUp, confirmSignUp, deleteUser } from "aws-amplify/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export async function handleLogin(
  data: LoginData,
  onSuccess: () => void,
  onError: (message: string) => void
): Promise<void> {
  try {
    const signInResult = await signIn({
      username: data.email.trim(),
      password: data.password,
    });

    if (signInResult.isSignedIn) {
      onSuccess();
    } else {
      let message = `Additional step required: ${signInResult.nextStep.signInStep}`;

      if (signInResult.nextStep.signInStep === "CONFIRM_SIGN_UP") {
        message =
          "Please check your email and confirm your account before logging in.";
      } else if (
        signInResult.nextStep.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        message = "You need to set a new password.";
      }

      onError(message);
    }
  } catch (error: any) {
    console.error("=== LOGIN ERROR DETAILS ===");
    console.error("Full error object:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    let errorMessage = "Login failed";

    if (error.name === "UserNotConfirmedException") {
      errorMessage =
        "Please check your email and confirm your account before logging in.";
    } else if (error.name === "NotAuthorizedException") {
      errorMessage = "Invalid email or password.";
    } else if (error.name === "UserNotFoundException") {
      errorMessage = "No account found with this email. Please sign up first.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    onError(errorMessage);
  }
}

export async function handleSignup(
  data: SignupData,
  onSuccess: () => void,
  onError: (message: string) => void,
  onVerificationRequired?: (
    email: string,
    verifyFn: (code: string) => Promise<void>
  ) => void
): Promise<void> {
  if (data.password !== data.confirmPassword) {
    onError("Passwords do not match");
    return;
  }

  try {
    const signUpResult = await signUp({
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
        },
      },
    });

    console.log("Signup result:", signUpResult);
    sessionStorage.setItem("cognitoUserId", signUpResult.userId || "");

    if (signUpResult.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
      if (onVerificationRequired) {
        const verifyFn = async (code: string): Promise<void> => {
          try {
            await verifyAccount(data.email, code);
            console.log("✅ User confirmed successfully");

            if (signUpResult.userId) {
              try {
                await createUserInDatabase(signUpResult.userId, data.email);
                console.log("✅ User created in database successfully");
              } catch (dbError: any) {
                console.error(
                  "❌ Database creation failed, rolling back Cognito user"
                );

                try {
                  await deleteUser();
                  console.log("✅ Cognito user rolled back successfully");
                } catch (deleteError: any) {
                  console.error(
                    "❌ Failed to rollback Cognito user:",
                    deleteError
                  );
                }

                throw new Error(
                  "Account verification succeeded but profile setup failed. The account has been removed. Please try signing up again."
                );
              }
            }

            onSuccess();
          } catch (error: any) {
            if (error.name === "CodeMismatchException") {
              throw new Error("Invalid verification code. Please try again.");
            } else if (error.message?.includes("profile setup failed")) {
              throw error;
            } else {
              throw new Error(error.message || "Verification failed");
            }
          }
        };

        onVerificationRequired(data.email, verifyFn);
        return;
      } else {
        const verificationCode = prompt(
          "Please check your email and enter the verification code:"
        );

        if (verificationCode) {
          try {
            await confirmSignUp({
              username: data.email,
              confirmationCode: verificationCode.trim(),
            });
            console.log("User confirmed successfully");

            if (signUpResult.userId) {
              try {
                await createUserInDatabase(signUpResult.userId, data.email);
              } catch (dbError: any) {
                console.error(
                  "❌ Database creation failed, rolling back Cognito user"
                );

                try {
                  await deleteUser();
                  console.log("✅ Cognito user rolled back successfully");
                } catch (deleteError: any) {
                  console.error(
                    "❌ Failed to rollback Cognito user:",
                    deleteError
                  );
                }

                onError(
                  "Account verification succeeded but profile setup failed. The account has been removed. Please try signing up again."
                );
                return;
              }
            }
          } catch (confirmError: any) {
            onError(`Verification failed: ${confirmError.message}`);
            return;
          }
        } else {
          onError("Verification code is required to complete signup");
          return;
        }
      }
    }

    if (signUpResult.nextStep?.signUpStep !== "CONFIRM_SIGN_UP") {
      try {
        if (signUpResult.userId) {
          await createUserInDatabase(signUpResult.userId, data.email);
        }

        alert("Signup successful! You can now login.");
        onSuccess();
      } catch (dbError: any) {
        console.error("❌ Database creation failed, rolling back Cognito user");

        try {
          await deleteUser();
          console.log("✅ Cognito user rolled back successfully");
        } catch (deleteError: any) {
          console.error("❌ Failed to rollback Cognito user:", deleteError);
        }

        onError(
          "Account creation succeeded but profile setup failed. The account has been removed. Please try signing up again."
        );
        return;
      }
    }
  } catch (error: any) {
    let errorMessage = "Signup failed";

    if (error.name === "UsernameExistsException") {
      errorMessage =
        "An account with this email already exists. Please login instead.";
    } else if (error.name === "InvalidParameterException") {
      errorMessage = "Invalid email or password format.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    onError(errorMessage);
  }
}

export async function createUserInDatabase(
  userId: string,
  email: string
): Promise<void> {
  const userData = {
    userId,
    userName: email.split("@")[0],
    email,
    ownedPokemons: [25],
    fights: [],
  };
  console.log("Creating user in database with data:", userData);
  console.log("Backend URL:", BACKEND_URL);

  const response = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create user in database: ${response.statusText}`
    );
  }

  console.log("User created in database successfully");
}

export async function verifyAccount(email: string, code: string): Promise<any> {
  try {
    return await confirmSignUp({ username: email, confirmationCode: code });
  } catch (err) {
    throw new Error(`Verification failed: ${err}`);
  }
}
