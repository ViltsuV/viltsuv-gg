<script lang="ts">
  import { command } from "$lib/stores"
	import { RangeSlider } from "@skeletonlabs/skeleton"

  export let input_index: number
  export let frames: number
  export let duration_seconds: number
  export let fps: number
  export let start_second_eof: number
  
</script>


<div class="flex"><!-- start second relative to end-of-ofile (sseof) -->
  <RangeSlider
    name="range-slider-sseof"
    class="flex-grow"
    style="direction: rtl;"
    bind:value={$command.inputs[input_index].ui.start_frame_eof}
    on:change={() => {
      command.update(($command) => {
        $command.inputs[input_index].per_file_main_options.sseof = $command.inputs[input_index].ui.start_frame_eof / fps
        return $command
      })
    }}
    min={0}
    max={frames}
    step={1}
    accent="accent-success-600 dark:accent-success-400"
    title="send only the last {
      $command.inputs[input_index].per_file_main_options.sseof.toFixed(2)
      } seconds at the end of this input to be further processed"
    disabled={
      $command.inputs[input_index].ui.duration.sec === 0 && 
      $command.inputs[input_index].ui.duration.min === 0
    }
  >
    <div class="text-sm flex flex-row flex-wrap justify-between">
      <div class="mx-2">start second relative to end-of-file (-sseof)</div>
      <div class="mx-2">{start_second_eof.toFixed(2)} / {duration_seconds} sec</div>
      <div class="mx-2">{Math.floor(start_second_eof / 60) + " min " + ((start_second_eof % 60)).toFixed(2) + " sec"}</div>
      <!-- <div class="mx-2">frame -{start_frame_eof.toFixed(0)} / {frames.toFixed(0)}</div> -->
    </div>
  </RangeSlider>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-[10rem] ml-2 my-2">
    <input type="number" class="input max-w-[6rem]"
      step="0.01"
      title={
        start_second_eof.toFixed(2) + " sec\n" +
        Math.floor(start_second_eof / 60) + " min " + (start_second_eof % 60).toFixed(2) + " sec"
      }
      bind:value={$command.inputs[input_index].per_file_main_options.sseof}
      on:change={()=>{
        command.update(($command) => {
          $command.inputs[input_index].ui.start_frame_eof = $command.inputs[input_index].per_file_main_options.sseof * fps
          return $command
        })
      }}
    >
    <div class="input-group-shim my-2 mr-2">sec</div>
  </div>
</div>

<style lang="ts">

</style>