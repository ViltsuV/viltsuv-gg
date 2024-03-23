<script lang="ts">
  // import type { PageData } from '../work-history-timeline/$types'
  import WorkHistoryTimeline from '$lib/components/WorkHistoryTimeline.svelte'

  // export let data: PageData
</script>
<div class="container pl-4 mx-auto mt-4 pr-3">
  <h1 class="gradient-heading mb-6">Work History Timeline component</h1>
  
  <p class="mb-4">
    This page displays some mock employment data on the work history timeline component. 
    For my actual work history, click <a href="../work-history">here</a>.
  </p>
  <WorkHistoryTimeline />
</div>

<style lang="postcss">
  .gradient-heading {
    @apply bg-clip-text text-transparent box-decoration-clone;
    /* Direction */
    @apply bg-gradient-to-br;
    /* Color Stops */
    @apply from-primary-500 via-tertiary-500 to-secondary-500;
  }
</style>