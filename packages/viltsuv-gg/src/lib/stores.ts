import type { 
  Employer,
  EmployerEmployments,
  Employment,
  FFMPEG_AudioEncoderOptions,
  FFMPEG_Command,
  FFMPEG_Input,
  FFMPEG_Output,
  FFMPEG_VideoEncoderOptions,
  Link,
  Project,
  Stream, StreamType,
  Technology,
  TechnologyType,
  Tool,
  WorkHistoryTimeline,
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
    ui: {
      // fps: 30,
      duration: {
        min: 0,
        sec: 0
      }
    },
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
      t: 0, // limit the duration of data read from the input file
      to: null, // stop reading the input at position (if -t is defined, it takes priority)
      ss: 0, // seek to position and begin decoding / encoding from there
      sseof: 0, // seek to position from end of file (input only)
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
      container: {
        selected_audio_container: 'm4a',
        selected_container: 'mp4',
        selected_video_container: 'mp4',
      },
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
      t: 0, // stop writing the output after its duration reaches duration.
      to: null, // Stop writing the output at position (if -t is defined, it takes priority)
      ss: 0, // seek to position and begin decoding / encoding from there
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
        unit: 'k',
        value: 4000,
      },
      constrain_bitrate: false,
      max_bitrate: {
        unit: 'k',
        value: 4000,
      },
      buffer_size: {
        unit: 'k',
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
      bitrate: 'default'
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

function generate_tool(number: number): Tool {
  return {
    name: `Tool ${number} name`,
    purposes: [
      'purpose 1',
      'purpose 2',
      'purpose 3',
      'software development',
      'video production',
      'project management'
    ],
    link: generate_link('https://tool.url', 'tool.url')
  }
}

function generate_project(number: number): Project {
  return {
    name: `Project ${number} name`,
    description: `project ${number} description`,
    company_name: `Employer ${number} name`,
    activity_periods: [
      {
        start_time: '2020-01-01',
        end_time: '2021-01-01',
      }
    ],
    join_time: 'join time',
    owner: 'Employer project 1 owner',
    screenshot: {
      href: 'https://project.screenshot.url',
      alt: 'screenshot alt',
    },
    slug: 'slug-to-employer-project-if-public-url-available',
    technologies: [
      generate_technology('api name', 'api', 'https://api.technology.url', 'api.technology.url', ''),
      generate_technology('frontend name', 'frontend', 'https://frontend.technology.url', 'frontend.technology.url', ''),
      generate_technology('service name', 'service', 'https://service.technology.url', 'service.technology.url', ''),
      generate_technology('backend name', 'backend', 'https://backend.technology.url', 'backend.technology.url', ''),
      generate_technology('database name', 'database', 'https://database.technology.url', 'database.technology.url', ''),
    ],
    tools: [
      generate_tool(1),
      generate_tool(2),
      generate_tool(3),
    ],
    link: generate_link('https://project.url', 'project.url'),
    expanded: false,
  }
}

function generate_technology(
  name: string, 
  type: TechnologyType, 
  href: string,
  link_text: string,
  icon_src: string
): Technology {
  let technology: Technology = {
    name: name,
    type: type,
    link: generate_link(href, link_text),
    icon: {
      src: icon_src
    }
  }
  return technology
}

function generate_link(href: string, link_text: string): Link {
  let link: Link = {
    href: href,
    text: link_text
  }
  return link
}

function generate_employment(number: number, start_time: string, end_time: string): Employment {
  let today = new Date().toISOString().substring(0, 10)
  let employment: Employment = {
    employer: {
      name: `Employer ${number} name`,
      link: {
        href: `https://employer-${number}.url`,
        text: `employer-${number}.url`
      },
      class_name: `employer-${number}`,
      color: {
        primary: 'rgb(133, 191, 72)',
        secondary: 'rgb(43, 106, 45)',
        primary_dark: 'rgb(73, 106, 43)',
        secondary_dark: 'rgb(116, 171, 59)',
      },
      visible: true
    },
    active: end_time === '' ? true : false,
    start_time: start_time,
    end_time: end_time === '' ? today : end_time,
    achievements: [
      'achievement 1',
      'achievement 2',
      'achievement 3'
    ],
    projects: [
      generate_project(1),
      generate_project(2),
      generate_project(3)
    ],
    role: {
      description: [
        'role description bullet point 1',
        'role description bullet point 2',
        'role description bullet point 3'
      ],
      required_experience: 'entry-level',
      title: 'role title',
      responsibilities: [
        'responsibility 1',
        'responsibility 2',
      ],
    },
    time_type: 'full-time',
    tools: [
      generate_tool(1),
      generate_tool(2),
      generate_tool(3),
    ],
    technologies: [
      generate_technology('api name', 'api', 'https://api.technology.url', 'api.technology.url', ''),
      generate_technology('frontend name', 'frontend', 'https://frontend.technology.url', 'frontend.technology.url', ''),
      generate_technology('service name', 'service', 'https://service.technology.url', 'service.technology.url', ''),
      generate_technology('backend name', 'backend', 'https://backend.technology.url', 'backend.technology.url', ''),
      generate_technology('database name', 'database', 'https://database.technology.url', 'database.technology.url', ''),
    ],
    work_location: 'on-premise',
    things_learned: ['learned thing 1', 'learned thing 2', 'learned thing 3']
  }
  return employment
}

export let mock_work_history_data: Writable<WorkHistoryTimeline> = writable({
  employments: [
    generate_employment(6, '2023-01-01', ''), 

    generate_employment(6, '2021-01-01', '2021-02-01'), 
    generate_employment(6, '2021-02-01', '2021-03-01'), 
    generate_employment(6, '2021-03-01', '2021-04-01'), 
    generate_employment(6, '2021-04-01', '2021-05-01'), 
    generate_employment(6, '2021-05-01', '2021-06-01'), 
    generate_employment(6, '2021-06-01', '2021-07-01'), 
    generate_employment(6, '2021-07-01', '2021-08-01'), 
    generate_employment(6, '2021-08-01', '2021-09-01'), 
    generate_employment(6, '2021-09-01', '2021-10-01'), 
    generate_employment(6, '2021-10-01', '2021-11-01'), 
    generate_employment(6, '2021-11-01', '2021-12-01'), 
    generate_employment(6, '2021-12-01', '2021-12-31'), 

    generate_employment(5, '2022-06-01', '2023-06-01'), 
    generate_employment(5, '2021-03-01', '2022-03-01'), 
    generate_employment(5, '2020-01-01', '2021-01-01'),

    generate_employment(4, '2022-03-01', '2023-03-01'), 
    generate_employment(4, '2021-01-01', '2022-01-01'), 
    generate_employment(4, '2019-09-01', '2020-09-01'), 

    generate_employment(3, '2022-06-01', '2023-06-01'), 
    generate_employment(3, '2021-03-01', '2022-03-01'), 
    generate_employment(3, '2020-01-01', '2021-01-01'),
    generate_employment(2, '2019-02-01', '2022-02-01'), 
    generate_employment(2, '2019-02-01', '2022-02-01'), 
    generate_employment(1, '2005-02-01', '2006-02-01'), 
    generate_employment(1, '2007-02-01', '2010-02-01'), 
    generate_employment(1, '2011-01-01', '2017-01-01'),
    generate_employment(2, '2016-01-01', '2017-01-01'),
    generate_employment(2, '2015-01-01', '2016-01-01'),
    generate_employment(6, '1990-01-01', '2017-09-01'),
  ],
})
export let employer_employments: Writable<EmployerEmployments> = writable({})

export let sorted_employers_descending: Writable<Employer[]> = writable([])

export let year_width: Writable<number> = writable(120)

export let showing_wht_control_panel: Writable<boolean> = writable(true)
