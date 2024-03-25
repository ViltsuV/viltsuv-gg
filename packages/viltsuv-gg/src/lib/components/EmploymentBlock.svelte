<script lang="ts">
	import type { Employment } from "$lib/types"
  import { year_width } from '$lib/stores'
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton'
  import {
	  modalStore,
    modeCurrent, // light mode / dark mode
  } from '@skeletonlabs/skeleton'
  import EmploymentDetails from "$lib/components/EmploymentDetails.svelte"

  export let employment: Employment

  $: light_mode = $modeCurrent

  let employment_width = (employment: Employment, $year_width: number) => {
    let start = Date.parse(employment.start_time)
    let end = Date.parse(employment.end_time)
    let width = (end - start) / 1000 / 60 / 60 / 24 * $year_width / 365
    return `${width}px`
  }

  let employment_modal_component: ModalComponent = {
    ref: EmploymentDetails,
    props: {
      employment: employment
    },
  }

  let employment_modal_settings: ModalSettings = {
    type: 'component',
    component: employment_modal_component,
  }

</script>

<div class="employment"
  style="
    min-width: {employment_width(employment, $year_width)};
    max-width: {employment_width(employment, $year_width)};
    background-color: {light_mode
      ? employment.employer.color.primary
      : employment.employer.color.primary_dark};
    border-color: {light_mode
      ? employment.employer.color.secondary
      : employment.employer.color.secondary_dark};
  "
  on:click={() => {
    modalStore.trigger(employment_modal_settings)
  }}
  on:keyup={() => {}}
>
<div class="role-title">{employment.role.title}</div>
  <div class="employer-name">{employment.employer.name}</div>
</div>

<style lang="postcss">
.employment {
  @apply
    flex
    flex-col
    hover:z-[1]
    hover:brightness-110
    overflow-hidden
    h-12
    cursor-pointer
    relative
    px-1
    border
    border-gray-900/70
    shadow-lg
    shadow-lime-600/20
}
.employer-name {
  @apply
    text-clip
}
</style>