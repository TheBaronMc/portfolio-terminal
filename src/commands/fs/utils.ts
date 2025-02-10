import { Directory } from '@/filesystem/directory';
import { File } from '@/filesystem/file';
import { INode } from '@/filesystem/inode';

export class FileSystemError extends Error {}

export class FileNotFoundError extends FileSystemError {}

export class IsFileError extends FileSystemError {}

export const PREVIOUS_DIRECTORY_NAME: string = '..';
export const CURRENT_DIRECTORY_NAME: string = '.';

export function findNodeFromPath(
  starting_node: INode,
  path: string,
): Result<INode, FileSystemError> {
  function findNodeFromPathAux(
    current_node: INode | null,
    paths: string[],
  ): Result<INode, FileSystemError> {
    if (current_node == null) {
      return {
        success: false,
        error: new FileSystemError(`${path} doesn't exist`),
      };
    }

    if (paths.length == 0) {
      return { success: true, result: current_node };
    }

    const node_to_find: string = paths[0];

    if (node_to_find == PREVIOUS_DIRECTORY_NAME) {
      return findNodeFromPathAux(current_node.getParent(), paths.slice(1));
    } else if (node_to_find == CURRENT_DIRECTORY_NAME) {
      return findNodeFromPathAux(current_node, paths.slice(1));
    }

    if (!current_node.isDirectory()) {
      return {
        success: false,
        error: new FileSystemError(`${node_to_find} is not a directory`),
      };
    }

    const childs: INode[] | null = (<Directory>current_node).child_list;
    if (!childs) {
      return {
        success: false,
        error: new FileSystemError(`${path} doesn't exist`),
      };
    }

    const node: INode | undefined = childs.find((child) => child.getName() == node_to_find);
    if (!node) {
      return {
        success: false,
        error: new FileNotFoundError(`No directory named ${node_to_find}`),
      };
    }

    return findNodeFromPathAux(node, paths.slice(1));
  }
  if (path.startsWith('/')) {
    // Absolute path
    const root: INode = getRoot(starting_node);
    const remaining_path: string = path.slice(1);
    return remaining_path
      ? findNodeFromPathAux(root, remaining_path.split('/'))
      : { success: true, result: root };
  }
  // Relative path
  return findNodeFromPathAux(starting_node, path.split('/'));
}

export function findDirFromPath(
  current_directory: Directory,
  path: string,
): Result<Directory, FileSystemError> {
  const search: Result<INode, FileSystemError> = findNodeFromPath(current_directory, path);
  if (!search.success) return search;

  const node: INode = search.result;
  if (!node.isDirectory())
    return { success: false, error: new FileSystemError(`${node.getName()} is not a directory`) };

  return { success: true, result: <Directory>node };
}

export function findFileFromPath(
  current_directory: Directory,
  path: string,
): Result<File, FileSystemError> {
  const search: Result<INode, FileSystemError> = findNodeFromPath(current_directory, path);
  if (!search.success) return search;

  const node: INode = search.result;
  if (!node.isFile())
    return { success: false, error: new FileSystemError(`${node.getName()} is not a file`) };

  return { success: true, result: <File>node };
}

export function getRoot(node: INode): INode {
  const parent: INode | null = node.getParent();
  return parent ? getRoot(parent) : node;
}
