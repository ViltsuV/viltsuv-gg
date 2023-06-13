<script lang="ts">
	import type { FFMPEG_Output, SupportedAudioContainers, SupportedVideoContainers } from "$lib/types"

	import AudioSettings from "$lib/components/AudioSettings.svelte"
	import Expandable from "$lib/components/Expandable.svelte"
	import VideoSettings from "$lib/components/VideoSettings.svelte"

	export let output: FFMPEG_Output
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton"

  let output_video_container: SupportedVideoContainers = 'mp4'
  let output_audio_container: SupportedAudioContainers = 'm4a'
  let video_enabled = true
  let audio_enabled = false

  $: output_container = video_enabled ? output_video_container : output_audio_container
</script>

<fieldset class="bordered"><legend>Output</legend>
  <fieldset class="bordered"><legend>Options</legend>

    <label class="flex items-center space-x-2">
      <input class="checkbox" type="checkbox" bind:checked={video_enabled} />
      <div>Enable Video</div>
    </label>
    <label class="flex items-center space-x-2">
      <input class="checkbox" type="checkbox" bind:checked={audio_enabled} />
      <div>Enable Audio</div>
    </label>
  
    {#if video_enabled || audio_enabled}
      <div class="flex items-center">
        <div class="pr-3 ml-1 text-tertiary-500 text-lg">Container</div>
        {#if video_enabled}
          <RadioGroup active="variant-filled-tertiary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={output_video_container} name="container" value={'mkv'}>mkv</RadioItem>
            <RadioItem bind:group={output_video_container} name="container" value={'mp4'}>mp4</RadioItem>
            <RadioItem bind:group={output_video_container} name="container" value={'webm'}>webm</RadioItem>
          </RadioGroup>
        {/if}
        {#if !video_enabled && audio_enabled}
          <RadioGroup active="variant-filled-tertiary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={output_audio_container} name="container" value={'m4a'}>m4a</RadioItem>
            <RadioItem bind:group={output_audio_container} name="container" value={'mp3'}>mp3</RadioItem>
            <RadioItem bind:group={output_audio_container} name="container" value={'opus'}>opus</RadioItem>
            <RadioItem bind:group={output_audio_container} name="container" value={'wav'}>wav</RadioItem>
          </RadioGroup>
        {/if}
      </div>
      
      <Expandable expanded={video_enabled}>
        <VideoSettings />
      </Expandable>

      <Expandable expanded={audio_enabled}>
        <AudioSettings />
      </Expandable>
  
    {/if}
  </fieldset>

  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
    <div class="input-group-shim">Output</div>
    <input type="text" bind:value={output.path} placeholder="output (e.g. C:\videos\output.mp4)" />
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