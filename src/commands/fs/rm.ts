import { Directory } from '@/filesystem/directory';
import { type Command, type Context } from '../command';
import { FileSystemError, findNodeFromPath } from './utils';
import type { INode } from '@/filesystem/inode';
import type { ReadableFileI, WritableFileI } from '@/filesystem/file';

function execute(
  ctx: Context,
  stdin: ReadableFileI,
  stdout: WritableFileI,
  stderr: WritableFileI,
  params: string[],
): Context {
  let recursive: boolean = false;
  if (['-r', '--recursive'].includes(params[0])) {
    recursive = true;
    params.shift();
  }

  if (params.length == 0) {
    stderr.write('Failed: No input param');
    return { ...ctx, last_exit_code: 1 };
  }

  const search: Result<INode, FileSystemError> = findNodeFromPath(ctx.working_directory, params[0]);
  if (!search.success) {
    stderr.write(`Failed: ${search.error.message}`);
    return { ...ctx, last_exit_code: 1 };
  }

  const node_to_delete: INode = search.result;
  if (node_to_delete.isDirectory() && !recursive) {
    stderr.write(`Failed: ${params[0]} is a directory. Use -r to delete.`);
    return { ...ctx, last_exit_code: 1 };
  }

  const parent: INode | null = node_to_delete.getParent();
  if (parent == null) {
    stderr.write(`Failed: Unable to delete root.`);
    return { ...ctx, last_exit_code: 1 };
  }

  try {
    (<Directory>parent).deleteChild(node_to_delete.getName());
    if (ctx.working_directory == node_to_delete) {
      return { ...ctx, working_directory: <Directory>parent, last_exit_code: 0 };
    }
    return { ...ctx, last_exit_code: 0 };
  } catch (e) {
    console.error(e);
    return { ...ctx, last_exit_code: 1 };
  }
}

export const rm: Command = {
  name: 'rm',
  execute,
};
