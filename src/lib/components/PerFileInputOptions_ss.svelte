<script lang="ts">
  import { command } from "$lib/stores"
	import { RangeSlider } from "@skeletonlabs/skeleton"
  
  export let input_index: number
  export let frames: number
  export let duration_seconds: number
  export let fps: number
  export let start_second: number
  export let start_frame: number
</script>


<div class="flex"><!-- start second (ss) -->
  <RangeSlider
    name="range-slider-ss"
    class="flex-grow"
    bind:value={$command.inputs[input_index].ui.start_frame}
    on:change={() => {
      command.update(($command) => {
        $command.inputs[input_index].per_file_main_options.ss = $command.inputs[input_index].ui.start_frame / fps
        return $command
      })
    }}
    min={0}
    max={frames}
    step={1}
    accent="accent-error-600 dark:accent-error-400"
    title="remove the first {
      $command.inputs[input_index].per_file_main_options.ss.toFixed(2)
      } seconds from the beginning of this input"
    disabled={
      $command.inputs[input_index].ui.duration.sec === 0 && 
      $command.inputs[input_index].ui.duration.min === 0
    }
  >
    <div class="text-sm flex flex-row flex-wrap justify-between">
      <div class="mx-2">start second (-ss)</div>
      <div class="mx-2">{start_second.toFixed(2)} / {duration_seconds} sec</div>
      <div class="mx-2">{Math.floor(start_second / 60) + " min " + ((start_second % 60)).toFixed(2) + " sec"}</div>
      <div class="mx-2">frame {start_frame.toFixed(0)} / {frames.toFixed(0)}</div>
    </div>
  </RangeSlider>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-[10rem] ml-2 my-2">
    <input type="number" class="input max-w-[6rem]"
      step="0.01"
      title={
        start_second.toFixed(2) + " sec\n" +
        Math.floor(start_second / 60) + " min " + ((start_second % 60)).toFixed(2) + " sec"
      }
      bind:value={$command.inputs[input_index].per_file_main_options.ss}
      on:change={()=>{
        command.update(($command) => {
          $command.inputs[input_index].ui.start_frame = $command.inputs[input_index].per_file_main_options.ss * fps
          return $command
        })
      }}
    >
    <div class="input-group-shim my-2 mr-2">sec</div>
  </div>
</div>

<style lang="postcss">

</style>
