/**
 * @description utility type to view nested types
 */
export type ExpandType<T> = {
  [K in keyof T]: T[K]
} & {}

export type User = {
  email: string,
  username: string
}

export type Project = {
  name: string
  /**
   * @description who is the project's owner?
   */
  owner: string
  link: Link
  screenshot: Image
  /**
   * @description a description of 
   * - what the project is
   * - what is/was your involvement level?
   */
  description: string
  /**
   * @description the url slug to the project's page in lower case kebab-case
   * @example "url-slug-in-kebab-case"
   */
  slug: string
  activity_periods: ActivityPeriod[]
  /**
   * @description if you joined the project while it had already started, when did you join?
   */
  join_time: string
  technologies: Technology[]
  tools: Tool[]
  /**
   * @description if the project was made while working for a company, which company?
   */
  company_name: string
  expanded: boolean
}

export type ActivityPeriod = {
  /**
   * @description year-month-day
   * @example 2023-05-01
   */
  start_time: string
  /**
   * @description year-month-day
   * @example 2023-05-01
   */
  end_time: string
}

export type TechnologyType = 'frontend' | 'backend' | 'database' | 'api' | 'service'

export type Technology = {
  type: TechnologyType
  name: string
  /**
   * @description a link to the technology's home page
   */
  link: Link
  icon: {
    src: string
  }
}

export type IndustryKnowledge = {
  name: string
}

export type Projects = Project[]

export type WorkHistoryTimeline = {
  employments: Employment[]
}

export type Employment = {
  employer: Employer
  role: Role
  start_time: string
  end_time: string
  active: boolean
  time_type: 'full-time' | 'part-time' | 'internship' | 'gig work'
  work_location: 'on-premise' | 'remote' | 'hybrid'
  projects: Project[]
  tools: Tool[]
  technologies: Technology[]
  achievements: string[]
  things_learned: string[]
}

export type Employer = {
  name: string
  link: Link
  class_name: string
  color: {
    primary: string
    primary_dark: string
    secondary: string
    secondary_dark: string
  }
  visible: boolean
}

export type EmployerEmployments = {
  [employer_name: Employer['name']]: Employment[]
}

export type Role = {
  /**
   * @example software developer
   */
  title: string
  /**
   * @description The job description in a nutshell.
   * Displayed as bullet points.
   */
  description: string[]
  required_experience: 'entry-level' | 'mid-level' | 'senior'
  responsibilities: string[]
}

export type Tool = {
  name: string
  /**
   * @example 'software development' | 'AV-production' | 
   * 'project management' | 'documentation'
   */
  purposes: string[]
  link: Link
}

export type Link = {
  href: string
  text: string
}

export type Image = {
  href: string,
  alt: string
}

export type Interests = Interest[]

export type Interest =  {
  name: string
  start_time: string
  end_time: string
}

export type Certificates = Certificate[]

export type Certificate = {
  name: string
  completion_date: string
  link: Link
}

export type Hobbies = Hobby[]

export type Hobby = {
  name: string
  start_time: string
  /**
   * @example 'beginner' | 'novice' | 'experienced' | 'pro'
   */
  proficiency_level: string
  /**
   * @example 'daily' | 'weekly' | 'monthly' | 'yearly' | '3 times / week'
   */
  activity_level: string
}

// FFMPEG-Command-Generator

export type FFMPEG_Command = {
  global_options: FFMPEG_GlobalOptions
  inputs: FFMPEG_Input[]
  outputs: FFMPEG_Output[]
}

/** 
 * @description represents supported FFMPEG's global options.
   
  Global options (affects the whole program instead of just one file):

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
 */
export type FFMPEG_GlobalOptions = {
  /**
   * @description
   */
  use_global_options: boolean
  /**
   * @description what ffmpeg should do about conflicting output files
   * @example 'ask' (default) adds nothing to the command
   * 'never' adds -n
   * 'always' adds -y
   */
  overwriting: 'ask' | 'never' | 'always'
  /**
   * @description print progress report during encoding
   */
  stats: boolean
  advanced: FFMPEG_AdvancedGlobalOptions
}

/**
 * @description represents supported FFMPEG's advanced global options.

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
 */
