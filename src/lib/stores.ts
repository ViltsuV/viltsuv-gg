import type { 
  FFMPEG_AudioEncoderOptions,
  FFMPEG_Command,
  FFMPEG_Input,
  FFMPEG_Output,
  FFMPEG_VideoEncoderOptions,
  Stream, StreamType,
} from "$lib/types"
import { writable, type Writable } from "svelte/store"

// let options: FFMPEG_Options = {
//   global: {
//     use_global_options: false,
//     overwriting: "ask",
//     stats: false,
//     advanced: {
//       hide_banner: false
//     },
//   },
//   per_file_main: {
//     c: {
//       v: 'copy',
//       a: 'copy',
//     },
//     f: null,
//     metadata: null,
//     ss: null,
//     sseof: null,
//     t: null,
//     timestamp: null,
//     to: null,
//     advanced: {}
//   },
//   audio: {
//     an: false,
//     ar: null,
//     advanced: {},
//   },
//   video: {
//     vn: false,
//     r: null,
//     s: null,
//     advanced: {
//       hwaccel: null,
//       hwaccel_device: null,
//       hwaccel_output_format: null,
//     },
//   },
//   subtitle: {},
// }

function generate_stream(type: StreamType, index: number): Stream {
  return {
    type: type,
    index: index,
    per_stream_options: {
      // todo:
      // -c:v:0 libx264 -c:v:1 libx265
      // -c:a:0 aac -c:a:1 opus
    }
  }
}

const generate_av_input = () => {
  let input: FFMPEG_Input = {
    url: 'input_path',
    per_file_main_options: {
      c: {
        v: {
          value: '',
          decoder_options: {}
        },
        a: {
          value: '',
          decoder_options: {}
        },
        s: null,
        d: null,
      },
      an: false,
      vn: false,
      f: null, // format normally auto detected for input files
      t: null, // limit the duration of data read from the input file
      to: null, // stop reading the input at position (if -t is defined, it takes priority)
      ss: null, // seek to position and begin decoding / encoding from there
      sseof: null, // seek to position from end of file (input only)
      // metadata: null, // output only
      // timestamp: null, // output only
      advanced: {}
    },
    streams: [
      {
        type: 'video',
        index: 0,
        per_stream_options: {
          // todo later
        }
      },
      {
        type: 'audio',
        index: 0,
        per_stream_options: {
          // todo later
        }
      }
    ]
  }
  return input
}

function generate_av_output(): FFMPEG_Output {
  return {
    url: 'output_path',
    per_file_main_options: {
      c: { // defines encoders for all streams that don't have a stream-specific encoder defined
        v: {
          value: 'copy',
          encoder_options: generate_video_encoder_options(),
        },
        a: {
          value: 'copy',
          encoder_options: generate_audio_encoder_options()
        },
        s: null,
        d: null,
      },
      an: false,
      vn: false,
      f: null, // guessed from the file extension for output files
      t: null, // stop writing the output after its duration reaches duration.
      to: null, // Stop writing the output at position (if -t is defined, it takes priority)
      ss: null, // seek to position and begin decoding / encoding from there
      timestamp: null, // add timestamp (output only)
      metadata: [], // Set a metadata key/value pair (output,per-metadata)
      advanced: {}
    },
    streams: [
      generate_stream('video', 0),
      generate_stream('audio', 0)
    ]
  }
}

// export let ffmpeg_options: Writable<FFMPEG_Options> = writable(options)

function generate_video_encoder_options(): FFMPEG_VideoEncoderOptions {
  return {
    // copy: {
    //   copy: 'no options'
    // },
    libx264: {
      preset: {
        default: 'medium',
        value: 'default',
        values: ['default', 'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo'],
      },
      profile: {
        default: 'high',
        value: 'default',
        values: ['default', 'baseline', 'main', 'high','high10','high422','high444'],
      },
      tune: {
        default: 'none',
        value: 'default',
        values: ['default', 'none', 'film', 'animation', 'grain', 'stillimage', 'psnr', 'ssim'],
      },
      level: {
        default: 'auto',
        value: 'auto',
        values: ['auto', '1', '1.1', '1.2', '1.3', '2', '2.1', '2.2', '3', '3.1', '3.2', '4', '4.1', '4.2', '5', '5.1', '5.1'],
      },
      rate_control: {
        default: 'crf',
        mode: 'crf',
        modes: ['crf', 'abr'],
      },
      crf: {
        default: 23,
        max: 51,
        min: 0,
        value: 23,
      },
      abr: {
        unit: 'K',
        value: 4000,
      },
      constrain_bitrate: false,
      max_bitrate: {
        unit: 'K',
        value: 4000,
      },
      buffer_size: {
        unit: 'K',
        value: 8000,
      },
      fastdecode: {
        default: false,
        value: false,
      },
      zerolatency: {
        default: false,
        value: false,
      }
    },
  }
}

function generate_audio_encoder_options(): FFMPEG_AudioEncoderOptions {
  return {
    aac: {
      
    }
  }
}

/**
 * @description a store that defines all the required things. 
   The command is generated based on the properties of this store.
   
    - [global options]

    - inputs + input options

    - outputs + output options

    - for the command that is then generated based on this store

    ffmpeg [global]
 */
export let command: Writable<FFMPEG_Command> = writable({
  global_options: {
    use_global_options: false,
    overwriting: 'ask',
    stats: false,
    advanced: {
      hide_banner: false,
    }
  },
  inputs: [
    generate_av_input()
  ],
  outputs: [
    generate_av_output()
  ],
})