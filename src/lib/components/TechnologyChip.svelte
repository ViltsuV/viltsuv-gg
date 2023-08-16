<script lang="ts">
	import type { Technology } from "$lib/types"

  export let technology: Technology
</script>

<div class="technology technology-type-{technology.type} chip flex flex-row">
  {#if technology.icon}
    <img src="" alt="">
  {/if}
  <div>{technology.name} ({technology.type})</div>
  <a class="pl-2" href={technology.link.href}>🔗</a>
</div>

<style lang="postcss">
  .technology {
    @apply 
      border
      ring-0
  }
  .technology-type-frontend {
    @apply 
      border-red-500
      bg-opacity-10
      bg-red-300
      dark:bg-red-700
      dark:bg-opacity-10
  }
  .technology-type-backend {
    
  }
  .technology-type-db {
    
  }
  .technology-type-service {
    
  }
  .technology-type-api {
    
  }
</style>