export type FFMPEG_AdvancedGlobalOptions = {
  /**
   * @description stops ffmpeg from printing configuration details etc.
   */
  hide_banner: boolean
}

/**
 * @description common per-file options that both inputs and outputs can have.
 * This is extended to input and output specific types.
 */
export type FFMPEG_CommonPerFileMainOptions = {
  /**
   * @description disable video for the input or output.
   * This is an input/output level flag that can be set
   * per input or output for all streams
   * @kind (input/output)
   */
  vn: boolean | null
  /**
   * @description disable audio for the input or output.
   * This is an input/output level flag that can be set
   * per input or output for all streams
   * @kind (input/output)
   */
  an: boolean | null
  /**
   * @description force input/output format
   * input: normally auto detected for input files
   * output: guessed from the file extension for output files
   * so this option is not needed in most cases
   * @kind (input/output)
   */
  f: string | null
  /**
   * @description record or transcode "duration" seconds of audio/video (see FFMPEG_TimeUnit)
   * 
   * note: -to and -t are mutually exclusive and -t has priority
   * 
   * @kind (input/output)
   * @example
   * as input option:
   * limit the duration of data read from the input file
   * 
   * as output option: 
   * stop writing the output after its duration reaches duration
   */
  t: FFMPEG_Time
  /**
   * @description record or transcode stop time (see FFMPEG_TimeUnit).
   * 
   * - input: Stop reading the input at position
   * 
   * - output: Stop writing the output at position
   * 
   * note: -to and -t are mutually exclusive and -t has priority
   * 
   * @kind (input/output)
   * @example stop writing 60s from beginning of file
   * 
   * ffmpeg -i input -to 60 -c copy output
   */
  to: FFMPEG_Time | null
  /**
   * @docs https://ffmpeg.org/ffmpeg-all.html#Main-options
   * @description set the start time offset (see FFMPEG_TimeUnit)
   * @kind (input/output)
   * 
   */
  ss: FFMPEG_Time
  advanced: FFMPEG_AdvancedPerFileMainOptions
}

export type FFMPEG_OutputPerFileMainOptions = 
  FFMPEG_CommonPerFileMainOptions & {
    container: {
      selected_container: Container
      selected_audio_container: AudioContainer
      selected_video_container: VideoContainer
    }
    /**
     * @description Select an encoder (when used before an output file) 
     * for one or more streams. 
     * codec is the name of a encoder or a special value copy (output only) 
     * to indicate that the stream is not to be re-encoded.
     * @kind (input/output,per-stream)
     * @example 
     * // for output: use 'aac' and 'libx264' encoders for all audio & video streams
     * ffmpeg -i INPUT -c:a aac -c:v libx264 OUTPUT.mp4
     */
    c: {
      v: {
        encoder_options: FFMPEG_VideoEncoderOptions
        value: VideoEncoders
      }
      a: {
        encoder_options: FFMPEG_AudioEncoderOptions
        value: AudioEncoders
      }
      s?: null | string // todo subtitles
      d?: null | string // todo data streams
    }
    /**
     * @description set the recording timestamp ('now' to set the current time)
     * @kind (output)
     */
    timestamp?: FFMPEG_Date | 'now' | null
    /**
     * @description add metadata to transcoded file.
     * @kind (output,per-metadata)
     * @example -metadata key=value
     * -metadata title="my title"
     * 
     * set the language of the first audio stream
     * -metadata:s:a:0 language=eng
     */
    metadata: string[]
  }

export type FFMPEG_InputPerFileMainOptions =
  FFMPEG_CommonPerFileMainOptions & {
    /**
     * @description Select a decoder for an input file for one or more streams. 
     * Codec is the name of a decoder. Decoders don't need to be specified, 
     * but this should be an option eventually for the cases when a decoder needs 
     * to be specified (e.g. hw accelerated decoding).
     * @kind (input/output,per-stream)
     * @example 
     * // for input: use 'aac' and 'h264_cuvid' decoders for all audio & video streams
     * ffmpeg -c:a aac -c:v h264_cuvid -i INPUT
     */
    c: {
      v: {
        decoder_options: FFMPEG_VideoDecoderOptions
        value: VideoDecoders
      }
      a: {
        decoder_options: FFMPEG_AudioDecoderOptions
        value: AudioDecoders
      }
      s?: null | string // todo subtitles
      d?: null | string // todo data streams
    }
    /**
     * @description set the start time offset relative to EOF (see FFMPEG_TimeUnit).
     * Like the -ss option but relative to the "end of file". That is negative values are earlier in the file, 0 is at EOF.
     * @kind (input)
     */
    sseof: FFMPEG_Time
    advanced: FFMPEG_AdvancedPerFileMainOptions
  }

