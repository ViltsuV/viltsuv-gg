<script lang="ts">
	import type { Employer, Employment } from '$lib/types'
  import { 
    mock_work_history_data, 
    year_width, 
    showing_wht_control_panel,
    employer_employments,
    sorted_employers_descending
  } from '$lib/stores'
  import EmploymentBlock from '$lib/components/EmploymentBlock.svelte'
	import WorkHistoryTimelineControlPanel from '$lib/components/WorkHistoryTimelineControlPanel.svelte'
	import Expandable from '$lib/components/Expandable.svelte'

  /**
   * @returns today's date string in yyyy-mm-dd -format
   */
  function get_todays_date_string() {
    let date_string = new Date().toISOString().substring(0, 10)
    return date_string
  }

  function sort_employments(
    time: 'start' | 'end' = 'start',
    order: 'descending' | 'ascending' = 'descending',
    employments: Employment[]
   ): Employment[] {
    // default sorting, the most recently started employment first
    if (time === 'start' && order === 'descending')
      return employments.sort((a, b) => Date.parse(b.start_time) - Date.parse(a.start_time))
    if (time === 'start' && order === 'ascending')
      return employments.sort((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time))
    if (time === 'end' && order === 'descending') {
      return employments.sort((a, b) => {
        if (a.end_time === '') {a.end_time = get_todays_date_string()}
        if (b.end_time === '') {b.end_time = get_todays_date_string()}
        return Date.parse(b.end_time) - Date.parse(a.end_time)
      })
    }
    if (time === 'end' && order === 'ascending') {
      return employments.sort((a, b) => {
        if (a.end_time === '') {a.end_time = get_todays_date_string()}
        if (b.end_time === '') {b.end_time = get_todays_date_string()}
        return Date.parse(a.end_time) - Date.parse(b.end_time)
      })
    }
    throw Error('invalid function parameters')
  }

  let employments_by_start_time_descending: Employment[] = sort_employments('start', 'descending', JSON.parse(JSON.stringify($mock_work_history_data.employments)))
  let employments_by_start_time_ascending: Employment[] = sort_employments('start', 'ascending', JSON.parse(JSON.stringify($mock_work_history_data.employments)))
  // let employments_by_end_time_descending: Employment[] = sort_employments('end', 'descending', JSON.parse(JSON.stringify($mock_work_history_data.employments)))
  // let employments_by_end_time_ascending: Employment[] = sort_employments('end', 'ascending', JSON.parse(JSON.stringify($mock_work_history_data.employments)))


  let sorted_employers_descending_set: Set<Employer> = new Set()
  
  employments_by_start_time_descending.forEach( (employment) => {
    let employer_name_array: string[] = []
    sorted_employers_descending_set.forEach((employer) => {
      employer_name_array.push(employer.name)
    })
    if (!employer_name_array.includes(employment.employer.name)) {
      sorted_employers_descending_set.add(employment.employer)
    }
  })

  $: $sorted_employers_descending = Array.from(sorted_employers_descending_set)

  $: first_started_employment = employments_by_start_time_ascending[0]
  // $: last_started_employment = employments_by_start_time_descending[0]
  // $: first_ended_employment = employments_by_end_time_descending[0]
  // $: last_ended_employment = employments_by_end_time_ascending[0]

  $: timeline_start_year = new Date(first_started_employment.start_time).getFullYear()
  $: current_year = new Date(Date.now()).getFullYear()

  let employment_years: number[] = []

  $: for (let i = current_year; i >= timeline_start_year; i--) {
    employment_years.push(i)
  }

  $: for (let i = 0; i < $sorted_employers_descending.length; i++) {
    $employer_employments[$sorted_employers_descending[i].name] = []
  }

  $: for (let i = 0; i < employments_by_start_time_descending.length; i++) {
    if (!$employer_employments[employments_by_start_time_descending[i].employer.name]) {
      $employer_employments[employments_by_start_time_descending[i].employer.name] = []
    }
    $employer_employments[employments_by_start_time_descending[i].employer.name].push(employments_by_start_time_descending[i])
  }

  function get_current_year_progression() {
    let current_year = new Date(Date.now()).getFullYear()
    let current_year_start = Date.parse(`${current_year}-01-01`)
    return parseFloat((((Date.now() - current_year_start) / 1000 / 60 / 60 / 24) / 365 ).toFixed(2))
  }

  $: current_year_width = get_current_year_progression() * $year_width

  function get_time_block_width(start_time: string, end_time: Employment['end_time'], year_width: number) {
    let days = (Date.parse(start_time) - Date.parse(end_time)) / 1000 / 60 / 60 / 24
    let one_day_width = year_width / 365
    return one_day_width * days + 'px'
  }

  $: console.log(
    'reactive log:',
    {
      'employments_by_start_time_descending': employments_by_start_time_descending,
      '$sorted_employers_descending': $sorted_employers_descending,
      '$employer_employments': $employer_employments
    }
  )

