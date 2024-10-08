import { write } from '@/utils/io';
import { type Command } from './command';

function execute(stdout: WritableStream, _params: string[]): number {
  write(
    '\n\
   \\033[#2D3347m%%%%%        %%%%       %%%%%%%%              %%         \\033[m\n\
   \\033[#2D3347m%%%%%        %%%%    %%%%%%%%%%%%            %%%%        \\033[m   \\033[#E6A439mName\\033[m     \\033[redm:\\033[m [Université Grenoble Alpes](https://www.univ-grenoble-alpes.fr/)\n\
   \\033[#2D3347m%%%%%        %%%%   %%%%%%    %             %%%%%%       \\033[m   \\033[#E6A439mDiploma\\033[m  \\033[redm:\\033[m DUT Computer Network & Telecoms\n\
   \\033[#2D3347m%%%%%        %%%%  %%%%%    %%%%%%%%       %%%%%%%%      \\033[m   \\033[#E6A439mDuration\\033[m \\033[redm:\\033[m September 2018 -> July 2020\n\
   \\033[#2D3347m%%%%%        %%%%  %%%%     %%%%%%%%      %%%%%%%%%%     \\033[m\n\
   \\033[#2D3347m%%%%%       %%%%%  %%%%%    %%%%%%%%    %%%%%%  %%%%%    \\033[m\n\
   \\033[#2D3347m%%%%%%     %%%%%%   %%%%%      %%%     %%%%%     %%%%%   \\033[m\n\
   \\033[#2D3347m  %%%%%%%%%%%%%     %%%%%%%%%%%%%%%   %%%%%%      %%%%%% \\033[m\n\
   \\033[#2D3347m   %%%%%%%%%%%         %%%%%%%%%%    %%%%% \\033[#E75321m  *++  \\033[m  %%%%%%\\033[m\n\
   \\033[#2D3347m                                           \\033[#E75321m *++++ \\033[m        \\033[m\n\
 \n\
\\033[redm===============================================================================================================\\033[m\n\
 \n\
  \\033[#2558A5m                                    ##       \\033[m  \n\
  \\033[#2558A5m                                 ######      \\033[m                 \\033[#E6A439mName\\033[m     \\033[redm:\\033[m [ENSEEIHT](https://www.enseeiht.fr/fr/index.html)\n\
  \\033[#2558A5m                             ##########      \\033[m                 \\033[#E6A439mDiploma\\033[m  \\033[redm:\\033[m Engineer Degree in digital science\n\
  \\033[#2558A5m                        ###   ####  ##   ##  \\033[m                 \\033[#E6A439mDuration\\033[m \\033[redm:\\033[m September 2020 -> July 2023\n\
  \\033[#2558A5m                    ###########     ######## \\033[m  \n\
  \\033[#2558A5m               ######    #######  ########   \\033[m  \n\
  \\033[#2558A5m         ######          ##############      \\033[m  \n\
  \\033[#2558A5m                         ### ###### ##       \\033[m  \n\
  \\033[#2558A5m                                    ##       \\033[m  \n\
  \\033[#2558A5m                                    ##       \\033[m  \n',
    stdout,
  );

  return 0;
}

export const education: Command = {
  name: 'education.sh',
  execute,
};
