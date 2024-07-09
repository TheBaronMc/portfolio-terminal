<template>
  <div id="loading_page">
    <div class="loaging_page_logo">
        <img width="500" src="/cgsh.svg" />
    </div>
    <ProgressBar class="loaging_page_progress_bar" title="Loading" />
  </div>
</template>

<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';

</script>

<style>
#loading_page {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-content: center;
  align-items: center;
}

.loaging_page_logo {
    flex-grow: 2;
    justify-content: center;
  align-content: center;
  align-items: center;
}

.loaging_page_progress_bar {
    flex-grow: 1;

    width: 100%;

    padding-bottom: 20px;
}

</style>
