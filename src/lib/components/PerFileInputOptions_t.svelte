<script lang="ts">
  import { command } from "$lib/stores"
	import { RangeSlider } from "@skeletonlabs/skeleton"

  export let input_index: number
  export let frames: number
  export let duration_seconds: number
  export let fps: number

  let current_t_value = 0
  let previous_t_value = current_t_value

  $: if (typeof current_t_value === 'number' && current_t_value >= 0 && current_t_value <= duration_seconds ) {
		command.update(($command) => {
			$command.inputs[input_index].per_file_main_options.t = current_t_value
			return $command
		})
	} else {
    current_t_value = previous_t_value
  }

  function validate_t(html_node: HTMLInputElement, new_input_value: any) {
    return {
      update(new_input_value: any) {
        if (new_input_value === null || current_t_value < parseFloat(html_node.min) || current_t_value > parseFloat(html_node.max)) {
          current_t_value = previous_t_value
        } else {
          current_t_value = parseFloat(new_input_value)
        }
        previous_t_value = current_t_value
      }
		}
  }

</script>

<div class="flex"><!-- limit input duration (t) -->
  <RangeSlider
    name="range-slider-t"
    class="flex-grow"
    bind:value={current_t_value}
    min={0}
    max={frames / fps}
    step={0.01}
    accent="accent-success-600 dark:accent-success-400"
    title="
      limit the input duration to {
      $command.inputs[input_index].per_file_main_options.t.toFixed(2)
      } seconds
    "
    disabled={duration_seconds === 0}
  >
    <div class="text-sm flex flex-row flex-wrap justify-between">
      <div class="mx-2">limit input duration (-t)</div>
      <div class="mx-2">{(current_t_value).toFixed(2)} / {duration_seconds} sec</div>
      <div class="mx-2">{Math.floor(current_t_value / 60) + " min " + (current_t_value % 60).toFixed(2) + " sec"}</div>
    </div>
  </RangeSlider>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-[10rem] ml-2 my-2">
    <input type="number" class="input max-w-[6rem]"
      step="0.01"
      min="0"
      max={duration_seconds}
      title={
        current_t_value.toFixed(2) + " sec\n" +
        Math.floor(current_t_value / 60) + " min " + (current_t_value % 60).toFixed(2) + " sec"
      }
      use:validate_t={current_t_value}
      bind:value={current_t_value}
    >
    <div class="input-group-shim my-2 mr-2">sec</div>
  </div>
</div>

<style lang="postcss">

</style>
