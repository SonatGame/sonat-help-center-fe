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

export function getChildById(tree: Resource[], id?: string): Resource | null {
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

  parents.reverse();

  if (idToNodeMap[childId]) parents.push(idToNodeMap[childId]);
  return parents;
}

export function deleteItemAndChildren(data: Resource[], idToDelete: string) {
  const parentMap: Record<string, string[]> = data.reduce((acc, item) => {
    const parentId = item.parent;
    if (!parentId) return acc;
    if (!acc[parentId]) acc[parentId] = [];
    acc[parentId].push(item._id);
    return acc;
  }, {} as Record<string, string[]>);

  const itemsToDelete = new Set<string>([idToDelete]);
  const queue = [idToDelete];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = parentMap[currentId] || [];
    for (const childId of children) {
      if (!itemsToDelete.has(childId)) {
        itemsToDelete.add(childId);
        queue.push(childId);
      }
    }
  }

  return data.filter((item) => !itemsToDelete.has(item._id));
}
