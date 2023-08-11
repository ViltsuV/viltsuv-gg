<script lang="ts">
  /**
   * @description the arrow's the direction can be described by words 
   * or the number of degrees offset 
   */
  export let direction: 'up' | 'down' | 'left' | 'right' | number = 'right'
  // export let size: 'sm' | 'md' | 'lg' = 'md'
  export let classes: string = ''
  export let svg_fill: string = 'black'
  export let bg: boolean = false
  export let bg_fill = 'red'

  export let box_height: number = 10
  export let box_width: number = 10
  export let scale: number | undefined = 1

  let rotation: number

  $: if (typeof scale === 'number' && scale > 0) {
    box_height = box_height * scale
    box_width = box_width * scale
  }

  $: if (typeof direction === 'number') {
    rotation = direction
  }

  $: if (typeof direction === 'string') {
    if (direction === 'right') rotation = 0
    if (direction === 'down') rotation = 90
    if (direction === 'left') rotation = 180
    if (direction === 'up') rotation = 270
  }
</script>

<!-- @component An SVG arrow (triangle). Pointing right by default. -->

<!--
  Initial direction: pointing down
  rotated -90 degrees to point right (by default)
  translated 20% down
-->
<svg class="arrow {classes}" height={box_height} width={box_width}>
  {#if bg}
    <polygon 
      points="0,0 {box_width},0 {box_width},{box_height} 0,{box_height}" 
      fill={bg_fill}
    />
  {/if}
  <polygon 
    points="0,0 {box_width},0 {0.5 * box_width},{0.7 * box_height}" 
    fill={svg_fill}
    transform='
      rotate({rotation - 90},{box_width/2}, {box_height/2}),
      translate(0,{0.2 * box_height})
    '
  />
</svg>
