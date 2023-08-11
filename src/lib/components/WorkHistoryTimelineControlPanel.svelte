<script lang="ts">
  import { 
    showing_wht_control_panel,
    sorted_employers_descending, 
    year_width, 
  } from '$lib/stores'
	import { RangeSlider } from '@skeletonlabs/skeleton'
	import type { Employer } from '$lib/types'
  import Expandable from '$lib/components/Expandable.svelte'

  export let employers: Employer[]
  
</script>

<Expandable expanded={$showing_wht_control_panel}>
  <div class="wht-control-panel flex flex-col">
    <div class="table-container">
      <table class="table">
        <tbody>
          <tr>
            <td>Year width</td>
            <td>
              <RangeSlider 
                name='year-width'
                bind:value={$year_width}
                min={120}
                max={1200}
                step={1}
                title="zoom"
              />
            </td>
          </tr>
          <tr>
            <td>Filter Employers</td>
            <td class="flex flex-row flex-wrap">
              {#each employers as employer, employer_i}
                <div class="chip m-1 unselectable {
                  employer.visible
                    ? 'variant-filled-tertiary'
                    : 'variant-ghost-tertiary'
                  }"
                  title="toggle employer"
                  on:click={() => {
                    $sorted_employers_descending[employer_i].visible = !$sorted_employers_descending[employer_i].visible
                  }}
                  on:keyup={() => {}}
                >
                  {employer.name}
                </div>
              {/each}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</Expandable>

<style lang="postcss">
  .unselectable {
		user-select: none
	}
</style>
