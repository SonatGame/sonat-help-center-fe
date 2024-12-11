import { ITreeviewOption } from "./types";

export const findItemPathById = (
  items: ITreeviewOption[],
  _id: string,
  path: string[] = []
): string[] | null => {
  for (const item of items) {
    const currentPath = [...path, item.name];
    if (item._id === _id) {
      return currentPath;
    }
    if (item.children) {
      const found: string[] | null = findItemPathById(
        item.children,
        _id,
        currentPath
      );
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const flattenTree = (topics: ITreeviewOption[]): ITreeviewOption[] => {
  const result: ITreeviewOption[] = [];

  const flatten = (topic: ITreeviewOption) => {
    result.push({
      id: topic._id,
      name: topic.name,
      children: [],
      _id: topic._id,
    });

    if (topic.children && topic.children.length > 0) {
      topic.children.forEach(flatten);
    }
  };

  topics.forEach(flatten);
  return result;
};

export const searchTree = (
  options: ITreeviewOption[],
  query: string
): ITreeviewOption[] => {
  return options
    .map((option) => {
      const children = searchTree(option.children, query);
      if (
        option.name.toLowerCase().includes(query.toLowerCase()) ||
        children.length > 0
      ) {
        return { ...option, children };
      }
      return null;
    })
    .filter((option) => option !== null) as ITreeviewOption[];
};
