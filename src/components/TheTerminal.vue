<template>
  <div class="column terminal">
    <div class="column">
      <div v-for="entry in commandHistory" :key="entry.id">
        <div class="line">
          <div class="prompt" v-html="entry.prompt"></div>
          <div class="command">{{ entry.command }}</div>
        </div>
        <div class="colomn output" v-html="entry.output"></div>
      </div>
    </div>
    <div class="line">
      <div class="prompt" v-html="prompt"></div>
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

const props = defineProps({
  commands: Array<Command>
})

type HistoryEntry = {
  id: number;
  command: string;
  prompt: string;
  output: string;
};
const commandHistory = ref<HistoryEntry[]>([]);

const input: InputHTMLAttributes = ref(null);
onMounted(() => {
  input.value.focus();
});

let counter = 0;
let prompt: string = '<div style="color: #72BE47;">portfolio</div>$&nbsp;';

const commands: Command[] = props.commands || [];

function commandHandler(command_name: string, params: string[]): string {
  for (const command of commands) {
    if (command.name == command_name) {
      return command.execute(params);
    }
  }

  return `Command not found ${command_name}`;
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

      const output: string = formatTextToHTML(commandHandler(command, params));

      commandHistory.value.push({
        id: counter,
        command,
        prompt,
        output,
      });
    } else {
      commandHistory.value.push({
        id: counter,
        command: '',
        prompt,
        output: '',
      });
    }
    counter++;

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
