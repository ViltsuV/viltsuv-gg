<script lang="ts">
	import type { Project } from "$lib/types"

  export let project: Project
</script>

<div class="projects-list-item flex flex-row">

  <img class="project-screenshot unselectable" src={project.screenshot.href} alt={project.screenshot.alt}>

  <div class="project-info">
    <a href='projects/{project.slug}' class="project-name">
      {project.link.text || project.name ? project.link.text || project.name : '[project name]'}
    </a>
    <div class="project-description">{project.description ? project.description : '[project description]'}</div>
    <div class="activity">
      last activity: [todo: calculate last activity]
    </div>
    <div class="technologies">
      tech stack / tools:
      {#each project.technologies as technology}
        <div class="technology technology-type-{technology.type}">
          {technology.name}
        </div>
      {/each}
    </div>
  </div>

</div>

<style lang="postcss">
  .projects-list-item {
    @apply
      rounded-md
      mb-4
      p-4
      border-primary-900
      bg-gray-500
      bg-opacity-10
  }
  .project-info {
    @apply
      pl-4
  }
	.unselectable {
		user-select: none
	}
  .technology-type-frontend {

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
