<template>
  <div class="column terminal">
    <div class="column">
      <div v-for="entry in commandHistory" :key="entry">
        <div class="line">
          <p class="prompt">{{ entry.prompt }}</p>
          <p class="command">{{ entry.command }}</p>
        </div>
        <p class="output">{{ entry.output }}</p>
      </div>
    </div>
    <div class="line">
      <p class="prompt">{{ prompt }}&nbsp;</p>
      <input
        class="command"
        @keydown="commandListener"
        :value="command"
        type="text"
        id="commandInput"
        autocomplete="off"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'Vue';

type HistoryEntry = {
  command: string;
  prompt: string;
  output: string;
};
const commandHistory = ref<HistoryEntry[]>([]);

let command: string = '';
let prompt: string = 'portfolio$';

function commandHandler(command: string): string {
  return '';
}

function commandListener(event: KeyboardEvent) {
  if (event.key == 'Enter') {
    const input = event.target as HTMLInputElement;
    command = input.value;

    const output: string = commandHandler(command);

    commandHistory.value.push({
      command,
      prompt,
      output,
    });
  }
}
</script>

<style scoped>
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
}

.command {
  margin: 0;
}

.output {
  margin: 0;
}
</style>
