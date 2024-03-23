<script lang="ts">
  import { Table, tableMapperValues  } from '@skeletonlabs/skeleton'

  /**
   * @description a function for quickly
   * @param value
   * @name d abbreviated from 'differs from default'
   */
  const d = (value: string) => {
    return `<code class="code">${value}</code>`
  }
  const table_data = [
    { position: 1, option: 'aq-mode', ultrafast: d('0*'), superfast: '1', veryfast: '1', faster: '1', fast: '1', medium: '1', slow: '1', slower: '1', veryslow: '1', placebo: '1'},
    { position: 2, option: 'aq-strength', ultrafast: d('[0]*'), superfast: '[1.0]', veryfast: '[1.0]', faster: '[1.0]', fast: '[1.0]', medium: '[1.0]', slow: '[1.0]', slower: '[1.0]', veryslow: '[1.0]', placebo: '[1.0]'},
    { position: 3, option: 'b-adapt', ultrafast: d('0*'), superfast: '1', veryfast: '1', faster: '1', fast: '1', medium: '1', slow: '1', slower: d('2*'), veryslow: d('2*'), placebo: d('2*')},
    { position: 4, option: 'bframes', ultrafast: d('0*'), superfast: '3', veryfast: '3', faster: '3', fast: '3', medium: '3', slow: '3', slower: '3', veryslow: d('8*'), placebo: d('16*')},
    { position: 5, option: 'chroma-qp-offset', ultrafast: d('[0]*'), superfast: d('[0]*'), veryfast: d('0*'), faster: d('[0]*'), fast: '[-2]', medium: '[-2]', slow: '[-2]', slower: '[-2]', veryslow: '[-2]', placebo: '[-2]'},
    { position: 6, option: 'deblock', ultrafast: d('[0:0]*'), superfast: '[1:0]', veryfast: '[1:0]', faster: '[1:0]', fast: '[1:0]', medium: '[1:0]', slow: '[1:0]', slower: '[1:0]', veryslow: '[1:0]', placebo: '[1:0]'},
    { position: 7, option: 'direct', ultrafast: 'spatial', superfast: 'spatial', veryfast: 'spatial', faster: 'spatial', fast: 'spatial', medium: 'spatial', slow: d('auto*'), slower: d('auto*'), veryslow: d('auto*'), placebo: d('auto*')},
    { position: 8, option: 'me', ultrafast: d('dia*'), superfast: d('dia*'), veryfast: 'hex', faster: 'hex', fast: 'hex', medium: 'hex', slow: 'hex', slower: d('umh*'), veryslow: d('umh*'), placebo: d('tesa*')},
    { position: 9, option: 'merange', ultrafast: '16', superfast: '16', veryfast: '16', faster: '16', fast: '16', medium: '16', slow: '16', slower: '16', veryslow: d('24*'), placebo: d('24*')},
    { position: 10, option: 'no-8x8dct', ultrafast: d('+*'), superfast: '-', veryfast: '-', faster: '-', fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: '-'},
    { position: 11, option: 'no-cabac', ultrafast: d('+*'), superfast: '-', veryfast: '-', faster: '-', fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: '-'},
    { position: 12, option: 'no-deblock', ultrafast: d('+*'), superfast: '-', veryfast: '-', faster: '-', fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: '-'},
    { position: 13, option: 'no-fast-pskip', ultrafast: '-', superfast: '-', veryfast: '-', faster: '-', fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: d('+*')},
    { position: 14, option: 'no-mbtree', ultrafast: d('+*'), superfast: d('+*'), veryfast: '-', faster: '-', fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: '-'},
    { position: 15, option: 'no-mixed-refs', ultrafast: d('+*'), superfast: d('+*'), veryfast: d('+*'), faster: d('+*'), fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: '-'},
    { position: 16, option: 'no-weightb', ultrafast: d('+*'), superfast: '-', veryfast: '-', faster: '-', fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: '-'},
    { position: 17, option: 'partitions', ultrafast: d('none*'), superfast: d('i8x8,i4x4*'), veryfast: 'p8x8,b8x8,i8x8,i4x4', faster: 'p8x8,b8x8,i8x8,i4x4', fast: 'p8x8,b8x8,i8x8,i4x4', medium: 'p8x8,b8x8,i8x8,i4x4', slow: 'p8x8,b8x8,i8x8,i4x4', slower: d('all*'), veryslow: d('all*'), placebo: d('all*')},
    { position: 18, option: 'rc-lookahead', ultrafast: d('0*'), superfast: d('0*'), veryfast: d('10*'), faster: d('20*'), fast: d('30*'), medium: '40', slow: d('50*'), slower: d('60*'), veryslow: d('60*'), placebo: d('60*')},
    { position: 19, option: 'ref', ultrafast: d('1*'), superfast: d('1*'), veryfast: d('1*'), faster: d('2*'), fast: d('2*'), medium: '3', slow: d('5*'), slower: d('8*'), veryslow: d('16*'), placebo: d('16*')},
    { position: 20, option: 'scenecut', ultrafast: d('0*'), superfast: '40', veryfast: '40', faster: '40', fast: '40', medium: '40', slow: '40', slower: '40', veryslow: '40', placebo: '40'},
    { position: 21, option: 'slow-firstpass', ultrafast: '-', superfast: '-', veryfast: '-', faster: '-', fast: '-', medium: '-', slow: '-', slower: '-', veryslow: '-', placebo: d('+*')},
    { position: 22, option: 'subme', ultrafast: d('0*'), superfast: d('1*'), veryfast: d('2*'), faster: d('4*'), fast: d('6*'), medium: '7', slow: d('8*'), slower: d('9*'), veryslow: d('10*'), placebo: d('11*')},
    { position: 23, option: 'trellis', ultrafast: d('0*'), superfast: d('0*'), veryfast: d('0*'), faster: '1', fast: '1', medium: '1', slow: d('2*'), slower: d('2*'), veryslow: d('2*'), placebo: d('2*')},
    { position: 24, option: 'weightp', ultrafast: d('0*'), superfast: d('1*'), veryfast: d('1*'), faster: d('1*'), fast: d('1*'), medium: '2', slow: '2', slower: '2', veryslow: '2', placebo: '2'},
  ]

  const table = {
    // A list of heading labels.
    // head: ['Name', 'Symbol', 'Weight'],
    head: ['option', 'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo'],

    // The data visibly shown in your table body UI.
    // body: tableMapperValues(table_data, ['name', 'symbol', 'weight']),
    body: tableMapperValues(table_data, ['option', 'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow', 'placebo']),

    // Optional: The data returned when interactive is enabled and a row is clicked.
    // meta: tableMapperValues(table_data, ['position', 'name', 'symbol', 'weight']),

    // Optional: A list of footer labels.
    // foot: ['Total', '', '<code class="code">5</code>']
  }
  function mySelectionHandler(value: any) {
    console.log('value', value)
    // alert(value)
  }
</script>

<fieldset id="x264-preset-explainer" class="bordered"><legend>x264 Preset Explainer</legend>
  <div class="ml-2 mb-2">
    Other presets are compared against the default preset, medium.
    <br/>
    <code class="code">*</code> - differing values from medium.
    <br/>
    [ ] values are either set by default, or by another argument.
    <br/>
    + - the x264 argument is used<br/>

    - - the x264 argument is not used.
  </div>
  <div class="ml-2 mb-2">Table & legend credit: <a href="https://dev.beandog.org/x264_preset_reference.html">beandog</a></div>
  <Table 
    source={table}
    interactive={true}
    on:selected={mySelectionHandler}
    regionCell='!px-1 !py-0'
    regionHeadCell='!px-1 !py-1'
  />
</fieldset>

<style lang="postcss">
  #x264-preset-explainer {
    overflow: auto;
  }
  fieldset {
    @apply pl-2 pb-2 pr-2;
  }
  legend {
    @apply text-tertiary-500 text-lg
  }
  .bordered {
    @apply border border-tertiary-500
  }
</style>