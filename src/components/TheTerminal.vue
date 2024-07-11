<template>
  <div class="column terminal">
    <div class="column" id="output"></div>
    <div class="line">
      <div class="prompt" id="prompt"></div>
      <input
        ref="input"
        class="command"
        @keydown="keyDownListener"
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

let command_history_index: number = 0;
const command_history: string[] = [''];

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
function execCommand(command_name: string, params: string[], stdout: WritableStream) {
  for (const command of commands) {
    if (command.name == command_name) {
      command.execute(stdout, params);
      return;
    }
  }
  write(`Command not found ${command_name}\n`, stdout);
}

function keyDownListener(event: KeyboardEvent) {
  switch (event.key) {
    case 'Enter':
      commandHandler(event);
      break;
    case 'ArrowUp':
      previousCommand(event);
      break;
    case 'ArrowDown':
      nextCommand(event);
      break;
    default:
      updateCurrentCommand(event);
      break;
  }
}

function commandHandler(event: KeyboardEvent) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const line: string = input.value;
  const re = /(?:[^\s'"]+|'[^']*'|"[^"]*")+/g;
  const matches = line.match(re);

  if (matches) {
    write(`${prompt}${line}\n`, stdout);

    const command = matches[0];
    const params = matches.slice(1);
    execCommand(command, params, stdout);

    command_history.push('');
    command_history_index = command_history.length - 1;
  } else {
    write(`${prompt}\n`, stdout);
  }

  // Reset prompt
  input.value = '';
}

function previousCommand(event: KeyboardEvent) {
  function previousCommandAux(index: number, command_to_find: string) {
    if (index >= 0) {
      if (command_history[index].startsWith(command_to_find) && command_history[index] != command_to_find) {
        const input: HTMLInputElement = event.target as HTMLInputElement;

        command_history_index = index;
        input.value = command_history[command_history_index];

        input.setSelectionRange(input.value.length, input.value.length);
        return;
      } else {
        previousCommandAux(index - 1, command_to_find)
        return;
      }
    }
  }
  return previousCommandAux(command_history_index-1, command_history[command_history.length-1])
}

function nextCommand(event: KeyboardEvent) {
  function nextCommandAux(index: number, command_to_find: string) {
    if (index < command_history.length) {
      if (command_history[index].startsWith(command_to_find) && command_history[index] != command_to_find) {
        const input: HTMLInputElement = event.target as HTMLInputElement;

        command_history_index = index;
        input.value = command_history[command_history_index];

        input.setSelectionRange(input.value.length, input.value.length);
        return;
      } else {
        nextCommandAux(index + 1, command_to_find)
        return;
      }
    }
  }
  return nextCommandAux(command_history_index+1, command_history[command_history.length-1])
}

function updateCurrentCommand(event: KeyboardEvent) {
  const input: HTMLInputElement = event.target as HTMLInputElement;

  command_history_index = command_history.length - 1;
  command_history[command_history_index] = input.value + event.key;
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
