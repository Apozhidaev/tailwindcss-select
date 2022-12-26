import type { TreeNode, Option } from "../types";

export function getOptions(nodes: TreeNode[]) {
  const options: Option[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.children) {
      options.push(...getOptions(node.children));
    } else {
      options.push(node);
    }
  }
  return options;
}