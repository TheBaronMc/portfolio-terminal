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
    '\\033[redm###################### \\033[yellowmMY LINKS\\033[m ######################\\033[m\n\
\\033[redm+\\033[m \\033[#03978AmLinkedIn\\033[m  \\033[redm:\\033[m [Charly Ginevra](https://www.linkedin.com/in/charly-ginevra-195758178)\n\
\\033[redm+\\033[m \\033[#03978AmGitHub\\033[m    \\033[redm:\\033[m [TheBaronMc](https://github.com/TheBaronMc)\n\
\\033[redm+\\033[m \\033[#03978AmCode Wars\\033[m \\033[redm:\\033[m [TheBaronCarlito](https://www.codewars.com/users/TheBaronCarlito)\n\
\\033[redm+\\033[m \\033[#03978AmE-Mail\\033[m    \\033[redm:\\033[m [cy.ginevra@mail.com](mailto:cy.ginevra@mail.com)\n\
\\033[redm######################################################\\033[m\n',
  );
  return { ...ctx, last_exit_code: 0 };
}

export const link: Command = {
  name: 'link.sh',
  execute,
};
