import { Directory } from '@/filesystem/directory';
import { NodeExistsError } from '@/filesystem/inode';
import { type Command, type Context } from '../command';
import type { ReadableFileI, WritableFileI } from '@/filesystem/file';

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  _stdout: WritableFileI,
  stderr: WritableFileI,
  params: string[],
): Context {
  if (params.length == 0) {
    stderr.write('No named specified');
    return { ...ctx, last_exit_code: 1 };
  }

  const name: string = params[0];

  try {
    const directory: Directory = new Directory(name, []);
    ctx.working_directory.add(directory);
  } catch (e) {
    if (e instanceof NodeExistsError) {
      stderr.write(`Failed: ${name} already exists`);
    }
    return { ...ctx, last_exit_code: 1 };
  }

  return { ...ctx, last_exit_code: 0 };
}

export const mkdir: Command = {
  name: 'mkdir',
  execute,
};
