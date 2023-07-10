<script lang="ts">
	import ProjectsListItem from '$lib/components/ProjectsListItem.svelte'
  import type { PageData } from './$types'
    
  export let data: PageData
</script>

<div class="projects">
  {#each data.projects as project}
    <ProjectsListItem project={project} />
  {/each}
</div>

<style lang="postcss">
  .projects {
    @apply 
      container
      flex 
      flex-col 
      h-full 
      mx-auto 
      items-center
      mt-24
  }
</style>