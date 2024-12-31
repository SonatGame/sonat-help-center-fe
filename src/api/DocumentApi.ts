import { Collection, Resource, ResourseType } from "@/lib/types/document";
import { ApiUtils } from "./ApiUtils";

const { HOST, METHOD, fetchList, fetchOne, fetchOneFormData } = ApiUtils;

async function getCollectionList(params: { title?: string }) {
  return await fetchList<Collection>({
    functionName: "Lấy danh sách tài liệu",
    url: HOST + "resource/collection",
    method: METHOD.GET,
    params,
  });
}

async function createCollection(data: {
  title: string;
  description: string;
  sharedUsers: string[];
  thumbnail: File;
}) {
  return fetchOneFormData<Collection>({
    functionName: "Tạo bộ tài liệu",
    url: HOST + "resource/collection",
    method: METHOD.POST,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function updateCollection(
  resourceId: string,
  data: {
    title: string;
    description: string;
    sharedUsers: string[];
    thumbnail: File;
  }
) {
  return fetchOneFormData<Collection>({
    functionName: "Cập nhật tài liệu",
    url: HOST + "resource/collection/" + resourceId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function deleteCollection(collectionId: string) {
  return fetchOne({
    functionName: "Xóa tài liệu",
    url: HOST + "resource/collection/" + collectionId,
    method: METHOD.DELETE,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
  });
}

async function getResourcesOfCollection(params?: {
  collection: string;
  title?: string;
}) {
  return await fetchList<Resource>({
    functionName: "Lấy danh sách thư mục",
    url: HOST + "resource",
    method: METHOD.GET,
    params,
  });
}

async function createResourceInCollection(
  collectionId: string,
  data: {
    title: string;
    googleDocUrl?: string;
    type: ResourseType;
  }
) {
  return fetchOne<Resource>({
    functionName:
      data.type === ResourseType.document ? "Tạo tài liệu" : "Tạo thư mục",
    url: HOST + "resource/collection/" + collectionId,
    method: METHOD.POST,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function getResourcesOfResource(resourceId: string) {
  return await fetchList<Resource>({
    functionName: "Lấy danh sách thư mục",
    url: HOST + "resource",
    method: METHOD.GET,
  });
}

async function createResourceInResource(
  resourceId: string,
  data: {
    title: string;
    googleDocUrl?: string;
    type: ResourseType;
  }
) {
  return fetchOne<Resource>({
    functionName:
      data.type === ResourseType.document ? "Tạo tài liệu" : "Tạo thư mục",
    url: HOST + `resource/${resourceId}/children`,
    method: METHOD.POST,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function deleteResource(resourceId: string) {
  return fetchOne({
    functionName: "Xóa tài liệu",
    url: HOST + "resource/" + resourceId,
    method: METHOD.DELETE,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
  });
}

async function updateResource(
  resourceId: string,
  data: {
    title?: string;
    googleDocUrl?: string;
  }
) {
  return fetchOne<Resource>({
    functionName: "Cập nhật",
    url: HOST + "resource/" + resourceId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

export const DocumentApi = {
  getCollectionList,
  createCollection,
  updateCollection,
  deleteCollection,
  getResourcesOfCollection,
  getResourcesOfResource,
  createResourceInCollection,
  createResourceInResource,
  deleteResource,
  updateResource,
};
