import { Directory } from '@/filesystem/directory';
import { INode, NodeExistsError } from '@/filesystem/inode';
import { type Command, type Context } from '../command';
import { findNodeFromPath, type FileSystemError } from './utils';
import type { ReadableFileI, WritableFileI } from '@/filesystem/file';

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  _stdout: WritableFileI,
  stderr: WritableFileI,
  params: string[],
): Context {
  if (params.length != 2) {
    stderr.write('Usage: mv source target');
    return { ...ctx, last_exit_code: 1 };
  }

  const source_path: string = params[0];
  const source_search: Result<INode, FileSystemError> = findNodeFromPath(
    ctx.working_directory,
    source_path,
  );
  if (!source_search.success) {
    stderr.write(`Failed: source ${source_path} doesn't exist`);
    return { ...ctx, last_exit_code: 1 };
  }
  const source: INode = source_search.result;

  const new_name: string = params[1];

  try {
    (<Directory>source).rename(new_name);
  } catch (e) {
    if (e instanceof NodeExistsError) {
      stderr.write(`Failed: ${new_name} already exist`);
    } else {
      console.log(e);
    }
    return { ...ctx, last_exit_code: 1 };
  }

  return { ...ctx, last_exit_code: 0 };
}

export const rename: Command = {
  name: 'rename',
  execute,
};
