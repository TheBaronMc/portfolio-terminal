<script setup lang="ts">
import TheTerminal from './components/TheTerminal.vue';

import { type Command } from '@/commands/command';
import { help } from '@/commands/help';
import { link } from '@/commands/link_sh';
import { work } from '@/commands/work_sh';
import { education } from '@/commands/education_sh';
import { skill } from '@/commands/skill_sh';

const commands: Command[] = [help, link, work, education, skill];
</script>

<template>
  <main>
    <TheTerminal :commands="commands" />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
}
</style>