// /**
//  * @description represents supported FFMPEG's per-file main options.

//   Per-file main options:

//     -f fmt              force format

//     -c codec            codec name

//     -codec codec        codec name

//     -pre preset         preset name

//     -map_metadata outfile[,metadata]:infile[,metadata]  set metadata information of outfile from infile

//     -t duration         record or transcode "duration" seconds of audio/video

//     -to time_stop       record or transcode stop time

//     -fs limit_size      set the limit file size in bytes

//     -ss time_off        set the start time offset

//     -sseof time_off     set the start time offset relative to EOF

//     -seek_timestamp     enable/disable seeking by timestamp with -ss

//     -timestamp time     set the recording timestamp ('now' to set the current time)

//     -metadata string=string  add metadata

//     -program title=string:st=number...  add program with specified streams

//     -target type        specify target file type ("vcd", "svcd", "dvd", "dv" or "dv50" with optional prefixes "pal-", "ntsc-" or "film-")

//     -apad               audio pad

//     -frames number      set the number of frames to output

//     -filter filter_graph  set stream filtergraph

//     -filter_script filename  read stream filtergraph description from a file

//     -reinit_filter      reinit filtergraph on input parameter changes

//     -discard            discard

//     -disposition        disposition
//  */
// export type FFMPEG_PerFileMainOptions = {
//   /**
//    * @description Select an encoder (when used before an output file) 
//    * or a decoder (when used before an input file) for one or more streams. 
//    * codec is the name of a decoder/encoder or a special value copy (output only) 
//    * to indicate that the stream is not to be re-encoded.
//    * @kind (input/output,per-stream)
//    * @example 
//    * // for input: use 'aac' and 'h264_cuvid' decoders for all audio & video streams
//    * ffmpeg -c:a aac -c:v h264_cuvid -i INPUT
//    * // for output: use 'aac' and 'libx264' encoders for all audio & video streams
//    * ffmpeg -i INPUT -c:a aac -c:v libx264 OUTPUT.mp4
//    */
//   c: {
//     v: {
//       encoder_options: FFMPEG_VideoEncoderOptions
//       decoder_options?: FFMPEG_VideoDecoderOptions
//       value: VideoEncoders
//     }
//     a?: {
//       encoder_options?: FFMPEG_AudioEncoderOptions
//       decoder_options?: FFMPEG_AudioDecoderOptions | null | string
//       value: VideoEncoders | null | string
//     }
//     s?: null | string // todo subtitles
//     d?: null | string // todo data streams
//   }
//   /**
//    * @description disable video for the input or output.
//    * This is an input/output level flag that can be set
//    * per input or output for all streams
//    */
//   vn: boolean | null
//   /**
//    * @description disable audio for the input or output.
//    * This is an input/output level flag that can be set
//    * per input or output for all streams
//    */
//   an: boolean | null
//   /**
//    * @description force input/output format
//    * input: normally auto detected for input files
//    * output: guessed from the file extension for output files
//    * so this option is not needed in most cases
//    * @kind (input/output)
//    */
//   f: string | null
//   /**
//    * @description record or transcode "duration" seconds of audio/video (see FFMPEG_TimeUnit)
//    * 
//    * note: -to and -t are mutually exclusive and -t has priority
//    * 
//    * @kind (input/output)
//    * @example
//    * as input option:
//    * limit the duration of data read from the input file
//    * 
//    * as output option: 
//    * stop writing the output after its duration reaches duration
//    */
//   t: FFMPEG_Time | null
//   /**
//    * @description record or transcode stop time (see FFMPEG_TimeUnit).
//    * 
//    * - input: Stop reading the input at position
//    * 
//    * - output: Stop writing the output at position
//    * 
//    * note: -to and -t are mutually exclusive and -t has priority
//    * 
//    * @kind (input/output)
//    * @example stop writing 60s from beginning of file
//    * 
//    * ffmpeg -i input -to 60 -c copy output
//    */
//   to: FFMPEG_Time | null
//   /**
//    * @docs https://ffmpeg.org/ffmpeg-all.html#Main-options
//    * @description set the start time offset (see FFMPEG_TimeUnit)
//    * @kind (input/output)
//    * 
//    */
//   ss: FFMPEG_Time | null
//   /**
//    * @description set the start time offset relative to EOF (see FFMPEG_TimeUnit).
//    * Like the -ss option but relative to the "end of file". That is negative values are earlier in the file, 0 is at EOF.
//    * @kind (input)
//    */
//   sseof: FFMPEG_Time
//   /**
//    * @description set the recording timestamp ('now' to set the current time)
//    * @kind (output)
//    */
//   timestamp?: FFMPEG_Date | 'now' | null
//   /**
//    * @description add metadata to transcoded file.
//    * @kind (output,per-metadata)
//    * @example -metadata key=value
//    * -metadata title="my title"
//    * 
//    * set the language of the first audio stream
//    * -metadata:s:a:0 language=eng
//    */
//   metadata?: string[] | null
//   advanced: FFMPEG_AdvancedPerFileMainOptions
// }

