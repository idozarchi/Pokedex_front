import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

/**
 * Gets the access token for authenticated API requests
 * @returns The access token string or undefined if not authenticated
 */
export async function getAccessToken(): Promise<string | undefined> {
  try {
    // Verify user is authenticated
    await getCurrentUser();
    const session = await fetchAuthSession();

    return session.tokens?.accessToken?.toString();
  } catch (error) {
    console.error("Error getting access token:", error);
    return undefined;
  }
}

/**
 * Simple helper to get auth headers for fetch requests
 * @param additionalHeaders Optional additional headers to include
 * @returns Headers object or undefined
 */
export async function getAuthHeaders(
  additionalHeaders?: Record<string, string>
): Promise<Record<string, string> | undefined> {
  const token = await getAccessToken();
  const headers: Record<string, string> = {
    ...additionalHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return Object.keys(headers).length > 0 ? headers : undefined;
}
