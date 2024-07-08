import { write } from '@/utils/io';
import { type Command } from './command';

function execute(stdout: WritableStream, _params: string[]): number {
  write(
    '\n\
    \\033[#FCD15Am     .::::::::..     \\033[m \n\
    \\033[#FCD15Am   .:::::....:::::.  \\033[m          \\033[#E6A439mCompany\\033[m     \\033[redm:\\033[m [iExec](https://www.iex.ec/)\n\
    \\033[#FCD15Am .::::....    ..::::.\\033[m          \\033[#E6A439mJob Name\\033[m    \\033[redm:\\033[m Intern\n\
    \\033[#FCD15Am .::.  .::....   .::.\\033[m          \\033[#E6A439mDuration\\033[m    \\033[redm:\\033[m April 2020 -> June 2020\n\
    \\033[#FCD15Am :::.  ..::::.:...:::\\033[m          \\033[#E6A439mDescription\\033[m \\033[redm:\\033[m Build a cluster which shows the company products\n\
    \\033[#FCD15Am :::.  ..:.::::...:::\\033[m          \\033[#E6A439mTechnos\\033[m     \\033[redm:\\033[m Docker\n\
    \\033[#FCD15Am .::.  .::....   .::.\\033[m \n\
    \\033[#FCD15Am .::::....    ..::::.\\033[m \n\
    \\033[#FCD15Am   .:::::....:::::.  \\033[m \n\
    \\033[#FCD15Am      .::::::::..    \\033[m \n\
 \n\
\\033[redm============================================================================================================\\033[m\n\
 \n\
   \\033[#390875m         %%%%%%%%%         \\033[m\n\
   \\033[#390875m        %%%%%%%%%%%        \\033[m     \\033[#E6A439mCompany\\033[m     \\033[redm:\\033[m [Thales Alenia Space](https://www.thalesaleniaspace.com/)\n\
   \\033[#390875m       %%%%%% %%%%%%       \\033[m     \\033[#E6A439mJob Name\\033[m    \\033[redm:\\033[m Engineer - Apprenticeship\n\
   \\033[#390875m      %%%%%%   %%%%%%      \\033[m     \\033[#E6A439mDuration\\033[m    \\033[redm:\\033[m September 2020 -> October 2023\n\
   \\033[#390875m     %%%%%%     %%%%%%     \\033[m     \\033[#E6A439mDescription\\033[m \\033[redm:\\033[m Programming satellite communication simulation tools\n\
   \\033[#390875m    %%%%%%  \\033[#4BC1D6m===\\033[m  %%%%%%    \\033[m     \\033[#E6A439mTechnos\\033[m     \\033[redm:\\033[m C++, Python, Git\n\
   \\033[#390875m   %%%%%% \\033[#4BC1D6m=======\\033[m %%%%%%   \\033[m\n\
   \\033[#390875m  %%%%%%  \\033[#4BC1D6m=======\\033[m  %%%%%%  \\033[m\n\
   \\033[#390875m %%%%%%    \\033[#4BC1D6m=====\\033[m    %%%%%% \\033[m\n\
   \\033[#390875m%%%%%%              %%%%%%%\\033[m\n\
 \n\
\\033[redm============================================================================================================\\033[m\n\
 \n\
   ....\\033[#2A3343m:=*##*=:\\033[m.\\033[#00AD9Dm:--====-:\\033[m....      \n\
   .\\033[#2A3343m:#%#=::\\033[m\\033[#00AD9Dm-+++++=-:\\033[m...\\033[#00AD9Dm:=+=:\\033[m....   \\033[#E6A439mCompany\\033[m     \\033[redm:\\033[m [OneStock](https://www.onestock-retail.com/)\n\
 ..\\033[#2A3343m*%+\\033[m..\\033[#00AD9Dm.:+++++=\\033[m..........\\033[#00AD9Dm:==\\033[m...   \\033[#E6A439mJob Name\\033[m    \\033[redm:\\033[m Python Developper\n\
..\\033[#2A3343m+%=\\033[m...\\033[#00AD9Dm-+++++=\\033[m.....\\033[#2A3343m:=\\033[m.....\\033[#00AD9Dm:+=\\033[m..   \\033[#E6A439mDuration\\033[m    \\033[redm:\\033[m October 2023 -> Now\n\
.\\033[#2A3343m:#%\\033[m...\\033[#00AD9Dm:=++++=:\\033[m....\\033[#2A3343m*%%%+\\033[m....\\033[#00AD9Dm-+:\\033[m.   \\033[#E6A439mDescription\\033[m \\033[redm:\\033[m Connect ERP of clients to OneStock, OMS configuration\n\
.\\033[#2A3343m:##\\033[m....\\033[#00AD9Dm-+++=:\\033[m...\\033[#2A3343m:#%%%%%=\\033[m...\\033[#00AD9Dm-+:\\033[m.   \\033[#E6A439mAchivements\\033[m \\033[redm:\\033[m Python, Git Workflow, Team work\n\
..\\033[#2A3343m*%=\\033[m.....\\033[#00AD9Dm-:\\033[m.....\\033[#2A3343m=%%%%%*:\\033[m...\\033[#00AD9Dm+=\\033[m..   \n\
...\\033[#2A3343m#%=\\033[m..........\\033[#2A3343m+%%%%%*\\033[m...\\033[#00AD9Dm:=+\\033[m...   \n\
   .\\033[#2A3343m-#%*-:\\033[m..\\033[#2A3343m:-*%%%%#+:\\033[m.\\033[#00AD9Dm:-++-\\033[m....   \n\
   ...\\033[#2A3343m:-*#%%%#*=-\\033[m\\033[#00AD9Dm:-=+++=-\\033[m....... \n',
    stdout,
  );

  return 0;
}

export const work: Command = {
  name: 'work.sh',
  execute,
};
