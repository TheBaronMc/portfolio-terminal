<template>
  <div class="column terminal">
    <div class="column">
      <div v-for="entry in commandHistory" :key="entry.id">
        <div class="line">
          <div class="prompt">{{ entry.prompt }}&nbsp;</div>
          <div class="command">{{ entry.command }}</div>
        </div>
        <div class="output">{{ entry.output }}</div>
      </div>
    </div>
    <div class="line">
      <div class="prompt">{{ prompt }}&nbsp;</div>
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

type HistoryEntry = {
  id: number;
  command: string | Element | Element[];
  prompt: string | Element | Element[];
  output: string | Element | Element[];
};
const commandHistory = ref<HistoryEntry[]>([]);

const input: InputHTMLAttributes = ref(null);
onMounted(() => {
  input.value.focus();
});

let counter = 0;
let prompt: string = 'portfolio$';

function commandHandler(command: string): string {
  return '';
}

function commandListener(event: KeyboardEvent) {
  if (event.key == 'Enter') {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const command: string = input.value;

    const output: string = commandHandler(command);

    commandHistory.value.push({
      id: counter,
      command,
      prompt,
      output,
    });
    counter++;

    // Reset prompt
    input.value = '';
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
