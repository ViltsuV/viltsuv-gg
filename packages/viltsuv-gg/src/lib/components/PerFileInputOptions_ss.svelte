<script lang="ts">
  import { command } from "$lib/stores"
	import { RangeSlider } from "@skeletonlabs/skeleton"
  
  export let input_index: number
  export let duration_seconds: number

  let current_ss_value = 0
  let previous_ss_value = current_ss_value

  $: if (typeof current_ss_value === 'number' && current_ss_value >= 0 && current_ss_value <= duration_seconds ) {
		command.update(($command) => {
			$command.inputs[input_index].per_file_main_options.ss = current_ss_value
			return $command
		})
	} else {
    current_ss_value = previous_ss_value
  }
  
  function validate_ss(html_node: HTMLInputElement, new_input_value: any) {
    return {
      update(new_input_value: any) {
        if (new_input_value === null || current_ss_value < parseFloat(html_node.min) || current_ss_value > parseFloat(html_node.max)) {
          current_ss_value = previous_ss_value
        } else {
          current_ss_value = parseFloat(new_input_value)
        }
        previous_ss_value = current_ss_value
      }
		}
  }

</script>

<div class="flex"><!-- start second (ss) -->
  <RangeSlider
    name="range-slider-ss"
    class="flex-grow"
    bind:value={current_ss_value}
    min={0}
    max={duration_seconds}
    step={0.01}
    accent="accent-red-700 dark:accent-red-500"
    title="remove the first {
      current_ss_value.toFixed(2)
      } seconds from the beginning of this input"
    disabled={
      $command.inputs[input_index].ui.duration.sec === 0 && 
      $command.inputs[input_index].ui.duration.min === 0
    }
  >
    <div class="text-sm flex flex-row flex-wrap justify-between">
      <div class="mx-2">start second (-ss)</div>
      <div class="mx-2">{current_ss_value.toFixed(2)} / {duration_seconds} sec</div>
      <div class="mx-2">{Math.floor(current_ss_value / 60) + " min " + ((current_ss_value % 60)).toFixed(2) + " sec"}</div>
    </div>
  </RangeSlider>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-[10rem] ml-2 my-2">
    <input type="number" class="input max-w-[6rem]"
      step="0.01"
      title={
        current_ss_value.toFixed(2) + " sec\n" +
        Math.floor(current_ss_value / 60) + " min " + ((current_ss_value % 60)).toFixed(2) + " sec"
      }
      use:validate_ss={current_ss_value}
      bind:value={current_ss_value}
    >
    <div class="input-group-shim my-2 mr-2">sec</div>
  </div>
</div>

<style lang="postcss">

</style>
