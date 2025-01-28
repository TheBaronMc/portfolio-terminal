import { File, OpenMode, type ReadableFileI, type WritableFileI } from '@/filesystem/file';
import { type Command, type Context } from '../command';
import { FileSystemError, findFileFromPath } from './utils';

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  stdout: WritableFileI,
  stderr: WritableFileI,
  params: string[],
): Context {
  if (params.length == 0) {
    stderr.write('No file specified, no effect');
    return { ...ctx, last_exit_code: 0 };
  }

  const result: Result<File, FileSystemError> = findFileFromPath(ctx.working_directory, params[0]);
  if (result.success) {
    const file: File = result.result;
    const readable_file: ReadableFileI = <ReadableFileI>file.open(OpenMode.Read);

    readable_file.readLines().forEach((line) => stdout.write(line));

    readable_file.close();

    return { ...ctx, last_exit_code: 0 };
  } else {
    stderr.write(`Failed: ${result.error.message}`);
    return { ...ctx, last_exit_code: 1 };
  }
}

export const cat: Command = {
  name: 'cat',
  execute,
};
