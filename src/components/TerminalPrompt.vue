<template>
  <div class="prompt" id="prompt"></div>
  <input
    ref="input"
    class="command"
    @keydown="keyDownListener"
    type="text"
    id="commandInput"
    autocomplete="off"
  />
</template>

<script setup lang="ts">
import { formatTextToHTML } from '@/utils/format';
import { onMounted, watch } from 'vue';

const emit = defineEmits<{
  (e: 'exec', request: { name: string; params: string[]; line: string } | null): void;
}>();

const props = defineProps({
  prompt: { type: String, required: true },
});

onMounted(() => {
  updatePrompt(props.prompt);
});

watch(() => props.prompt, updatePrompt);

function updatePrompt(prompt: string): void {
  const prompt_div: HTMLElement = document.getElementById('prompt')!;

  prompt_div.innerHTML = '';

  formatTextToHTML(prompt).forEach((element) => {
    document.getElementById('prompt')?.appendChild(element);
  });
}

function keyDownListener(event: KeyboardEvent): void {
  switch (event.key) {
    case 'Enter':
      commandHandler(event);
      break;
    default:
      break;
  }
}

function commandHandler(event: KeyboardEvent): void {
  const input: HTMLInputElement = event.target as HTMLInputElement;
  const line: string = input.value;
  const re: RegExp = /(?:[^\s'"]+|'[^']*'|"[^"]*")+/g;
  const matches: RegExpMatchArray | null = line.match(re);

  if (matches) {
    const command: string = matches[0];
    const params: string[] = matches.slice(1);

    emit('exec', { name: command, params, line });
  } else {
    emit('exec', null);
  }

  // Reset prompt
  input.value = '';
  input.focus();
}
</script>

<style>
.progress_bar {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}

.progress_bar_title {
  flex-grow: 1;

  font-size: 50px;
  font-weight: bold;

  color: #a4a4a4;
}

.progress_bar_bar {
  flex-grow: 2;

  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;

  margin-left: 10%;
  margin-right: 10%;
}

.progress_bar_bar_loaded {
  height: 10px;

  background-color: #a4a4a4;

  border-radius: 5px;

  transition: 0.3s ease 0.3s;
}

.progress_bar_bar_to_load {
  height: 1px;

  background-color: #a4a4a4;
  transition: 0.3s ease 0.3s;
}
</style>
