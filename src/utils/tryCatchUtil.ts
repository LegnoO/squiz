import { AxiosError, isAxiosError } from "axios";

type CustomError = Error | AxiosError;


export function tryCatchSync<T>(
  callback: () => T,
  errorHandler?: (error: Error) => void,
): [Error | null, T | null] {
  try {
    const result = callback();
    return [null, result];
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }

    if (errorHandler) {
      errorHandler(error as Error);
    }
    return [error as Error, null];
  }
}


export async function tryCatchAsync<T>(
  callback: () => Promise<T>,
  errorHandler?: (error: CustomError) => void,
): Promise<[CustomError | null, T | null]> {
  try {
    const result = await callback();
    return [null, result];
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    if (errorHandler) {
      errorHandler(error as CustomError);
    }
    return [error as CustomError, null];
  }
}


