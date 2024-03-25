<script lang="ts">
	import type { Technology } from "$lib/types"

  export let technology: Technology
</script>

<div class="technology technology-type-{technology.type} chip flex flex-row">
  {#if technology.icon.src !== ''}
    <img class="icon pl-1" src={technology.icon.src} alt={technology.name}>
  {/if}
  <div>{technology.name}</div>
  <div class="opacity-70">({technology.type})</div>
  <a class="px-1" href={technology.link.href}>🔗</a>
</div>

<style lang="postcss">
  .icon {
    @apply 
      max-h-5
  }
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
