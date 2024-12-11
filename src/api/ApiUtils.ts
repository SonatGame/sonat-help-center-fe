import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { enqueueSnackbar } from "notistack";

export namespace ApiUtils {
  const autoHideDuration = 4000;

  export const METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
  };

  export const HOST = process.env.HOST;

  export async function getToken() {
    return getAuth(getApp()).currentUser?.getIdToken();
  }

  export function getRefreshToken() {
    return getAuth(getApp()).currentUser?.refreshToken;
  }

  export type ApiResponse<T> = T & {
    message?: string;
    error?: string;
    statusCode?: number;
  };

  export type ApiRequest = {
    url: string;
    method: string;
    body?: Record<string, any>;
    params?: Record<string, any>;
    isEmpty?: boolean;
    isShowError?: boolean;
  };

  export async function fetchData<T>(config: ApiRequest): Promise<T> {
    const token = await ApiUtils.getToken();
    const url = new URL(config.url);

    if (config.params) {
      Object.entries(config.params).forEach((entry) => {
        if (Array.isArray(entry[1])) {
          entry[1].forEach((value) => {
            if (value !== undefined && value !== null)
              url.searchParams.append(entry[0], value.toString());
          });
        } else {
          if (entry[1] !== undefined && entry[1] !== null)
            url.searchParams.append(entry[0], entry[1].toString());
        }
      });
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: config.method,
      mode: "cors",
      body: JSON.stringify(config.body),
      headers: myHeaders,
    } as any;

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const responseData = await response.json();

        if (config.isShowError) {
          return { ...responseData, error: "Error" } as T;
        }

        return responseData as T;
      }
      const body = config.isEmpty ? response : await response.json();
      return body as T;
    } catch (error) {
      return { ...(error as Error), error: (error as Error)?.message } as T;
    }
  }

  export async function fetchOne<T>({
    functionName,
    url,
    method,
    hasSuccessfulMsg,
    hasErrorMsg,
    body,
    params,
    isEmpty,
    isShowError,
  }: {
    functionName: string;
    url: string;
    method: string;
    hasSuccessfulMsg: boolean;
    hasErrorMsg: boolean;
    body?: Record<string, any>;
    params?: Record<string, any>;
    isEmpty?: boolean;
    isShowError?: boolean;
  }): Promise<T> {
    const result = await fetchData<ApiResponse<T>>({
      url,
      method,
      body,
      params,
      isEmpty,
      isShowError,
    });
    if (
      hasErrorMsg &&
      (result?.error || (result?.statusCode && result?.statusCode >= 400))
    ) {
      enqueueSnackbar(
        `${functionName} failed${result.message ? `: ${result.message}` : ""}`,
        {
          variant: "error",
          autoHideDuration: autoHideDuration,
        }
      );
      return undefined as T;
    }
    if (hasSuccessfulMsg && !result?.error) {
      enqueueSnackbar(`${functionName} successfully.`, {
        variant: "success",
        autoHideDuration: autoHideDuration,
      });
    }
    return result;
  }

  export async function fetchList<T>({
    functionName,
    url,
    method,
    hasSuccessfulMsg,
    hasErrorMsg,
    body,
    params,
    isShowError,
  }: {
    functionName: string;
    url: string;
    method: string;
    hasSuccessfulMsg: boolean;
    hasErrorMsg: boolean;
    body?: Record<string, any>;
    params?: Record<string, any>;
    isShowError?: boolean;
  }): Promise<T[]> {
    const result = await fetchData<ApiResponse<T[]>>({
      url,
      method,
      body,
      params,
      isShowError,
    });

    if (
      hasErrorMsg &&
      (result?.error || (result?.statusCode && result?.statusCode >= 400))
    ) {
      {
        enqueueSnackbar(
          `${functionName} failed${
            result.message ? `: ${result.message}` : ""
          }`,
          {
            variant: "error",
            autoHideDuration: autoHideDuration,
          }
        );
      }
      return undefined as unknown as T[];
    } else if (hasSuccessfulMsg && !result?.error) {
      enqueueSnackbar(`${functionName} successfully.`, {
        variant: "success",
        autoHideDuration: autoHideDuration,
      });
    }
    if (!Array.isArray(result)) return [] as T[];
    else return result as T[];
  }

  export async function fetchFormData<T>(config: ApiRequest): Promise<T> {
    const token = await ApiUtils.getToken();
    const myHeaders = new Headers();
    const url = new URL(config.url);

    if (config.params) {
      Object.entries(config.params).forEach((entry) => {
        if (Array.isArray(entry[1])) {
          entry[1].forEach((value) => {
            if (value !== undefined && value !== null)
              url.searchParams.append(entry[0], value.toString());
          });
        } else {
          if (entry[1] !== undefined && entry[1] !== null)
            url.searchParams.append(entry[0], entry[1].toString());
        }
      });
    }

    myHeaders.append("Authorization", `Bearer ${token}`);
    // myHeaders.append("Content-Type", "multipart/form-data");

    const requestOptions = {
      method: config.method,
      mode: "cors",
      body: config.body,
      headers: myHeaders,
    } as any;

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const responseData = await response.json();

        if (config.isShowError) {
          return { ...responseData, error: "Error" } as T;
        }

        return responseData as T;
      }
      const body = config.isEmpty ? response : await response.json();
      return body as T;
    } catch (error) {
      return { ...(error as Error), error: (error as Error)?.message } as T;
    }
  }

  export async function fetchListFormData<T>({
    functionName,
    url,
    method,
    hasSuccessfulMsg,
    hasErrorMsg,
    body,
    params,
    isShowError,
  }: {
    functionName: string;
    url: string;
    method: string;
    hasSuccessfulMsg: boolean;
    hasErrorMsg: boolean;
    body?: Record<string, any>;
    params?: Record<string, any>;
    isShowError?: boolean;
  }): Promise<T[]> {
    const result = await fetchFormData<ApiResponse<T[]>>({
      url,
      method,
      body,
      params,
      isShowError,
    });
    if (
      hasErrorMsg &&
      (result?.error || (result?.statusCode && result?.statusCode >= 400))
    ) {
      {
        enqueueSnackbar(
          `${functionName} failed${
            result.message ? `: ${result.message}` : ""
          }`,
          {
            variant: "error",
            autoHideDuration: autoHideDuration,
          }
        );
      }
      return undefined as unknown as T[];
    } else if (hasSuccessfulMsg && !result?.error) {
      enqueueSnackbar(`${functionName} successfully.`, {
        variant: "success",
        autoHideDuration: autoHideDuration,
      });
    }
    if (!Array.isArray(result)) return [] as T[];
    else return result as T[];
  }

  export async function fetchOneFormData<T>(
    functionName: string,
    url: string,
    method: string,
    hasSuccessfulMsg: boolean,
    hasErrorMsg: boolean,
    body?: Record<string, any>,
    params?: Record<string, any>,
    isShowError?: boolean
  ): Promise<T> {
    const result = await fetchFormData<ApiResponse<T[]>>({
      url,
      method,
      body,
      params,
      isShowError,
    });
    if (
      hasErrorMsg &&
      (result?.error || (result?.statusCode && result?.statusCode >= 400))
    ) {
      {
        enqueueSnackbar(
          `${functionName} failed${
            result.message ? `: ${result.message}` : ""
          }`,
          {
            variant: "error",
            autoHideDuration: autoHideDuration,
          }
        );
      }
      return undefined as unknown as T;
    } else if (hasSuccessfulMsg && !result?.error) {
      enqueueSnackbar(`${functionName} successfully.`, {
        variant: "success",
        autoHideDuration: autoHideDuration,
      });
    }
    return result as T;
  }
}