/**
 * @description represents supported FFMPEG's advanced per-file options.

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
 */
export type FFMPEG_AdvancedPerFileMainOptions = {
  // profile: string | null     // maybe later
  // map: string | null         // maybe later
  // map_channel: string | null // maybe later
}

/**
 * @description represents supported FFMPEG's video options.
   
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
 */
export type FFMPEG_VideoOptions = {
  /**
   * @description set frame rate (Hz value, fraction or abbreviation)
   * @kind (input/output,per-stream)
   * @example '30'
   * '30000/1001' (= 'ntsc')
   * '24000/1001' (= 'film')
   * @alternative -framerate
   */
  r: string | null
  /**
   * @description set frame size (WxH or abbreviation)
   * @kind (input/output,per-stream)
   * @example '1920x1080'
   * 'ntsc'
   */
  s: string | null
  /**
   * @description disable video
   * @kind (input/output)
   */
  vn: boolean
  advanced: FFMPEG_AdvancedVideoOptions
}

/**
 * @description represents supported FFMPEG's advanced video options
   
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

 */
export type FFMPEG_AdvancedVideoOptions = {
  /**
   * @description use HW accelerated decoding
   * @kind (input,per-stream)
   */
  hwaccel: HWAccels
  /**
   * @description select a device for HW acceleration
   * @kind (input,per-stream)
   */
  hwaccel_device: null | string
  /**
   * @description keeps the decoded frames in GPU memory, 
   * recommended when using HW accelerated encoding
   * @example cuda: Without the -hwaccel cuda -hwaccel_output_format cuda option, 
   * the decoded raw frames would be copied back to system memory via the PCIe bus
   * @kind input
   * @requires FFMPEG_AdvancedVideoOptions.hwaccel
   */
  hwaccel_output_format: null | string
}

/**
 * @description represents supported FFMPEG's audio options
   
  Audio options:

    -aframes number     set the number of audio frames to output

    -aq quality         set audio quality (codec-specific)

    -ar rate            set audio sampling rate (in Hz)

    -ac channels        set number of audio channels

    -an                 disable audio

    -acodec codec       force audio codec ('copy' to copy stream)

    -ab bitrate         audio bitrate (please use -b:a)

    -af filter_graph    set audio filters

 */
export type FFMPEG_AudioOptions = {
  /**
   * @description set audio sampling rate (in Hz)
   * @example 48000
   * @kind (input/output,per-stream)
   */
  ar: null | number
  /**
   * @description disable audio
   * @kind (input/output)
   */
  an: boolean
  advanced: FFMPEG_AdvancedAudioOptions
}

/**
 * @description represents supported FFMPEG's advanced audio options
   
  Advanced Audio options:

    -atag fourcc/tag    force audio tag/fourcc

    -sample_fmt format  set sample format

    -channel_layout layout  set channel layout

    -ch_layout layout   set channel layout

    -guess_layout_max   set the maximum number of channels to try to guess the channel layout

    -absf audio bitstream_filters  deprecated

    -apre preset        set the audio options to the indicated preset
 */
