export type Project = {
  name: string
  /**
   * @description who is the project's owner?
   */
  owner: string
  url: string
  screenshot_url: string
  screenshot_alt: string
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
  /**
   * @description if the project was made for a company, which company?
   */
  company_name?: string | undefined
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
  end_time?: string | undefined
}

export type Technology = {
  type: 'frontend' | 'backend' | 'db' | 'api' | 'service'
  name: string
  /**
   * @description a link to the technology's home page
   */
  url?: string
}

export type Projects = Project[]

// FFMPEG-Command-Generator

export type FFMPEG_Input = {
  options: string,
  path: string
}

export type FFMPEG_Output = {
  options: string,
  path: string
}

export type SupportedVideoEncoders = 
'copy' |
'libx264' | 
'libx265' | 
'libaom-av1' |
'librav1e' |
'libsvtav1' |
'av1_nvenc' |
'av1_qsv' |
'av1_amf' |
'libvpx' |
'libvpx-vp9'

export type SupportedAudioEncoders = 
'copy' |
'libvo_aacenc' |
'libmp3lame' |
'opus' |
'wav?'

export type SupportedAudioContainers = 'm4a' | 'mp3' | 'wav' | 'opus'

export type SupportedVideoContainers = 'mp4' | 'mkv' | 'webm'

export type SupportedRateControlModes = 'crf' | 'abr'

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