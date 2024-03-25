<script lang="ts">
  export let transition_timing_function = 'ease'
  export let transition_duration = '0.15s'
  export let expanded: boolean = true
  export let classes: string = ''
  export let overflow: 'hidden' | 'auto' | 'visible' | 'clip' | 'scroll' = 'hidden'
</script>

<div class="expandable {expanded ? 'expanded' : ''} {classes}"
  style="transition: grid-template-rows {transition_duration} {transition_timing_function};"
>
  <div style="overflow: {overflow};">
    <slot>
      <div>[no content provided to expandable]</div>
    </slot>
  </div>
</div>

<style lang="postcss">
  .expandable {
    display: grid;
    grid-template-rows: 0fr;
    /* transition: grid-template-rows 0.5s ease-out; */
  }

  .expandable.expanded {
    grid-template-rows: 1fr;
  }
</style>
