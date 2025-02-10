import { File, type ReadableFileI, type WritableFileI } from '@/filesystem/file';
import { Directory } from '@/filesystem/directory';
import { INode, NodeExistsError } from '@/filesystem/inode';
import { type Command, type Context } from '../command';
import { findNodeFromPath, type FileSystemError } from './utils';

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

  const target_path: string = params[1];
  const target_search: Result<INode, FileSystemError> = findNodeFromPath(
    ctx.working_directory,
    target_path,
  );
  if (!target_search.success) {
    stderr.write(`Failed: target ${target_path} doesn't exist`);
    return { ...ctx, last_exit_code: 1 };
  }
  const target: INode = target_search.result;

  if (target.isFile()) {
    stderr.write(`Failed: ${source_path} is a file`);
    return { ...ctx, last_exit_code: 1 };
  }

  try {
    (<Directory>target).add(<Directory | File>source);
  } catch (e) {
    if (e instanceof NodeExistsError) {
      stderr.write(`Failed: ${target_path}/${source.getName()} already exist`);
    } else {
      console.log(e);
    }
    return { ...ctx, last_exit_code: 1 };
  }

  return { ...ctx, last_exit_code: 0 };
}

export const mv: Command = {
  name: 'mv',
  execute,
};
