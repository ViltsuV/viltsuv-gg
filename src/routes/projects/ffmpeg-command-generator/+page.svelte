<script lang="ts">
  import GeneratedCommand from "$lib/components/GeneratedCommand.svelte"
  import GlobalOptions from "$lib/components/GlobalOptions.svelte"
  import InputSection from "$lib/components/InputSection.svelte"
	import OutputSection from "$lib/components/OutputSection.svelte"
  
	import { command } from "$lib/stores"

  // import type { PageData } from './$types'
  
  // export let data: PageData
</script>
<svelte:head>
  <title>FFMPEG Command Generator</title>
</svelte:head>

<div class="container h-full px-2 mx-auto justify-center items-center">
  <h1 class="gradient-heading mt-4 mb-6">FFMPEG Command Generator</h1>

  <GlobalOptions />
  
  {#each $command.inputs as input, i}
    <InputSection index={i} />
  {/each}

  {#each $command.outputs as output, i}
    <OutputSection output_index={i} />
  {/each}

  <GeneratedCommand show_info_and_usage={false} />
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