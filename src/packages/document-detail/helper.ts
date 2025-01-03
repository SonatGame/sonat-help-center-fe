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

export function getChildById(tree: Resource[], id: string): Resource | null {
  function findNode(nodes: Resource[]): Resource | null {
    for (const node of nodes) {
      if (node._id === id) {
        return node;
      }
      const foundInChildren = findNode(node.children || []);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
    return null;
  }

  return findNode(tree);
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
