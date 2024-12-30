import { Resource } from "@/lib/types/document";

export function convertResourcesToTree(data: Resource[]): Resource[] {
  const idToNodeMap: Record<string, Resource> = {};
  const tree: Resource[] = [];

  data.forEach((item) => {
    idToNodeMap[item._id] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.parent) {
      const parentNode = idToNodeMap[item.parent];
      if (parentNode) {
        parentNode.children?.push(idToNodeMap[item._id]);
      }
    } else {
      tree.push(idToNodeMap[item._id]);
    }
  });

  return tree;
}

export function getParentList(data: Resource[], childId: string): Resource[] {
  const idToNodeMap: Record<string, Resource> = {};
  const parents: Resource[] = [];

  data.forEach((item) => {
    idToNodeMap[item._id] = item;
  });

  let currentNode = idToNodeMap[childId];
  while (currentNode && currentNode.parent) {
    const parentNode = idToNodeMap[currentNode.parent];
    if (parentNode) {
      parents.push(parentNode);
    }
    currentNode = parentNode;
  }

  parents.reverse().push(idToNodeMap[childId]);
  return parents;
}

export function updateResource(
  data: Resource[],
  childId: string,
  newData: Resource
): Resource[] {
  const temp = [...data];
  for (let item of data) {
    if (item._id === childId) {
      item = { ...newData };
      break;
    }
  }
  return temp;
}
