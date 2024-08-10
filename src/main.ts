import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import TheTerminal from './components/TheTerminal.vue';
import LoadingPage from './components/LoadingPage.vue';

import { type Command } from '@/commands/command';
import { help } from '@/commands/help';
import { link } from '@/commands/link_sh';
import { work } from '@/commands/work_sh';
import { education } from '@/commands/education_sh';
import { skill } from '@/commands/skill_sh';
import { getRandomInt } from '@/utils/random';

const commands: Command[] = [help, link, work, education, skill];

function getBanner(): string {
  return "\\033[redm   _____ _                _          _____ _                            \\033[m\n\
\\033[redm  / ____| |              | |        / ____(_)                           \\033[m\n\
\\033[redm | |    | |__   __ _ _ __| |_   _  | |  __ _ _ __   _____   ___ __ __ _ \\033[m\n\
\\033[redm | |    | '_ \\ / _` | '__| | | | | | | |_ | | '_ \\ / _ \\ \\ / / '__/ _` |\\033[m\n\
\\033[redm | |____| | | | (_| | |  | | |_| | | |__| | | | | |  __/\\ V /| | | (_| |\\033[m\n\
\\033[redm  \\_____|_| |_|\\__,_|_|  |_|\\__, |  \\_____|_|_| |_|\\___| \\_/ |_|  \\__,_|\\033[m\n\
\\033[redm                             __/ |                                      \\033[m\n\
\\033[redm  _____           _    __   |___/_                                      \\033[m\n\
\\033[redm |  __ \\         | |  / _|    | (_)                                     \\033[m\n\
\\033[redm | |__) |__  _ __| |_| |_ ___ | |_  ___                                 \\033[m\n\
\\033[redm |  ___/ _ \\| '__| __|  _/ _ \\| | |/ _ \\                                \\033[m\n\
\\033[redm | |  | (_) | |  | |_| || (_) | | | (_) |                               \\033[m\n\
\\033[redm |_|   \\___/|_|   \\__|_| \\___/|_|_|\\___/                                \\033[m\n\
\\033[redm                                                                        \\033[m\n";
}

function getFakeComputerData(): string {
  const uptime = `${getRandomInt(365)}d ${getRandomInt(23)}h ${getRandomInt(59)}m`;
  const memory = [4, 8, 16, 32, 64][getRandomInt(5)];

  return `\\033[#03978Aminvite@portefolio            \\033[m\n\
--------------------                   \n\
\\033[#03978AmOS\\033[m: Fantasy OS 1.0.0 LTS x86_64        \n\
\\033[#03978AmHost\\033[m: MythicalMachine 9000             \n\
\\033[#03978AmKernel\\033[m: 6.0.0-fantasy                  \n\
\\033[#03978AmUptime\\033[m: ${uptime}                      \n\
\\033[#03978AmShell\\033[m: cgsh 5.1.0                      \n\
\\033[#03978AmCPU\\033[m: DragonChip X9 (8) @ 3.5GHz        \n\
\\033[#03978AmGPU\\033[m: MythicGraphics 9000               \n\
\\033[#03978AmMemory\\033[m: ${memory}GB                    \n`;
}

const app = createApp(App);

app.use(createPinia());
app.use(
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: LoadingPage,
        props: {
          redirect_path: '/shell',
        },
      },
      {
        path: '/shell',
        component: TheTerminal,
        props: {
          banner: getBanner() + getFakeComputerData(),
          commands,
        },
      },
      {
        path: '/loading',
        component: LoadingPage,
        props: {
          redirect_path: '/shell',
        },
        alias: '/',
      },

      /* Default route */
      { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
  }),
);

app.mount('#app');