</script>


<button type="button" class="btn-sm variant-ghost-surface"
  on:click={() => $showing_wht_control_panel = !$showing_wht_control_panel}
>
  Filters / Controls
</button>
<WorkHistoryTimelineControlPanel employers={$sorted_employers_descending} />
<div class="work-history-timeline flex">
  <div class="employers flex flex-col px-2">
    <div class="employers-column-header">
      Employer
    </div>
    {#if $sorted_employers_descending.length > 0}
      {#each $sorted_employers_descending as employer}
        <Expandable expanded={employer.visible} classes='min-w-max'>
          <div class="employer">{employer.name}</div>
        </Expandable>
      {/each}
    {/if}
  </div>

  <div class="years-and-employments flex flex-col">
    <div class="years flex flex-row">
      {#each employment_years as year, year_index}
        <div class="year flex" style="min-width: {year_index === 0 ? current_year_width : $year_width}px;">
          <div>{year}</div>
        </div>
      {/each}
    </div>
    {#if $sorted_employers_descending.length > 0}
      {#each $sorted_employers_descending as employer, employer_i}
        <Expandable expanded={$sorted_employers_descending[employer_i].visible} classes='min-w-max'>
          <div class="employer-employments { $sorted_employers_descending[employer_i].class_name }">
            {#each $employer_employments[$sorted_employers_descending[employer_i].name] as employment, employment_i}
              {#if employment_i === 0} <!-- most recent employment at employer-->
                <!-- time between today and last employment day at employer -->
                <div class="time-block"
                  style="min-width: {get_time_block_width(
                    get_todays_date_string(), 
                    employment.end_time,
                    $year_width
                  )};"
                >
                </div>
                <!-- most recent employment -->
                <EmploymentBlock {employment} /> 
              {:else} <!-- other past employer employments -->
                <!-- time between today and last employment day at employer -->
                <div class="time-block" 
                  style="min-width: {get_time_block_width(
                    $employer_employments[$sorted_employers_descending[employer_i].name][employment_i - 1].start_time, 
                    employment.end_time,
                    $year_width
                  )};"></div>
                <!-- most recent employment -->
                <EmploymentBlock {employment} /> 
              {/if}
            {/each}
            <div class="time-block flex-grow last"></div>
          </div>
        </Expandable>
      {/each}
    {/if}
  </div>

  <div class="flex-grow"><!-- fill remaining space--></div>

</div>

<style lang="postcss">
  .work-history-timeline {
    @apply
      flex-nowrap
      py-6
  }
  .employers {
    @apply mr-3
  }
  .employers-column-header {
    @apply h-8
  }
  .employer {
    @apply 
      min-w-max
      py-3 
      items-center
  }
  .employer-employments {
    @apply
      flex 
      flex-row
  }
  /* .employer-employments:last-child {
    @apply pb-2
  } */
  .employment {
    @apply
      hover:z-[999]
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
  .year {
    @apply
      justify-end
      text-right
      items-center
      overflow-hidden
      border-r
      border-t
      border-surface-900
      dark:border-surface-400
      bg-surface-200
      dark:bg-surface-600
      pr-2
  }
  .year div {
    @apply 
      pb-0.5
      items-center
      justify-center
  }
  .years {
    @apply
      justify-between
      h-8
  }
  .years-and-employments {
    @apply
      ml-3
      overflow-auto
      border-r
      border-l
      border-b
      border-tertiary-500/20
  }
</style>
