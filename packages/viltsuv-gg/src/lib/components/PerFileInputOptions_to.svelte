<script lang="ts">
  import { command } from "$lib/stores"
	import { RangeSlider } from "@skeletonlabs/skeleton"

  export let input_index: number
  export let duration_seconds: number

  let current_to_value = 0
  let previous_to_value = current_to_value

  $: if (typeof current_to_value === 'number' && current_to_value >= 0 && current_to_value <= duration_seconds ) {
		command.update(($command) => {
			$command.inputs[input_index].per_file_main_options.to = current_to_value
			return $command
		})
	} else {
    current_to_value = previous_to_value
  }

  function validate_to(html_node: HTMLInputElement, new_input_value: any) {
    return {
      update(new_input_value: any) {
        if (new_input_value === null || current_to_value < parseFloat(html_node.min) || current_to_value > parseFloat(html_node.max)) {
          current_to_value = previous_to_value
        } else {
          current_to_value = parseFloat(new_input_value)
        }
        previous_to_value = current_to_value
      }
		}
  }

</script>

<div class="flex"><!-- limit input to position (to) -->
  <RangeSlider
    name="range-slider-t"
    class="flex-grow"
    bind:value={current_to_value}
    min={0}
    max={duration_seconds}
    step={0.01}
    accent="accent-tertiary-700 dark:accent-tertiary-500"
    title="stop sending the input to be further processed at {current_to_value.toFixed(2)} seconds"
    disabled={duration_seconds === 0}
  >
    <div class="text-sm flex flex-row flex-wrap justify-between">
      <div class="mx-2">limit input to position (-to)</div>
      <div class="mx-2">{(current_to_value).toFixed(2)} / {duration_seconds} sec</div>
      <div class="mx-2">
        {Math.floor(current_to_value / 60) + " min " + 
        (current_to_value % 60).toFixed(2) + " sec"}
      </div>
    </div>
  </RangeSlider>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-[10rem] ml-2 my-2">
    <input type="number" class="input max-w-[6rem]"
      step="0.01"
      min="0"
      max={duration_seconds}
      title={
        current_to_value.toFixed(2) + " sec\n" +
        Math.floor(current_to_value / 60) + " min " + 
        (current_to_value % 60).toFixed(2) + " sec"
      }
      use:validate_to={current_to_value}
      bind:value={current_to_value}
    >
    <div class="input-group-shim my-2 mr-2">sec</div>
  </div>
</div>

<style lang="postcss">

</style>
