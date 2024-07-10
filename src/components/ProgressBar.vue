<template>
  <div class="progress_bar">
    <div class="progress_bar_title" v-if="title">{{ title }}</div>
    <div class="progress_bar_bar">
      <div class="progress_bar_bar_loaded" :style="style_charged_bar"></div>
      <div class="progress_bar_bar_to_load" :style="style_remaining_bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomInt } from '@/utils/random';
import { computed, onMounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'done'): void;
}>();

const props = defineProps({
  title: String,
});

const title = props.title;

const charged = ref(0);
const style_charged_bar = computed(() => `width: ${charged.value * 80}%;`);

const remaining = ref(1);
const style_remaining_bar = computed(() => `width: ${remaining.value * 80}%;`);

onMounted(() => {
  function charge_bar(nb_step: number, max_waiting: number) {
    const delta = 1 / nb_step;
    function charge_bar_aux(step: number, nb_step: number, max_waiting: number) {
      if (step <= nb_step) {
        charged.value += delta;
        remaining.value -= delta;

        setTimeout(() => charge_bar_aux(step + 1, nb_step, max_waiting), getRandomInt(max_waiting));
      } else {
        emit('done');
      }
    }
    charge_bar_aux(1, nb_step, max_waiting);
  }
  charge_bar(getRandomInt(5) || 1, 2000);
});
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
