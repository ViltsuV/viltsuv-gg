import type { FFMPEG_Options } from "$lib/types"
import { writable, type Writable } from "svelte/store"

let options: FFMPEG_Options = {
  global: {
    use_global_options: false,
    overwriting: "ask",
    stats: false,
    advanced: {
      hide_banner: false
    },
  },
  per_file_main: {
    c: null,
    f: null,
    metadata: null,
    ss: null,
    sseof: null,
    t: null,
    timestamp: null,
    to: null,
    advanced: {}
  },
  audio: {
    an: false,
    ar: null,
    advanced: {},
  },
  video: {
    vn: false,
    r: null,
    s: null,
    advanced: {
      hwaccel: null,
      hwaccel_device: null,
      hwaccel_output_format: null,
    },
  },
  subtitle: {},
}

export let ffmpeg_options: Writable<FFMPEG_Options> = writable(options)

export let inputs = writable([{
  options: '[input options]',
  path: '[input path / file name]',
}])

export let outputs = writable([{
  options: '[output options]',
  path: '[output path / file name]',
}])
