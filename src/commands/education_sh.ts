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
    ' \n\
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
  );

  return { ...ctx, last_exit_code: 0 };
}

export const education: Command = {
  name: 'education.sh',
  execute,
};