export type FFMPEG_AdvancedAudioOptions = {}

/**
 * @description represents supported FFMPEG's subtitle options
 
  Subtitle options:

    -s size             set frame size (WxH or abbreviation)

    -sn                 disable subtitle

    -scodec codec       force subtitle codec ('copy' to copy stream)

    -stag fourcc/tag    force subtitle tag/fourcc

    -fix_sub_duration   fix subtitles duration

    -canvas_size size   set canvas size (WxH or abbreviation)

    -spre preset        set the subtitle options to the indicated preset
 */
export type FFMPEG_SubtitleOptions = {}

export type FFMPEG_VideoEncoderOptions = {
  libx264: VideoEncoderOptions_libx264
}

export type FFMPEG_VideoDecoderOptions = {
  // todo e.g. h264_cuvid, hevc_cuvid, etc.
}

export type FFMPEG_AudioEncoderOptions = {
  aac: AudioEncoderOptions_aac
}

export type FFMPEG_AudioDecoderOptions = {
  // todo e.g. aac, mp3, opus/libopus etc.
}

export type BitrateUnit = 'k' | 'M'

/**
 * @description describes all possible ways to express a unit of time that FFMPEG can interpret
 * @example [-][HH:]MM:SS[.m...]
 * @example [-]S+[.m...][s|ms|us]
 * @example The following examples are all valid time duration:

    ‘55’
    55 seconds

    ‘0.2’
    0.2 seconds

    ‘200ms’
    200 milliseconds, that’s 0.2s

    ‘200000us’
    200000 microseconds, that’s 0.2s

    ‘12:03:45’
    12 hours, 03 minutes and 45 seconds

    ‘23.189’
    23.189 seconds
 */
export type FFMPEG_Time = number

/**
 * @description https://ffmpeg.org/ffmpeg-utils.html#date-syntax
 * @example [(YYYY-MM-DD|YYYYMMDD)[T|t| ]]((HH:MM:SS[.m...]]])|(HHMMSS[.m...]]]))[Z]
 */
export type FFMPEG_Date = string | 'now'

export type FFMPEG_Input = {
  ui: {
    // fps: number
    duration: {
      /**
       * @description minutes
       */
      min: number
      /**
       * @description seconds
       */
      sec: number
    }
  }
  url: string
  per_file_main_options: FFMPEG_InputPerFileMainOptions
  streams: Stream[]
}

export type FFMPEG_Output = {
  url: string
  per_file_main_options: FFMPEG_OutputPerFileMainOptions
  streams: Stream[]
}

export type StreamType = 'video' | 'audio' | 'subtitle' | 'data'

export type Stream = {
  type: StreamType
  index: number,
  per_stream_options: {
    video?: FFMPEG_VideoOptions
    audio?: FFMPEG_AudioOptions
  }
}

export type HWAccels = 
  null | 'none' | 'auto' | 'cuda' | 
  'dxva2' | 'qsv' | 'd3d11va' | 'opencl' | 
  'vulkan' | 'vdpau' | 'vaapi'

export type VideoEncoders = 
  'copy' |  'libx264' 
  // | 'libx265' | 'libaom-av1' |
  // 'librav1e' |  'libsvtav1' | 'av1_nvenc' |  'av1_qsv' |
  // 'av1_amf' |  'libvpx' | 'libvpx-vp9'

export type VideoDecoders = string // not really needed usually

export type AudioDecoders = string // not really needed usually

export type AudioEncoders = 
  'copy' |
  'aac' |
  'libvo_aacenc' |
  'libmp3lame' |
  'opus' |
  'pcm' // todo: which pcm variations do we support?

export type AudioContainer = 'm4a' | 'mp3' | 'wav' | 'opus'
export type AudioContainers = ['m4a', 'mp3', 'wav', 'opus']

export type VideoContainer = 'mp4' | 'mkv' | 'webm'
export type VideoContainers = ['mp4', 'mkv', 'webm']

export type Container = VideoContainer | AudioContainer

export type RateControlModes = 'crf' | 'abr'

