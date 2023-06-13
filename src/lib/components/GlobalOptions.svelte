<script lang="ts">
  import { global_options } from "$lib/stores"
</script>

<fieldset class="bordered"><legend>Global Options</legend>
  <!-- 

    Global options (affect whole program instead of just one file):

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
      -max_error_rate maximum error rate  ratio of decoding errors (0.0: no errors, 1.0: 100% errors) above which ffmpeg returns an error instead of success.


    Advanced global options:

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
      -filter_hw_device device  set hardware device used when filtering


    Per-file main options:

      -f fmt              force format
      -c codec            codec name
      -codec codec        codec name
      -pre preset         preset name
      -map_metadata outfile[,metadata]:infile[,metadata]  set metadata information of outfile from infile
      -t duration         record or transcode "duration" seconds of audio/video
      -to time_stop       record or transcode stop time
      -fs limit_size      set the limit file size in bytes
      -ss time_off        set the start time offset
      -sseof time_off     set the start time offset relative to EOF
      -seek_timestamp     enable/disable seeking by timestamp with -ss
      -timestamp time     set the recording timestamp ('now' to set the current time)
      -metadata string=string  add metadata
      -program title=string:st=number...  add program with specified streams
      -target type        specify target file type ("vcd", "svcd", "dvd", "dv" or "dv50" with optional prefixes "pal-", "ntsc-" or "film-")
      -apad               audio pad
      -frames number      set the number of frames to output
      -filter filter_graph  set stream filtergraph
      -filter_script filename  read stream filtergraph description from a file
      -reinit_filter      reinit filtergraph on input parameter changes
      -discard            discard
      -disposition        disposition


    Advanced per-file options:

      -map [-]input_file_id[:stream_specifier][,sync_file_id[:stream_specifier]]  set input stream mapping
      -map_channel file.stream.channel[:syncfile.syncstream]  map an audio channel from one stream to another (deprecated)
      -map_chapters input_file_index  set chapters mapping
      -accurate_seek      enable/disable accurate seeking with -ss
      -isync sync ref     Indicate the input index for sync reference
      -itsoffset time_off  set the input ts offset
      -itsscale scale     set the input ts scale
      -dframes number     set the number of data frames to output
      -re                 read input at native frame rate; equivalent to -readrate 1
      -readrate speed     read input at specified rate
      -shortest           finish encoding within shortest input
      -shortest_buf_duration  maximum buffering duration (in seconds) for the -shortest option
      -bitexact           bitexact mode
      -copyinkf           copy initial non-keyframes
      -copypriorss        copy or discard frames before start time
      -tag fourcc/tag     force codec tag/fourcc
      -q q                use fixed quality scale (VBR)
      -qscale q           use fixed quality scale (VBR)
      -profile profile    set profile
      -attach filename    add an attachment to the output file
      -dump_attachment filename  extract an attachment into a file
      -stream_loop loop count  set number of times input stream shall be looped
      -thread_queue_size  set the maximum number of queued packets from the demuxer
      -find_stream_info   read and decode the streams to fill missing information with heuristics
      -bits_per_raw_sample number  set the number of bits per raw sample
      -stats_enc_pre      write encoding stats before encoding
      -stats_enc_post     write encoding stats after encoding
      -stats_mux_pre      write packets stats before muxing
      -stats_enc_pre_fmt  format of the stats written with -stats_enc_pre
      -stats_enc_post_fmt  format of the stats written with -stats_enc_post
      -stats_mux_pre_fmt  format of the stats written with -stats_mux_pre
      -autorotate         automatically insert correct rotate filters
      -autoscale          automatically insert a scale filter at the end of the filter graph
      -muxdelay seconds   set the maximum demux-decode delay
      -muxpreload seconds  set the initial demux-decode delay
      -time_base ratio    set the desired time base hint for output stream (1:24, 1:48000 or 0.04166, 2.0833e-5)
      -enc_time_base ratio  set the desired time base for the encoder (1:24, 1:48000 or 0.04166, 2.0833e-5). two special values are defined - 0 = use frame rate (video) or sample rate (audio),-1 = match source time base
      -bsf bitstream_filters  A comma-separated list of bitstream filters
      -fpre filename      set options from indicated preset file
      -max_muxing_queue_size packets  maximum number of packets that can be buffered while waiting for all streams to initialize
      -muxing_queue_data_threshold bytes  set the threshold after which max_muxing_queue_size is taken into account
      -dcodec codec       force data codec ('copy' to copy stream)
    
    
    Video options:

      -vframes number     set the number of video frames to output
      -r rate             set frame rate (Hz value, fraction or abbreviation)
      -fpsmax rate        set max frame rate (Hz value, fraction or abbreviation)
      -s size             set frame size (WxH or abbreviation)
      -aspect aspect      set aspect ratio (4:3, 16:9 or 1.3333, 1.7777)
      -display_rotation angle  set pure counter-clockwise rotation in degrees for stream(s)
      -display_hflip      set display horizontal flip for stream(s) (overrides any display rotation if it is not set)
      -display_vflip      set display vertical flip for stream(s) (overrides any display rotation if it is not set)
      -vn                 disable video
      -vcodec codec       force video codec ('copy' to copy stream)
      -timecode hh:mm:ss[:;.]ff  set initial TimeCode value.
      -pass n             select the pass number (1 to 3)
      -vf filter_graph    set video filters
      -b bitrate          video bitrate (please use -b:v)
      -dn                 disable data


    Advanced Video options:
    
      -pix_fmt format     set pixel format
      -rc_override override  rate control override for specific intervals
      -passlogfile prefix  select two pass log file name prefix
      -psnr               calculate PSNR of compressed frames (deprecated, use -flags +psnr)
      -vstats             dump video coding statistics to file
      -vstats_file file   dump video coding statistics to file
      -vstats_version     Version of the vstats format to use.
      -intra_matrix matrix  specify intra matrix coeffs
      -inter_matrix matrix  specify inter matrix coeffs
      -chroma_intra_matrix matrix  specify intra matrix coeffs
      -top                top=1/bottom=0/auto=-1 field first
      -vtag fourcc/tag    force video tag/fourcc
      -qphist             show QP histogram
      -fps_mode           set framerate mode for matching video streams; overrides vsync
      -force_fps          force the selected framerate, disable the best supported framerate selection
      -streamid streamIndex:value  set the value of an outfile streamid
      -force_key_frames timestamps  force key frames at specified timestamps
      -hwaccel hwaccel name  use HW accelerated decoding
      -hwaccel_device devicename  select a device for HW acceleration
      -hwaccel_output_format format  select output format used with HW accelerated decoding
      -fix_sub_duration_heartbeat  set this video output stream to be a heartbeat stream for fix_sub_duration, according to which subtitles should be split at random access points
      -vbsf video bitstream_filters  deprecated
      -vpre preset        set the video options to the indicated preset


    Audio options:

      -aframes number     set the number of audio frames to output
      -aq quality         set audio quality (codec-specific)
      -ar rate            set audio sampling rate (in Hz)
      -ac channels        set number of audio channels
      -an                 disable audio
      -acodec codec       force audio codec ('copy' to copy stream)
      -ab bitrate         audio bitrate (please use -b:a)
      -af filter_graph    set audio filters

      Advanced Audio options:
      -atag fourcc/tag    force audio tag/fourcc
      -sample_fmt format  set sample format
      -channel_layout layout  set channel layout
      -ch_layout layout   set channel layout
      -guess_layout_max   set the maximum number of channels to try to guess the channel layout
      -absf audio bitstream_filters  deprecated
      -apre preset        set the audio options to the indicated preset


    Subtitle options:

      -s size             set frame size (WxH or abbreviation)
      -sn                 disable subtitle
      -scodec codec       force subtitle codec ('copy' to copy stream)
      -stag fourcc/tag    force subtitle tag/fourcc
      -fix_sub_duration   fix subtitles duration
      -canvas_size size   set canvas size (WxH or abbreviation)
      -spre preset        set the subtitle options to the indicated preset


  -->

  <!-- -hwaccel cuda (choose appropriate hw accelerator)<br/> -->
  <!-- -hwaccel_output_format cuda (keep decoded frames in GPU memory for faster transcode) -->
</fieldset>

<style lang="postcss">
  
  fieldset {
    @apply pl-2 pb-2 pr-2;
  }
  legend {
    @apply text-tertiary-500 text-lg px-1
  }
  .bordered {
    @apply border border-tertiary-500
  }
</style>