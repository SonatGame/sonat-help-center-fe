import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

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
  showError?: boolean;
};

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const HOST = process.env.HOST;

async function getToken() {
  return getAuth(getApp()).currentUser?.getIdToken();
}

function getRefreshToken() {
  return getAuth(getApp()).currentUser?.refreshToken;
}

async function fetchData<T>(config: ApiRequest): Promise<T> {
  const token = await getToken();
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

      if (config.showError) {
        return { ...responseData, error: "Error" } as T;
      }

      return responseData as T;
    }
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("text/html")) return (await response.text()) as T;
    if (contentType?.includes("application/pdf"))
      return (await response.blob()) as T;
    const body = config.isEmpty ? response : await response.json();
    return body as T;
  } catch (error) {
    return { ...(error as Error), error: (error as Error)?.message } as T;
  }
}

async function fetchOne<T>({
  functionName,
  url,
  method,
  hasSuccessfulMsg,
  hasErrorMsg,
  body,
  params,
  isEmpty,
  showError,
}: {
  functionName: string;
  url: string;
  method: string;
  hasSuccessfulMsg?: boolean;
  hasErrorMsg?: boolean;
  body?: Record<string, any>;
  params?: Record<string, any>;
  isEmpty?: boolean;
  showError?: boolean;
}): Promise<T> {
  const result = await fetchData<ApiResponse<T>>({
    url,
    method,
    body,
    params,
    isEmpty,
    showError,
  });
  if (
    hasErrorMsg &&
    (result?.error || (result?.statusCode && result?.statusCode >= 400))
  ) {
    toast.error(`${functionName} thất bại`);
    return undefined as T;
  }
  if (hasSuccessfulMsg && !result?.error) {
    toast.success(`${functionName} thành công`);
  }
  return result;
}

async function fetchList<T>({
  functionName,
  url,
  method,
  hasSuccessfulMsg,
  hasErrorMsg,
  body,
  params,
  showError,
}: {
  functionName: string;
  url: string;
  method: string;
  hasSuccessfulMsg?: boolean;
  hasErrorMsg?: boolean;
  body?: Record<string, any>;
  params?: Record<string, any>;
  showError?: boolean;
}): Promise<T[]> {
  const result = await fetchData<ApiResponse<T[]>>({
    url,
    method,
    body,
    params,
    showError,
  });

  if (
    hasErrorMsg &&
    (result?.error || (result?.statusCode && result?.statusCode >= 400))
  ) {
    {
      toast.error(`${functionName} thất bại`);
    }
    return undefined as unknown as T[];
  } else if (hasSuccessfulMsg && !result?.error) {
    toast.success(`${functionName} thành công`);
  }
  if (!Array.isArray(result)) return [] as T[];
  else return result as T[];
}

async function fetchFormData<T>(config: ApiRequest): Promise<T> {
  const token = await getToken();
  const myHeaders = new Headers();
  const url = new URL(config.url);
  const formData = new FormData();

  const appendParams = (params: Record<string, any>) => {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== undefined && v !== null)
            url.searchParams.append(key, v.toString());
        });
      } else if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
  };

  const appendFormData = (body: Record<string, any>) => {
    Object.entries(body).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.every((item) => item instanceof File)) {
          value.forEach((file) => formData.append(key, file));
        } else {
          value.forEach((v) => {
            if (v !== undefined && v !== null)
              formData.append(key, v.toString());
          });
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  };

  if (config.params) {
    appendParams(config.params);
  }

  if (config.body) {
    appendFormData(config.body);
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: config.method,
    mode: "cors",
    body: formData,
    headers: myHeaders,
  };

  try {
    const response = await fetch(url.toString(), requestOptions);

    if (!response.ok) {
      try {
        const responseData = await response.json();
        if (config.showError) {
          return { ...responseData, error: "Error" } as T;
        }
        return responseData as T;
      } catch {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
    }

    return config.isEmpty ? (response as unknown as T) : await response.json();
  } catch (error) {
    return { ...(error as Error), error: (error as Error).message } as T;
  }
}

async function fetchOneFormData<T>({
  functionName,
  url,
  method,
  hasSuccessfulMsg,
  hasErrorMsg,
  body,
  params,
  showError,
}: {
  functionName: string;
  url: string;
  method: string;
  hasSuccessfulMsg?: boolean;
  hasErrorMsg?: boolean;
  body?: Record<string, any>;
  params?: Record<string, any>;
  showError?: boolean;
}): Promise<T> {
  const result = await fetchFormData<ApiResponse<T[]>>({
    url,
    method,
    body,
    params,
    showError,
  });
  if (
    hasErrorMsg &&
    (result?.error || (result?.statusCode && result?.statusCode >= 400))
  ) {
    {
      toast.error(`${functionName} thất bại`);
    }
    return undefined as unknown as T;
  } else if (hasSuccessfulMsg && !result?.error) {
    toast.success(`${functionName} thành công`);
  }
  return result as T;
}

export const ApiUtils = {
  METHOD,
  HOST,
  getToken,
  getRefreshToken,
  fetchData,
  fetchOne,
  fetchList,
  fetchFormData,
  fetchOneFormData,
};
