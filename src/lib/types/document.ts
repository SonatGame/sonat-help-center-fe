export enum ResourseType {
  folder = "folder",
  document = "document",
}

export type Collection = {
  title: string;
  description: string;
  thumbnail: string;
  sharedUsers: string[];
  _id: string;
  __v: number;
};

export type Resource = {
  _id: string;
  title: string;
  resourceCollection: string;
  type: ResourseType;
  googleDocUrl?: string;
  parent?: string;
  children?: Resource[];
};
