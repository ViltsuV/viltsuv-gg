<script lang="ts">
	import type { FFMPEG_GlobalOptions } from "$lib/types"
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton"
	import Expandable from "$lib/components/Expandable.svelte"
  
  export let options: FFMPEG_GlobalOptions

  let global_options_tooltip = 'use global options'
</script>



<fieldset class:bordered={options.use_global_options} class="mt-3">
  <legend>
    <div class="flex flex-row items-center justify-center">
      <input class="checkbox" type="checkbox" bind:checked={options.use_global_options}>
      <div class="flex flex-row pl-2">
        <div title={global_options_tooltip}>Global Options</div>
      </div>
    </div>
  </legend>
  <Expandable expanded={options.use_global_options}>

    <!-- Global options (affects the whole program instead of just one file):

      -loglevel loglevel  set logging level
      -v loglevel         set logging level
      -report             generate a report
      -max_alloc bytes    set maximum size of a single allocated block
      -y                  overwrite output files
      -n                  never overwrite output files
      -ignore_unknown     Ignore unknown stream types
      -filter_threads     number of non-complex filter threads
      -filter_complex_threads  number of threads for -filter_complex
      -stats              print progress report during encoding
      -max_error_rate maximum error rate  ratio of decoding errors (0.0: no errors, 1.0: 100% errors) above which ffmpeg returns an error instead of success. -->

      <div class="flex flex-row items-center">
        <div class="mr-3">Overwrite output files? </div>
        <RadioGroup active="variant-filled-tertiary" hover="hover:variant-soft-primary">
          <RadioItem bind:group={options.overwriting} name="overwriting" value={'ask'} >Ask</RadioItem>
          <RadioItem bind:group={options.overwriting} name="overwriting" value={'never'} >Never</RadioItem>
          <RadioItem bind:group={options.overwriting} name="overwriting" value={'always'} >Always</RadioItem>
        </RadioGroup>
      </div>

    <!-- Advanced global options:

      -cpuflags flags     force specific cpu flags
      -cpucount count     force specific cpu count
      -hide_banner hide_banner  do not show program banner
      -copy_unknown       Copy unknown stream types
      -recast_media       allow recasting stream type in order to force a decoder of different media type
      -benchmark          add timings for benchmarking
      -benchmark_all      add timings for each task
      -progress url       write program-readable progress information
      -stdin              enable or disable interaction on standard input
      -timelimit limit    set max runtime in seconds in CPU user time
      -dump               dump each input packet
      -hex                when dumping packets, also dump the payload
      -vsync              set video sync method globally; deprecated, use -fps_mode
      -frame_drop_threshold   frame drop threshold
      -adrift_threshold threshold  audio drift threshold
      -copyts             copy timestamps
      -start_at_zero      shift input timestamps to start at 0 when using copyts
      -copytb mode        copy input stream time base when stream copying
      -dts_delta_threshold threshold  timestamp discontinuity delta threshold
      -dts_error_threshold threshold  timestamp error delta threshold
      -xerror error       exit on error
      -abort_on flags     abort on the specified condition flags
      -filter_complex graph_description  create a complex filtergraph
      -lavfi graph_description  create a complex filtergraph
      -filter_complex_script filename  read complex filtergraph description from a file
      -auto_conversion_filters  enable automatic conversion filters globally
      -stats_period time  set the period at which ffmpeg updates stats and -progress output
      -debug_ts           print timestamp debugging info
      -psnr               calculate PSNR of compressed frames (deprecated, use -flags +psnr)
      -vstats             dump video coding statistics to file
      -vstats_file file   dump video coding statistics to file
      -vstats_version     Version of the vstats format to use.
      -qphist             show QP histogram
      -sdp_file file      specify a file in which to print sdp information
      -qsv_device device  set QSV hardware device (DirectX adapter index, DRM path or X11 display name)
      -init_hw_device args  initialise hardware device
      -filter_hw_device device  set hardware device used when filtering -->



    
    


  </Expandable>
</fieldset>

<style lang="postcss">
  .checkbox:checked {
    @apply bg-tertiary-500;
  }
  fieldset {
    @apply pl-2 pb-2 pr-2;
    border-width: 1px;
    border-color: transparent;
  }
  legend {
    @apply text-tertiary-500 text-lg px-1
  }
  .bordered {
    @apply border border-tertiary-500
  }
</style>