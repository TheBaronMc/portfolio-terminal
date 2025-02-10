import { type Command, type Context } from './command';
import type { ReadableFileI, WritableFileI } from '@/filesystem/file';

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  stdout: WritableFileI,
  _stderr: WritableFileI,
  _params: string[],
): Context {
  stdout.write(
    '\\033[redm######################## \\033[yellowmHELP\\033[m ########################\\033[m\n\
\\033[redm+\\033[m \\033[#03978Ameducation.sh\\033[m     \\033[redm:\\033[m Display my formations\n\
\\033[redm+\\033[m \\033[#03978Amwork.sh\\033[m     \\033[redm:\\033[m Display my work experiences\n\
\\033[redm+\\033[m \\033[#03978Amskill.sh\\033[m     \\033[redm:\\033[m List all my skills\n\
\\033[redm+\\033[m \\033[#03978Amlink.sh\\033[m     \\033[redm:\\033[m List all my links\n\
\\033[redm######################################################\\033[m\n',
  );

  return { ...ctx, last_exit_code: 0 };
}

export const help: Command = {
  name: 'help',
  execute,
};
