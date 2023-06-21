<script lang="ts">
	import PerFileInputOptions from "$lib/components/PerFileInputOptions.svelte"
  import { command } from "$lib/stores"

  export let index: number
</script>

<fieldset class="bordered"><legend>Input [{index}]</legend>

  <fieldset class="bordered flex flex-col"><legend>Per-File Input Options</legend>
    <PerFileInputOptions />
    
  </fieldset>
  <div>input video streams & per-stream options</div>
  <div>input audio streams & per-stream options</div>

  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
    <div class="input-group-shim">Input</div>
    <input type="text" bind:value={$command.inputs[index].url} placeholder="input (e.g. C:\videos\input.mp4)" />
  </div>
</fieldset>

<style lang="postcss">
  fieldset {
    @apply pl-2 pb-2 pr-2;
    border-width: 1px;
    border-color: transparent;
  }
  .bordered {
    @apply border border-tertiary-500;
  }
  legend {
    @apply text-tertiary-500 text-lg px-1;
  }
</style>
