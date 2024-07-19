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
import { History, type HistorySearchInterface } from '@/utils/history';

const props = defineProps({
  banner: String,
  commands: Array<Command>,
});

const stdout = init_stdout();

let prompt: string = '\\033[#72BE47mportfolio\\033[m$ ';

const command_history = new History<string>();
let history_search: HistorySearchInterface<string> = command_history.search((e) => false);
let searching: boolean = false;
let current_input: string = '';

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

function addToHistory(event: KeyboardEvent) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const command: string = input.value;

  command_history.add_entry(command);

  searching = false;
}

function getPreviousHistoryEntry(): string | undefined {
  if (!searching) {
    searching = true;
    history_search = command_history.search((e) => {
      return e.startsWith(current_input);
    });
  }

  return history_search.previous();
}

function previousCommand(event: KeyboardEvent) {
  const previous_entry = getPreviousHistoryEntry();
  if (previous_entry) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    input.value = previous_entry;
  }
}

function getNextHistoryEntry(): string | undefined {
  if (!searching) {
    return undefined;
  }

  return history_search.next();
}

function nextCommand(event: KeyboardEvent) {
  const previous_entry = getNextHistoryEntry();
  if (previous_entry) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    input.value = previous_entry;
  }
}

function updateCurrentCommand(event: KeyboardEvent) {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  current_input = input.value + event.key;
}

function keyDownListener(event: KeyboardEvent) {
  switch (event.key) {
    case 'Enter':
      addToHistory(event);
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
  } else {
    write(`${prompt}\n`, stdout);
  }

  // Reset prompt
  input.value = '';
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
