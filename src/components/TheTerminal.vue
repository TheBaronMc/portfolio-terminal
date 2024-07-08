<template>
  <div class="column terminal">
    <div class="column" id="output"></div>
    <div class="line">
      <div class="prompt" id="prompt"></div>
      <input
        ref="input"
        class="command"
        @keydown="commandListener"
        type="text"
        id="commandInput"
        autocomplete="off"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type InputHTMLAttributes } from 'vue';

import { formatTextToHTML } from '../utils/format';
import { type Command } from '../commands/command';
import { init_stdout, write } from '@/utils/io';

const props = defineProps({
  banner: String,
  commands: Array<Command>,
});

const stdout = init_stdout();

let prompt: string = '\\033[#72BE47mportfolio\\033[m$ ';

const input: InputHTMLAttributes = ref(null);
onMounted(() => {
  if (props.banner) {
    write(props.banner, stdout);
  }

  write('\\033[#E6A439mTip: start by executing `help` command\\033[m\n', stdout);

  formatTextToHTML(prompt).forEach((element) => {
    document.getElementById('prompt')?.appendChild(element);
  });

  input.value.focus();
});

const commands: Command[] = props.commands || [];
function commandHandler(command_name: string, params: string[], stdout: WritableStream) {
  for (const command of commands) {
    if (command.name == command_name) {
      command.execute(stdout, params);
      return;
    }
  }
  write(`Command not found ${command_name}\n`, stdout);
}

function commandListener(event: KeyboardEvent) {
  if (event.key == 'Enter') {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const line: string = input.value;
    const re = /(?:[^\s'"]+|'[^']*'|"[^"]*")+/g;
    const matches = line.match(re);

    if (matches) {
      const command = matches[0];
      const params = matches.slice(1);

      write(`${prompt}${command}\n`, stdout);
      commandHandler(command, params, stdout);
    }

    // Reset prompt
    input.value = '';
  }
}
</script>

<style>
a {
  color: white;
}

a:visited {
  color: gray;
}

#commandInput {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  color: white;
  caret-color: white;
  caret-shape: block;
}

.terminal {
  color: white;
}

.line {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.prompt {
  margin: 0;

  display: flex;
  flex-direction: row;
}

.command {
  margin: 0;
}

.output {
  margin: 0;
}
</style>
