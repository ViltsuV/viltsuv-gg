<script lang="ts">
	import OutputAudioSettings from "$lib/components/OutputAudioSettings.svelte"
	import Expandable from "$lib/components/Expandable.svelte"
	import OutputVideoSettings from "$lib/components/OutputVideoSettings.svelte"
  import { command } from "$lib/stores"
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton"
  
  export let output_index: number

  $: video_enabled = !$command.outputs[output_index].per_file_main_options.vn
  $: audio_enabled = !$command.outputs[output_index].per_file_main_options.an

  $: if (!video_enabled && audio_enabled) {
    command.update(($command) => {
      $command.outputs[output_index].per_file_main_options.container.selected_container =
        $command.outputs[output_index].per_file_main_options.container.selected_audio_container
      return $command
    })
  }
  
  $: if (video_enabled) {
    command.update(($command) => {
      $command.outputs[output_index].per_file_main_options.container.selected_container =
        $command.outputs[output_index].per_file_main_options.container.selected_video_container
      return $command
    })
  }

  $: $command.outputs[output_index].per_file_main_options.container.selected_container = !$command.outputs[output_index].per_file_main_options.vn 
    ? $command.outputs[output_index].per_file_main_options.container.selected_video_container
    : $command.outputs[output_index].per_file_main_options.container.selected_audio_container
</script>

<fieldset class="bordered"><legend>Output [{output_index}]</legend>
  <fieldset class="bordered"><legend>Per-File Output Options</legend>

    <label class="flex items-center space-x-2">
      <input class="checkbox" type="checkbox" bind:checked={$command.outputs[output_index].per_file_main_options.vn} />
      <div>Disable Video</div>
    </label>
    <label class="flex items-center space-x-2">
      <input class="checkbox" type="checkbox" bind:checked={$command.outputs[output_index].per_file_main_options.an} />
      <div>Disable Audio</div>
    </label>
  
    {#if video_enabled || audio_enabled}
      <div class="flex items-center">
        <div class="pr-3 ml-1 text-tertiary-500 text-lg">Container</div>
        {#if video_enabled}
          <RadioGroup active="variant-filled-tertiary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={$command.outputs[output_index].per_file_main_options.container.selected_video_container} name="container" value={'mkv'}>mkv</RadioItem>
            <RadioItem bind:group={$command.outputs[output_index].per_file_main_options.container.selected_video_container} name="container" value={'mp4'}>mp4</RadioItem>
            <RadioItem bind:group={$command.outputs[output_index].per_file_main_options.container.selected_video_container} name="container" value={'webm'}>webm</RadioItem>
          </RadioGroup>
        {/if}
        {#if !video_enabled && audio_enabled}
          <RadioGroup active="variant-filled-tertiary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={$command.outputs[output_index].per_file_main_options.container.selected_audio_container} name="container" value={'m4a'}>m4a</RadioItem>
            <RadioItem bind:group={$command.outputs[output_index].per_file_main_options.container.selected_audio_container} name="container" value={'mp3'}>mp3</RadioItem>
            <RadioItem bind:group={$command.outputs[output_index].per_file_main_options.container.selected_audio_container} name="container" value={'opus'}>opus</RadioItem>
            <RadioItem bind:group={$command.outputs[output_index].per_file_main_options.container.selected_audio_container} name="container" value={'wav'}>wav</RadioItem>
          </RadioGroup>
        {/if}
      </div>
      
      {#each $command.outputs[output_index].streams as stream, stream_index}
        {#if stream.type === 'video'}
          <Expandable expanded={video_enabled}>
            <OutputVideoSettings {output_index} {stream_index} />
          </Expandable>
        {/if}
        {#if stream.type === 'audio'}
          <Expandable expanded={audio_enabled}>
            <OutputAudioSettings {output_index} {stream_index} />
          </Expandable>
        {/if}
      {/each}
    {/if}
  </fieldset>

  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
    <div class="input-group-shim">Output</div>
    <input type="text" bind:value={$command.outputs[output_index].url} placeholder="output (e.g. C:\videos\output.mp4)" />
  </div>
</fieldset>

<style lang="postcss">
  .checkbox:checked {
    @apply bg-tertiary-500;
  }
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