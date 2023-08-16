<script lang="ts">
	import type { Project } from "$lib/types"
  import TechnologyChip from "$lib/components/TechnologyChip.svelte"

  export let project: Project
</script>

<a href='projects/{project.slug}'
  class="projects-list-item
    flex
    flex-row
    card
    card-hover
    bg-surface-200
    dark:bg-surface-700
    bg-opacity-90
    rounded-md
    mb-4
    p-4
    max-w-2xl
    border-primary-900"
>
  <img class="project-screenshot unselectable" src={project.screenshot.href} alt={project.screenshot.alt}>

  <div class="project-info flex flex-col content-between justify-between pl-1">
    <header class="project-name
        card-header
        text-tertiary-700
        text-xl
        dark:text-primary-500"
    >
      {project.link.text || project.name ? project.link.text || project.name : '[project name]'}
    </header>
    <section class="px-4">
      <div class="project-description">{project.description ? project.description : '[project description]'}</div>
    </section>
    {#if project.technologies.length > 0}
      <section class="technologies flex px-4">
        {#each project.technologies as technology}
          <TechnologyChip {technology} />
        {/each}
      </section>
    {/if}
    <footer class="card-footer">
      <div class="activity">
        last activity: [todo: calculate last activity]
      </div>
    </footer>
  </div>
</a>

<style lang="postcss">
</style>
