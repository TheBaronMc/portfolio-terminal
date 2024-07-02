import { type Command } from './command';

function execute(_params: string[]): string {
  return '\n\
         .::::::::..    \n\
       .:::::....:::::.            Company     : iExec\n\
     .::::....    ..::::.          Job Name    : Intern\n\
     .::.  .::....   .::.          Duration    : April 2020 -> June 2020\n\
     :::.  ..::::.:...:::          Description : Build a cluster which shows the company products\n\
     :::.  ..:.::::...:::          Technos     : Docker\n\
     .::.  .::....   .::. \n\
     .::::....    ..::::. \n\
       .:::::....:::::.   \n\
          .::::::::..    \n\
 \n\
============================================================================================================\n\
 \n\
            %%%%%%%%%         \n\
           %%%%%%%%%%%             Company     : Thales Alenia Space\n\
          %%%%%% %%%%%%            Job Name    : Engineer - Apprenticeship\n\
         %%%%%%   %%%%%%           Duration    : September 2020 -> October 2023\n\
        %%%%%%     %%%%%%          Description : Programming satellite communication simulation tools\n\
       %%%%%%  ===  %%%%%%         Technos     : C++, Python, Git\n\
      %%%%%% ======= %%%%%%   \n\
     %%%%%%  =======  %%%%%%  \n\
    %%%%%%    =====    %%%%%% \n\
   %%%%%%              %%%%%%%\n\
 \n\
============================================================================================================\n\
 \n\
   ....:=*##*=:.:--====-:....      \n\
   .:#%#=::-+++++=-:...:=+=:....   Company     : OneStock\n\
 ..*%+...:+++++=..........:==...   Job Name    : Python Developper\n\
..+%=...-+++++=.....:=.....:+=..   Duration    : October 2023 -> Now\n\
.:#%...:=++++=:....*%%%+....-+:.   Description : Connect ERP of clients to OneStock, OMS configuration\n\
.:##....-+++=:...:#%%%%%=...-+:.   Achivements : Python, Git Workflow, Team work\n\
..*%=.....-:.....=%%%%%*:...+=..   \n\
...#%=..........+%%%%%*...:=+...   \n\
   .-#%*-:..:-*%%%%#+:.:-++-....   \n\
   ...:-*#%%%#*=-:-=+++=-....... ';
}

export const work: Command = {
  name: 'work.sh',
  execute,
};
