<script lang="ts">
	import { RadioGroup, RadioItem, RangeSlider } from "@skeletonlabs/skeleton"
	import Expandable from '$lib/components/Expandable.svelte'
	import PresetExplainer_x264 from '$lib/components/PresetExplainer_x264.svelte'
  import { command } from "$lib/stores"

  const VP_CRF_MAX = 63
  const VP_RECOMMENDED_MIN = 15
  const VP_RECOMMENDED_MAX = 35

  export let output_index: number
  export let stream_index: number

  let showing_crf_explainer = false
  let showing_preset_explainer = false
  let showing_profile_explainer = false
  let showing_tune_explainer = false
  let showing_level_explainer = false
  let showing_abr_explainer = false
  
  let vbv_tooltip = "Only recommended for situations where the conditions \ncall for constrained bitrate, such as: \n\n- streaming video over a low-bandwidth network, or \n- limited decoder capability."
  let bufsize_tooltip = 'Usually services recommend a buffer size of 1-2s i.e. 1-2x your bitrate'

  $command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.preset.value
  // let crf_slider = $command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.crf.default

</script>

<fieldset class="bordered"><legend>x264 Options</legend>
  <!-- PRESET -->
  <div class="flex flex-row mt-2">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <div class="input-group-shim">Preset</div>
      <select class="select" bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.preset.value}>
        <option value="default">default (medium)</option>
        <option value="ultrafast">ultrafast</option>
        <option value="superfast">superfast</option>
        <option value="veryfast">veryfast</option>
        <option value="faster">faster</option>
        <option value="fast">fast</option>
        <option value="medium">medium</option>
        <option value="slow">slow</option>
        <option value="slower">slower</option>
        <option value="veryslow">veryslow</option>
        <option value="placebo" 
          title="increases encoding time significantly and increases visual quality by a miniscule amount compared to veryslow"
        >placebo (don't use this)</option>
      </select>
    </div>

    <button class="btn btn-icon variant-filled-surface ml-2"
      title="{showing_preset_explainer ? "close" : "open"} preset explainer"
      on:click={() => showing_preset_explainer = !showing_preset_explainer}
    >?</button>
  </div>
  <Expandable expanded={showing_preset_explainer} overflow='auto'>
    <div class="pt-2">
      <PresetExplainer_x264 />
    </div>
  </Expandable>
  
  <!-- PROFILE -->
  <div class="flex flex-row mt-2">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <div class="input-group-shim">Profile</div>
      <select class="select" bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.profile.value}>
        <option value="default">default (high)</option>
        <option value="baseline">baseline</option>
        <option value="main">main</option>
        <option value="high">high</option>
        <option value="high10">high10</option>
        <option value="high422">high422</option>
        <option value="high444">high444</option>
      </select>
    </div>

    <button class="btn btn-icon variant-filled-surface ml-2"
      title="{showing_profile_explainer ? "close" : "open"} profile explainer"
      on:click={() => showing_profile_explainer = !showing_profile_explainer}
    >?</button>
  </div>
  <Expandable expanded={showing_profile_explainer} overflow='auto'>
    <div class="pt-2">
      TODO: profile explainer
      <!-- <ProfileExplainer_x264 /> -->
    </div>
  </Expandable>

  <!-- TUNE -->
  <div class="flex flex-row mt-2">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <div class="input-group-shim">Tune</div>
      <select class="select" bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.tune.value}>
        <option value="default">default (none)</option>
        <option value="none">none</option>
        <option value="film">film</option>
        <option value="animation">animation</option>
        <option value="grain">grain</option>
        <option value="stillimage">stillimage</option>
        <option value="psnr">psnr</option>
        <option value="ssim">ssim</option>
      </select>
    </div>

    <button class="btn btn-icon variant-filled-surface ml-2"
      title="{showing_tune_explainer ? "close" : "open"} tune explainer"
      on:click={() => showing_tune_explainer = !showing_tune_explainer}
    >?</button>
  </div>
  <Expandable expanded={showing_tune_explainer} overflow='auto'>
    <div class="pt-2">
      TODO: Tune explainer
      <!-- <TuneExplainer_x264 /> -->
    </div>
  </Expandable>
  
  <!-- LEVEL -->
  <div class="flex flex-row mt-2">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <div class="input-group-shim">Level</div>
      <select class="select" bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.level.value}>
        {#each $command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.level.values as level}
          <option value={level}>{level}</option>
        {/each}
      </select>
    </div>

    <button class="btn btn-icon variant-filled-surface ml-2"
      title="{showing_level_explainer ? "close" : "open"} level explainer"
      on:click={() => showing_level_explainer = !showing_level_explainer}
    >?</button>
  </div>
  <Expandable expanded={showing_level_explainer} overflow='auto'>
    <div class="pt-2">
      TODO: Level explainer
      <!-- <LevelExplainer_x264 /> -->
    </div>
  </Expandable>

  <!-- RATE CONTROL -->
  <RadioGroup 
    active="variant-filled-tertiary" 
    hover="hover:variant-soft-primary" 
    class="mb-3"
  >
    <RadioItem 
      bind:group={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.rate_control.mode} 
      name="rate-control" 
      value={'abr'}
      title="average bitrate"
    >
      ABR
    </RadioItem>
    <RadioItem 
      bind:group={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.rate_control.mode} 
      name="rate-control" 
      value={'crf'}
      title="constant rate factor"
    >
      CRF
    </RadioItem>
  </RadioGroup>

  <Expandable expanded={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.rate_control.mode === 'crf'}>
    <div class="flex items-center">
      <RangeSlider
        name="range-slider"
        class="flex-grow"
        bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.crf.value}
        min={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.crf.min}
        max={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.crf.max}
        step={1}
        ticked
      >
        <div class="flex justify-between">
          <div class="pl-2">CRF value (video quality)</div>
          <div class="text-sm pl-3">{$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.crf.value} / {$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.crf.max}</div>
          <div></div>
        </div>
      </RangeSlider>
      <button class="btn btn-icon variant-filled-surface ml-2"
        title="{showing_crf_explainer ? "close" : "open"} constant rate factor explainer"
        on:click={() => showing_crf_explainer = !showing_crf_explainer}
      >?</button>
    </div>
    
    <Expandable expanded={showing_crf_explainer} overflow='auto'>
      <div class="pt-2">
        <div class="text-sm flex flex-row justify-center">
          <div class="flex flex-col mr-8">
            <div>CRF value:</div>
            <div>video quality:</div>
            <div>file size:</div>
          </div>
          <div class="flex flex-col items-center">
            <div>0</div>
            <div>lossless</div>
            <div>massive</div>
          </div>
          <div>{'<'}</div>
          <div class="flex flex-col items-center" title="decreasing CRF past 18 will yield barely noticeable quality gains at the cost of disproportionate file size increase">
            <div>18</div>
            <div>very good</div>
            <div>large</div>
          </div>
          <div>{'<'}</div>
          <div class="flex flex-col items-center">
            <div>23</div>
            <div>default</div>
            <div>optimal</div>
          </div>
          <div class="items-stretch">{'>'}</div>
          <div class="flex flex-col items-center" title="increasing CRF past 28 will yield minimal file size gains at the cost of disproportionate loss of quality">
            <div>28</div>
            <div>worse</div>
            <div>small</div>
          </div>
          <div>{'>'}</div>
          <div class="flex flex-col items-center">
            <div>51</div>
            <div>worst</div>
            <div>tiny</div>
          </div>
        </div>
      </div>
    </Expandable>

  </Expandable>
  <Expandable expanded={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.rate_control.mode === 'abr'}>
    <div class="flex flex-row">
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Bitrate</div>
        <input type="number" name="bitrate-value" />
        <select class="select" name="bitrate-unit">
          <option value="kbps">Kbps</option>
          <option value="mbps">Mbps</option>
        </select>
      </div>
      <button class="btn btn-icon variant-filled-surface ml-2"
        title="{showing_abr_explainer ? "close" : "open"} average bitrate explainer"
        on:click={() => showing_abr_explainer = !showing_abr_explainer}
      >?</button>
    </div>
    
    <Expandable expanded={showing_abr_explainer} overflow='auto'>
      <div class="pt-2">
        TODO: ABR explainer
        <!-- <ABR_Explainer_x264 /> -->
      </div>
    </Expandable>
  </Expandable>
  <!-- Constrain Bitrate -->
  <fieldset 
    class:bordered={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.constrain_bitrate} 
    class="mt-3"
  >
    <legend>
      <div class="flex flex-row items-center justify-center">
        <input class="checkbox" 
          title={vbv_tooltip}
          type="checkbox" 
          name="constrain_bitrate" 
          bind:checked={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.constrain_bitrate}>
        <div class="flex flex-row pl-2">
          <div
            title={vbv_tooltip}
          >Constrain Video Bitrate</div>
          <a href="https://youtu.be/Mn8v1ojV80M?t=20"
            title="The Hypothetical Reference Decoder (HRD) - Christian Feldmann - YouTube"
            class="pl-2"
          >
            (VBV / HRD)
          </a>
        </div>
      </div>
    </legend>
    <Expandable expanded={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.constrain_bitrate}>
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
        <div class="input-group-shim" title="sets -maxrate parameter">Max Bitrate</div>
        <div class="flex flex-row">
          <input type="number" class="input" name="maxrate_value"
            bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.max_bitrate.value}
          >
          <select class="select" name="maxrate_unit"
            bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.max_bitrate.unit}
          >
            <option value="K" title="unit">Kbps (K)</option>
            <option value="M" title="unit">Mbps (M)</option>
          </select>
        </div>
      </div>
  
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
        <div class="input-group-shim" title="sets -bufsize parameter{'\n\n' + bufsize_tooltip}">
          Buffer Size
        </div>
        <div class="flex flex-row" title={bufsize_tooltip}>
          <input class="input" type="number" name="bufsize"
            bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.buffer_size.value}
          >
          <select class="select" name="bufsize_unit" bind:value={$command.outputs[output_index].per_file_main_options.c.v.encoder_options.libx264.buffer_size.unit}>
            <option value="K">Kbps (K)</option>
            <option value="M">Mbps (M)</option>
          </select>
        </div>
      </div>
    </Expandable>
  </fieldset>
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
    @apply text-tertiary-500 text-lg px-1;
  }
  .bordered {
    @apply border border-tertiary-500;
  }
</style>