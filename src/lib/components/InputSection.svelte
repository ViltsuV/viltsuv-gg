<script lang="ts">
	import type { FFMPEG_Input } from "$lib/types"

	export let input: FFMPEG_Input

</script>

<fieldset class="bordered"><legend>Input</legend>

  <fieldset class="bordered"><legend>Options</legend>
  </fieldset>

  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
    <div class="input-group-shim">Input</div>
    <input type="text" bind:value={input.path} placeholder="input (e.g. C:\videos\input.mp4)" />
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
