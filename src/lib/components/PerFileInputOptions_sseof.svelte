<script lang="ts">
  import { command } from "$lib/stores"
	import { RangeSlider } from "@skeletonlabs/skeleton"

  export let input_index: number
  export let duration_seconds: number
  
  let current_sseof_value = 0
  let previous_sseof_value = current_sseof_value

  $: if (typeof current_sseof_value === 'number' && current_sseof_value >= 0 && current_sseof_value <= duration_seconds ) {
		command.update(($command) => {
			$command.inputs[input_index].per_file_main_options.t = current_sseof_value
			return $command
		})
	} else {
    current_sseof_value = previous_sseof_value
  }

  function validate_sseof(html_node: HTMLInputElement, new_input_value: any) {
    return {
      update(new_input_value: any) {
        if (new_input_value === null || current_sseof_value < parseFloat(html_node.min) || current_sseof_value > parseFloat(html_node.max)) {
          current_sseof_value = previous_sseof_value
        } else {
          current_sseof_value = parseFloat(new_input_value)
        }
        previous_sseof_value = current_sseof_value
      }
		}
  }
</script>

<div class="flex"><!-- start second relative to end-of-ofile (sseof) -->
  <RangeSlider
    name="range-slider-sseof"
    class="flex-grow"
    style="direction: rtl;"
    bind:value={current_sseof_value}
    min={0}
    max={duration_seconds}
    step={0.01}
    accent="accent-tertiary-700 dark:accent-tertiary-500"
    title="send only the last {current_sseof_value.toFixed(2)} seconds at the end of this input to be further processed"
    disabled={
      $command.inputs[input_index].ui.duration.sec === 0 && 
      $command.inputs[input_index].ui.duration.min === 0
    }
  >
    <div class="text-sm flex flex-row flex-wrap justify-between">
      <div class="mx-2">start second relative to end-of-file (-sseof)</div>
      <div class="mx-2">{current_sseof_value.toFixed(2)} / {duration_seconds} sec</div>
      <div class="mx-2">{Math.floor(current_sseof_value / 60) + " min " + ((current_sseof_value % 60)).toFixed(2) + " sec"}</div>
    </div>
  </RangeSlider>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-[10rem] ml-2 my-2">
    <input type="number" class="input max-w-[6rem]"
      step="0.01"
      title={
        current_sseof_value.toFixed(2) + " sec\n" +
        Math.floor(current_sseof_value / 60) + " min " +
        (current_sseof_value % 60).toFixed(2) + " sec"
      }
      use:validate_sseof={current_sseof_value}
      bind:value={current_sseof_value}
    >
    <div class="input-group-shim my-2 mr-2">sec</div>
  </div>
</div>

<style lang="ts">

</style>