// https://en.wikipedia.org/wiki/Comparison_of_video_container_formats#Video_coding_formats_support
export type ContainerSupportedCodecs = {
  // audio
  m4a: ['aac'],
  mp3: ['mp3'],
  wav: ['pcm'],
  opus: ['opus'],
  // video
  mp4: {
    audio: ['aac', 'opus'],
    video: ['av1', 'h.264', 'h.265', 'vp8', 'vp9'],
  },
  mkv: {
    audio: ['aac', 'mp3', 'pcm', 'opus'],
    video: ['av1', 'h.264', 'h.265', 'vp8', 'vp9'],
  },
  webm: {
    audio: ['opus'],
    video: ['vp8', 'vp9', 'av1'],
  }
}

export type VideoEncoderOptions_libx264 = {
  preset: {
    default: 'medium',
    value: Preset_libx264,
    values: Presets_libx264,
  },
  profile: {
    default: 'high',
    value: Profile_libx264,
    values: Profiles_libx264,
  },
  tune: {
    default: 'none',
    value: Tune_libx264,
    values: Tunes_libx264,
  },
  level: {
    default: 'auto',
    value: Level_libx264,
    values: Levels_libx264,
  },
  rate_control: {
    default: 'crf',
    mode: RateControlModes,
    modes: ['crf', 'abr'],
  },
  crf: {
    default: 23,
    max: 51,
    min: 0,
    value: number,
  },
  abr: {
    unit: BitrateUnit,
    value: number,
  },
  constrain_bitrate: boolean,
  max_bitrate: {
    unit: BitrateUnit,
    value: number,
  },
  buffer_size: {
    unit: BitrateUnit,
    value: number,
  },
  fastdecode: {
    default: boolean,
    value: boolean,
  },
  zerolatency: {
    default: boolean,
    value: boolean,
  }
}

export type Preset_libx264 = 'default' |
'ultrafast' | 'superfast' | 'veryfast' | 
'faster' | 'fast' | 'medium' | 'slow' | 
'slower' | 'veryslow' | 'placebo'

export type Presets_libx264 = [
  'default', 'ultrafast', 'superfast',
  'veryfast', 'faster', 'fast', 'medium',
  'slow', 'slower', 'veryslow', 'placebo'
]

export type Profile_libx264 = 
  'default' | 'baseline' | 'main' | 'high' | 'high10' | 'high422' | 'high444'

export type Profiles_libx264 = [
  'default', 'baseline', 'main', 'high', 'high10', 'high422', 'high444'
]

export type Tune_libx264 = 
'default' | 'none' | 'film' | 'animation' | 
'grain' | 'stillimage' | 'psnr' | 'ssim'

export type Tunes_libx264 = [
  'default', 'none', 'film', 'animation', 
  'grain', 'stillimage', 'psnr', 'ssim'
]

export type Level_libx264 = 
  'auto' |
  '1' | '1.1' | '1.2' | '1.3' |
  '2' | '2.1' | '2.2' |
  '3' | '3.1' | '3.2' | 
  '4' | '4.1' | '4.2' | 
  '5' | '5.1' | '5.1'

export type Levels_libx264 = [
  'auto', 
  '1', '1.1', '1.2', '1.3', 
  '2', '2.1', '2.2', 
  '3', '3.1', '3.2', 
  '4', '4.1', '4.2', 
  '5', '5.1', '5.1'
]

export type AudioEncoderOptions_aac = {
  bitrate: string
  /*
  
  todo:

  AAC encoder AVOptions:
  -aac_coder         <int>        E...A...... Coding algorithm (from 0 to 2) (default twoloop)
      anmr            0            E...A...... ANMR method
      twoloop         1            E...A...... Two loop searching method
      fast            2            E...A...... Default fast search
  -aac_ms            <boolean>    E...A...... Force M/S stereo coding (default auto)
  -aac_is            <boolean>    E...A...... Intensity stereo coding (default true)
  -aac_pns           <boolean>    E...A...... Perceptual noise substitution (default true)
  -aac_tns           <boolean>    E...A...... Temporal noise shaping (default true)
  -aac_ltp           <boolean>    E...A...... Long term prediction (default false)
  -aac_pred          <boolean>    E...A...... AAC-Main prediction (default false)
  -aac_pce           <boolean>    E...A...... Forces the use of PCEs (default false)
  */
}