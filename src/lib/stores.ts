import { writable } from "svelte/store"

export let global_options = writable('[global options]')

export let inputs = writable([{
  options: '[input options]',
  path: '[input path / file name]',
}])

export let outputs = writable([{
  options: '[output options]',
  path: '[output path / file name]',
}])
