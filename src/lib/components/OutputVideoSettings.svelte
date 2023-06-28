<script lang="ts">
	import VideoCodecOptions_x264 from '$lib/components/VideoCodecOptions_x264.svelte'
	import Expandable from '$lib/components/Expandable.svelte'
  import { command } from '$lib/stores'

  export let output_index: number
  export let stream_index: number

  let vbv_tooltip = "Only recommended for situations where the conditions \ncall for constrained bitrate, such as: \n\n- streaming video over a low-bandwidth network, or \n- limited decoder capability."
  let bufsize_tooltip = 'Usually services recommend a buffer size of 1-2s i.e. 1-2x your bitrate'
</script>

<fieldset class="bordered"><legend>Video</legend>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
    <div class="input-group-shim">Encoder</div>
    <select bind:value={$command.outputs[output_index].per_file_main_options.c.v.value} class="select vcodec">
      <option value="copy">copy (use source)</option>
      <optgroup label="H.264 AVC">
        <option value="libx264">x264 (libx264)</option>
        <!-- <option value="h264_nvenc">Nvidia NVENC H.264 (h264_nvenc)</option> -->
        <!-- <option value="h264_qsv">Intel Quick Sync H.264 (h264_qsv)</option> -->
        <!-- <option value="h264_amf">AMD AMF H.264 (h264_amf)</option> -->
      </optgroup>
      <!-- <optgroup label="H.265 HEVC">
        <option value="libx265">x265 (libx265)</option>
        <option value="hevc_amf">AMD AMF H.265 (hevc_amf)</option>
        <option value="hevc_mf">MediaFoundation H.265 (hevc_mf)</option>
        <option value="hevc_nvenc">NVIDIA NVENC H.265 (hevc_nvenc)</option>
        <option value="hevc_qsv">Intel Quick Sync H.265 (hevc_qsv)</option>
      </optgroup> -->
      <!-- <optgroup label="VP">
        <option value="libvpx">VP8 (libvpx)</option>
        <option value="libvpx-vp9">VP9 (libvpx-vp9)</option>
        <option value="vp9_qsv">Intel Quick Sync VP9 (vp9_qsv)</option>
      </optgroup> -->

      <!-- https://trac.ffmpeg.org/wiki/Encode/AV1 -->
      <!-- https://ffmpeg.org/ffmpeg-codecs.html#libaom_002dav1 -->
      <!-- <optgroup label="AV1">
        <option value="libaom-av1">AOMedia AV1 (reference encoder) (libaom-av1)</option>
        <option value="librav1e">Rust AV1 (librav1e)</option>
        <option value="libsvtav1">SVT-AV1 Intel/Netflix Scalable Video Technology (libsvtav1)</option>
        <option value="av1_nvenc">NVIDIA NVENC AV1 (av1_nvenc)</option>
        <option value="av1_qsv">Intel Quick Sync AV1 (av1_qsv)</option>
        <option value="av1_amf">AMD AMF AV1 (av1_amf)</option>
      </optgroup> -->
    </select>
    
  </div>
  
  <Expandable expanded={$command.outputs[output_index].per_file_main_options.c.v.value === 'libx264'}>
    <VideoCodecOptions_x264 {output_index} {stream_index} />
  </Expandable>
  <!-- Constrain Bitrate (libx264) -->
  <fieldset 
    class:bordered={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.constrain_bitrate} 
    class="mt-3"
  >
    <legend>
      <div class="flex flex-row items-center justify-center">
        <input class="checkbox" 
          title={vbv_tooltip}
          type="checkbox" 
          name="constrain_bitrate" 
          bind:checked={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.constrain_bitrate}>
        <div class="flex flex-row pl-2">
          <div
            title={vbv_tooltip}
          >Constrain Video Bitrate</div>
          <a href="https://youtu.be/Mn8v1ojV80M?t=20"
            title="The Hypothetical Reference Decoder (HRD) - Christian Feldmann - YouTube"
            class="pl-2"
          >
            (VBV / HRD)
          </a>
        </div>
      </div>
    </legend>
    <Expandable expanded={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.constrain_bitrate}>
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
        <div class="input-group-shim" title="sets -maxrate parameter">Max Bitrate</div>
        <div class="flex flex-row">
          <input type="number" class="input" name="maxrate_value"
            bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.max_bitrate.value}
          >
          <select class="select" name="maxrate_unit"
            bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.max_bitrate.unit}
          >
            <option value="K" title="unit">Kbps (K)</option>
            <option value="M" title="unit">Mbps (M)</option>
          </select>
        </div>
      </div>
  
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
        <div class="input-group-shim" title="sets -bufsize parameter{'\n\n' + bufsize_tooltip}">
          Buffer Size
        </div>
        <div class="flex flex-row" title={bufsize_tooltip}>
          <input class="input" type="number" name="bufsize"
            bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.buffer_size.value}
          >
          <select class="select" name="bufsize_unit" bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.buffer_size.unit}>
            <option value="K">Kbps (K)</option>
            <option value="M">Mbps (M)</option>
          </select>
        </div>
      </div>
    </Expandable>
  </fieldset>
</fieldset>

<div>per-stream video options: video stream [{stream_index}]</div>

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