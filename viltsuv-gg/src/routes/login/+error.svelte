<script lang="ts">
  import { page } from '$app/stores'
  
  console.log('----- +error.svelte -----')
</script>

<h1>{$page.status}: {$page.error?.message}</h1>