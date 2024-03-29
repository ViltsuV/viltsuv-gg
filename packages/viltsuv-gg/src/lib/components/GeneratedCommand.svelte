<script lang="ts">
	import Expandable from '$lib/components/Expandable.svelte'
  import { command } from '$lib/stores'

  export let show_info_and_usage: boolean = true
  
  // global options
  $: global_options_overwriting = 
    $command.global_options.overwriting === 'never'
    ? '-n'
    : $command.global_options.overwriting === 'always'
      ? '-y'
      : '' // ask

  // advanced global options
  $: global_options_hide_banner = $command.global_options.advanced.hide_banner === true ? '-hide_banner' : ''

  $: global_options_array = [
    global_options_overwriting,
    global_options_hide_banner
  ]
</script>

<h4 class="mt-4">Generated command:</h4>

<pre class="generated-command">
<span>ffmpeg </span>
{#if $command.global_options.use_global_options}
  {#each global_options_array as global_option}
    <span class="cmd-global-options"> {global_option}</span>
  {/each}
  <!-- 1 space after global options -->
  <span class="cmd-global-options"> </span>
{/if}

{#each $command.inputs as input}
  {#if input.per_file_main_options.vn === true}
    <span class="cmd_per_file_input_video_options">-vn </span>
  {:else}
    {#if input.per_file_main_options.ss}<span class="cmd_per_file_input_video_options">-ss {input.per_file_main_options.ss.toFixed(2)} </span>{/if}
    {#if input.per_file_main_options.sseof}<span 
        class="cmd_per_file_input_video_options"
        title={input.per_file_main_options.ss > 0 ? '-ss option will override -sseof if both are specified' : ''}
        style={input.per_file_main_options.ss > 0 ? 'color: gray;' : ''}
      >-sseof -{input.per_file_main_options.sseof.toFixed(2)} </span>{/if}
    {#if input.per_file_main_options.c.v.value}<span class="cmd_per_file_input_video_options">-c:v {input.per_file_main_options.c.v.value}</span>{/if}
    {#if input.per_file_main_options.t}<span class="cmd_per_file_input_video_options">-t {input.per_file_main_options.t.toFixed(2)} </span>{/if}
    {#if input.per_file_main_options.to}<span 
        class="cmd_per_file_input_video_options"
        title={input.per_file_main_options.t > 0 ? '-t option will override -to if both are specified' : ''}
        style={input.per_file_main_options.t > 0 ? 'color: gray;' : ''}
      >-to {input.per_file_main_options.to.toFixed(2)} </span>{/if}
    <!-- TODO: the rest of the input options -->
  {/if}
  <!-- TODO: per-stream input options -->
  <!-- {#each input.streams as stream}
    <span>per_stream_input_options for {stream.type} stream[{stream.index}] </span>
  {/each} -->
  <span class="cmd-input-file">{`-i ${input.url} `}</span>
{/each}

{#each $command.outputs as output}
  {#if output.per_file_main_options.vn === true}
    <span class="cmd_output_per_file_main_options">-vn </span>
  {:else}
    {#if output.per_file_main_options.ss}<span class="cmd_output_per_file_main_options">-ss {output.per_file_main_options.ss} </span>{/if}
    {#if output.per_file_main_options.t}<span class="cmd_output_per_file_main_options">-t {output.per_file_main_options.t} </span>{/if}
    {#if output.per_file_main_options.metadata.length > 0}<span class="cmd_output_per_file_main_options">-metadata {output.per_file_main_options.metadata} </span>{/if}
    {#if output.per_file_main_options.timestamp}<span class="cmd_output_per_file_main_options">-timestamp {output.per_file_main_options.timestamp} </span>{/if}
    {#if output.per_file_main_options.to}<span class="cmd_output_per_file_main_options">-to {output.per_file_main_options.to} </span>{/if}
    {#if output.per_file_main_options.f}<span class="cmd_output_per_file_main_options">-f {output.per_file_main_options.f} </span>{/if}
    {#if output.per_file_main_options.c.v.value}<span class="cmd_output_per_file_main_options">-c:v {output.per_file_main_options.c.v.value} </span>{/if}
    {#if output.per_file_main_options.c.v.value === 'libx264'}
      {#if output.per_file_main_options.c.v.encoder_options.libx264.rate_control.mode === 'crf'}
        <span class="cmd_output_per_file_main_options">-crf {output.per_file_main_options.c.v.encoder_options.libx264.crf.value} </span>
      {/if}
      {#if output.per_file_main_options.c.v.encoder_options.libx264.rate_control.mode === 'abr'}
        <span class="cmd_output_per_file_main_options">-b:v {
          output.per_file_main_options.c.v.encoder_options.libx264.abr.value}{
          output.per_file_main_options.c.v.encoder_options.libx264.abr.unit} </span>
      {/if}
      {#if output.per_file_main_options.c.v.encoder_options.libx264.preset.value !== 'default'}
        <span class="cmd_output_per_file_main_options">-preset {output.per_file_main_options.c.v.encoder_options.libx264.preset.value} </span>
      {/if}
      {#if output.per_file_main_options.c.v.encoder_options.libx264.profile.value !== 'default'}
        <span class="cmd_output_per_file_main_options">-profile:v {output.per_file_main_options.c.v.encoder_options.libx264.profile.value} </span>
      {/if}
      {#if output.per_file_main_options.c.v.encoder_options.libx264.tune.value !== 'default'}
        <span class="cmd_output_per_file_main_options">-tune {output.per_file_main_options.c.v.encoder_options.libx264.tune.value} </span>
      {/if}
      {#if output.per_file_main_options.c.v.encoder_options.libx264.level.value !== 'auto'}
        <span class="cmd_output_per_file_main_options">-level {output.per_file_main_options.c.v.encoder_options.libx264.level.value} </span>
      {/if}
      {#if output.per_file_main_options.c.v.encoder_options.libx264.constrain_bitrate && output.per_file_main_options.c.v.encoder_options.libx264.max_bitrate.value > 0}
        <span class="cmd_output_per_file_main_options">-maxrate {
          output.per_file_main_options.c.v.encoder_options.libx264.max_bitrate.value}{
          output.per_file_main_options.c.v.encoder_options.libx264.max_bitrate.unit} </span>
        <span class="cmd_output_per_file_main_options">-bufsize {
          output.per_file_main_options.c.v.encoder_options.libx264.buffer_size.value}{
          output.per_file_main_options.c.v.encoder_options.libx264.buffer_size.unit} </span>
      {/if}
    {/if}
  {/if}
  {#if output.per_file_main_options.an === true}
    <span class="cmd_output_per_file_main_options">-an </span>
  {:else}
    {#if output.per_file_main_options.c.a.value}<span class="cmd_output_per_file_main_options">-c:a {output.per_file_main_options.c.a.value} </span>{/if}
    {#if output.per_file_main_options.c.a.value === 'aac'}
      {#if output.per_file_main_options.c.a.encoder_options.aac.bitrate !== 'default'}<span class="cmd_output_per_file_main_options">-b:a {output.per_file_main_options.c.a.encoder_options.aac.bitrate}k </span>{/if}
    {/if}
  {/if}
  <!-- <span class="cmd-output-file-options">{`${output.per_file_main_options} `}</span> -->
  <span class="cmd-output-file">{output.url}.{output.per_file_main_options.container.selected_container}</span>
{/each}
</pre>

<button
  type="button"
  class="btn variant-filled-surface my-4"
  on:click={() => { show_info_and_usage = !show_info_and_usage }}
>
  { show_info_and_usage === true ? 'hide' : 'show' } info & usage
</button>

<Expandable expanded={show_info_and_usage}>
  <div class="info-and-usage">
    <fieldset><legend>FFMPEG command structure</legend>
      <pre class="ffmpeg-command-structure"><span 
        class="executable"         >ffmpeg </span><span 
        class="global_options"     >[global_options] </span><span 
        class="input_file"         >{'{'}</span><span 
        class="input_file_options" >[input_file_options] </span><span 
        class="input_file"         >{'-i input_file} '}</span><span 
        class="output_file"        >{'{'}</span><span 
        class="output_file_options">[output_file_options] </span><span 
        class="output_file"        >{'output_file}'}</span></pre>
      
      <!-- For example:
      <pre class="example-command">ffmpeg -i input_file.mp4 -b:v 64k -bufsize 64k output_file.mp4</pre>
      Your options:<br /><br />
      <div class="table-container">
        <table class="table table-hover">
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>global options</td>				
              <td class="cmd-global-options" style="color: #fdabc7">a</td>
            </tr>
            <tr>
              <td>input options</td>	
              <td class="cmd-input-file-options" style="color: #aed5fc">a</td>
            </tr>
            <tr>
              <td>input path / file</td>					
              <td class="cmd-input-file" style="color: #2b9eff">a</td>
            </tr>
            <tr>
              <td>output options</td>	
              <td class="cmd-output-file-options" style="color: #9ff28c">a</td>
            </tr>
            <tr>
              <td>output path / file</td>						
              <td class="cmd-output-file" style="color: #41f218">a</td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </fieldset>
  </div>
</Expandable>
<style lang="postcss">
  pre {
    /* prod */
    /* works great in chrome, not so great in firefox */
    display: inline-table;

    /* during dev */
    /* display: grid; */
  }
  span {
    white-space: wrap;
  }
  fieldset {
    @apply pl-2 pb-2 pr-2;
  }
  /* legend {
    @apply text-tertiary-500 text-lg
  } */
  .global_options, .cmd-global-options {
    background-color: rgba(255, 126, 253, 0.2);
    color: rgb(254, 173, 253);
  }
  .input_file, .cmd-input-file {
    background-color: rgba(43, 158, 255, 0.2);
    color: rgba(43, 158, 255, 1);
  }
  .input_file_options, .cmd-input-file-options, .cmd_per_file_input_video_options {
    background-color: rgba(43, 158, 255, 0.2);
    color: rgb(193, 224, 255);
  }
  .output_file, .cmd-output-file {
    background-color: rgba(65, 242, 24, 0.2);
    color: rgb(65, 242, 24);
  }
  .output_file_options, .cmd-output-file-options, .cmd_output_per_file_main_options {
    background-color: rgba(65, 242, 24, 0.2);
    color: rgb(211, 255, 201);
  }
  /* .info-and-usage {
    @apply bg-surface-400-500-token;
    
  } */
</style>