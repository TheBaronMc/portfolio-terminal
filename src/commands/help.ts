import { type Command } from './command';

function execute(_params: string[]): string {
  return '\\033[redm######################## \\033[yellowmHELP\\033[m ########################\\033[m\n\
\\033[redm+\\033[m \\033[#03978Amlink.sh\\033[m     \\033[redm:\\033[m List all my links\n\
\\033[redm######################################################\\033[m';
}

export const help: Command = {
  name: 'help',
  execute,
};
