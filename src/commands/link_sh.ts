import { type Command } from './command';

function execute(_params: string[]): string {
  return '\\033[redm###################### \\033[yellowmMY LINKS\\033[m ######################\\033[m\n\
\\033[redm+\\033[m \\033[#03978AmLinkedIn\\033[m  \\033[redm:\\033[m [Charly Ginevra](https://www.linkedin.com/in/charly-ginevra-195758178)\n\
\\033[redm+\\033[m \\033[#03978AmGitHub\\033[m    \\033[redm:\\033[m [TheBaronMc](https://github.com/TheBaronMc)\n\
\\033[redm+\\033[m \\033[#03978AmCode Wars\\033[m \\033[redm:\\033[m [TheBaronCarlito](https://www.codewars.com/users/TheBaronCarlito)\n\
\\033[redm+\\033[m \\033[#03978AmE-Mail\\033[m    \\033[redm:\\033[m [cy.ginevra@mail.com](mailto:cy.ginevra@mail.com)\n\
\\033[redm######################################################\\033[m';
}

export const link: Command = {
  name: 'link.sh',
  execute,
};
