<script lang="ts">

</script>

<!-- Per-file main options:

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
  -disposition        disposition -->


<!-- Advanced per-file options:

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
  -dcodec codec       force data codec ('copy' to copy stream) -->

<style lang="postcss">

</style>