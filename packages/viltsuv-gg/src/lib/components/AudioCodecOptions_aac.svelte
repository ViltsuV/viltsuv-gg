<script lang="ts">
  import { command } from '$lib/stores'

  export let output_index: number
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
  <div class="input-group-shim">Bitrate</div>
  <select class="select"
    bind:value={$command.outputs[output_index].per_file_main_options.c.a.encoder_options.aac.bitrate}
  >
    <option value="default">default (128 kbps)</option>
    <option value="56">56 kbps</option>
    <option value="64">64 kbps</option>
    <option value="80">80 kbps</option>
    <option value="96">96 kbps</option>
    <option value="112">112 kbps</option>
    <option value="128">128 kbps</option>
    <option value="160">160 kbps</option>
    <option value="192">192 kbps</option>
    <option value="224">224 kbps</option>
    <option value="384">384 kbps</option>
    <option value="448">448 kbps</option>
    <option value="576">576 kbps</option>
    <option value="640">640 kbps</option>
  </select>
</div>

<style lang="postcss">

</style>