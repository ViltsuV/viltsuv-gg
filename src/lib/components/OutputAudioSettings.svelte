<script lang="ts">
  import AudioCodecOptions_aac from '$lib/components/AudioCodecOptions_aac.svelte'
  import type { AudioEncoders } from '$lib/types'

  export let index: number

  let audio_codec: AudioEncoders = 'copy'
</script>

<fieldset class="bordered"><legend>Audio</legend>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
    <div class="input-group-shim">Encoder</div>
    <select class="select acodec" bind:value={audio_codec}>
      <option value="copy">copy (Use source)</option>
      <optgroup label="AAC">
        <option value="aac">AAC (aac)</option>
        <!-- <option value="aac_mf">AAC MediaFoudation (aac_mf)</option> -->
      </optgroup>
      <!-- <optgroup label="OPUS">
        <option value="libvo_aacenc">OPUS (libopus)</option>
      </optgroup> -->
      <!-- <optgroup label="MP3">
        <option value="libmp3lame">MP3 (libmp3lame)</option>
        <option value="libshine">MP3 (libshine)</option>
        <option value="mp3_mf">MP3 (mp3_mf)</option>
      </optgroup> -->
    </select>
  </div>
  <AudioCodecOptions_aac />
</fieldset>
<div>per-stream audio options: audio stream [{index}]</div>


<style lang="postcss">
  fieldset {
    @apply pl-2 pb-2 pr-2;
  }
  legend {
    @apply text-tertiary-500 text-lg px-1
  }
</style>