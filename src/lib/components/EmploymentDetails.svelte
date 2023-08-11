<script lang="ts">
	import type { Employment } from "$lib/types"
	import Expandable from "$lib/components/Expandable.svelte"
  import Arrow from "$lib/components/Arrow.svelte"

  export let employment: Employment
  export let parent: any

  // $: console.log('parent', parent)

</script>

<div class="employment-details">

  <div class="header flex justify-between">
    <header class="flex flex-col">
      <div>{employment.role.title}</div>
      <div>
        {employment.employer.name}
        <a href={employment.employer.link.href} class="ml-1" title={employment.employer.link.text}>🔗</a>
      </div>
    </header>
    <div class="employment-time">
      {employment.start_time} – {employment.end_time}
    </div>
  </div>

  <div class="general flex justify-between">
    <div>
      <span class="chip variant-ghost-tertiary">{employment.time_type}</span>
      <span class="chip variant-ghost-tertiary">{employment.work_location}</span>
      <span class="chip variant-ghost-tertiary">{employment.role.required_experience}</span>
    </div>
    <div>
      {#if employment.active}
        <span class="chip variant-ghost-success">active</span>
      {:else}
        <span class="chip variant-ghost-error">inactive</span>
      {/if}
    </div>
  </div>

  <hr>

  <article>
    {#if employment.role.description.length > 0}
      <section class="description flex flex-wrap">
        <h2>Description</h2>
        <ul>
          {#each employment.role.description as bullet_point}
            <li class="list-disc ml-5">{bullet_point}</li>
          {/each}
        </ul>
      </section>
    {/if}
    {#if employment.role.responsibilities.length > 0}
      <section class="responsibilities flex flex-wrap">
        <h2>Responsibilities</h2>
        <ul>
          {#each employment.role.responsibilities as responsibility}
            <li class="list-disc ml-4">{responsibility}</li>
          {/each}
        </ul>
      </section>
    {/if}
    {#if employment.projects.length > 0}
      <section class="projects flex flex-wrap">
        <h2>Projects</h2>
        <ul>
          {#each employment.projects as project}
          <li class="project flex flex-col">
            <fieldset 
              class="border border-tertiary-600 {
                project.expanded ? '' : 'border-opacity-0'
              }"
            >
              <legend class="flex flex-nowrap text-base px-1 cursor-pointer items-center justify-center"
                on:click={() => {project.expanded = !project.expanded}}
                on:keyup={() => {}}
              >
                <div class="pr-2 pb-1">{project.name}</div>
                <Arrow 
                  direction={project.expanded ? 'down' : 'right'} 
                  svg_fill={'fill-tertiary-600'}
                  classes={'fill-tertiary-600'}
                  box_height={10}
                  box_width={10}
                  scale={0.9}
                />
              </legend>
              <Expandable expanded={project.expanded}>
                <div class="flex flex-col px-2">
                  <div class="project-description flex flex-wrap mt-1">
                    <div class="mr-2 mb-2 min-w-[100px]">Description:</div>
                    <div>{project.description}</div>
                  </div>
                  <div class="project-public-link flex flex-wrap mt-2">
                    {#if project.link.href}
                      <div class="mr-2 mb-2 min-w-[100px]">Link:</div>
                      <a href={project.link.href}>{project.link.text}</a>
                    {:else}
                      <div>[no public link available]</div>
                    {/if}
                  </div>
                  {#if project.tools.length > 0}
                    <div class="project-tools flex flex-wrap mt-2">
                      <div class="mr-2 mb-2 min-w-[100px]">Tools:</div>
                      {#each project.tools as project_tool}
                        <span class="project-tool chip variant-ghost">
                          {project_tool.name}
                          {#if project_tool.link.href}
                            <a href={project_tool.link.href} class="ml-2" title={project_tool.link.text}>🔗</a>
                          {/if}
                        </span>
                      {/each}
                    </div>
                  {/if}
                  {#if project.technologies.length > 0}
                    <div class="project-technologies flex flex-wrap mt-2">
                      <div class="mr-2 mb-2 min-w-[100px]">Technologies:</div>
                      <div class="flex flex-wrap">
                        {#each project.technologies as technology}
                          <div class="flex">
                            <span class="technology chip variant-ghost">
                              {technology.name} ({technology.type})
                              <a href={technology.link.href} class="ml-2" title={technology.link.text}>🔗</a>
                            </span>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              </Expandable>
            </fieldset>
          </li>
          {/each}
        </ul>
      </section>
    {/if}
    {#if employment.tools.length > 0}
      <section class="tools flex flex-wrap">
        <h2>Tools</h2>
        <ul>
          {#each employment.tools as tool}
            <li class="tool flex flex-col">
              <div>{tool.name}</div>
              <div class="flex flex-wrap">
                {#each tool.purposes as purpose}
                  <span class="chip purpose">{purpose}</span>
                {/each}
              </div>
            </li>
          {/each}
        </ul>
      </section>
    {/if}
    {#if employment.technologies.length > 0}
      <section class="employment-technologies flex flex-wrap">
        <h2 class="mr-2 mb-2 min-w-[100px]">Technologies</h2>
        <div class="flex flex-wrap">
          {#each employment.technologies as technology}
            <div class="flex">
              <span class="technology chip variant-ghost">
                {technology.name} ({technology.type})
                <a href={technology.link.href} class="ml-2" title={technology.link.text}>🔗</a>
              </span>
            </div>
          {/each}
        </div>
      </section>
    {/if}
    {#if employment.achievements.length > 0}
      <section class="achievements flex flex-wrap">
        <h2>Achievements</h2>
        <ul>
          {#each employment.achievements as achievement}
            <li class="list-disc ml-5">{achievement}</li>
          {/each}
        </ul>
      </section>
    {/if}
    {#if employment.things_learned.length > 0}
      <section class="things-learned flex flex-wrap">
        <h2>Things learned</h2>
        <ul>
          {#each employment.things_learned as learned_thing}
            <li class="list-disc ml-5">{learned_thing}</li>
          {/each}
        </ul>
      </section>
    {/if}
  </article>
  <slot/>
</div>

<style lang="postcss">
  .employment-details {
    max-height: 95vh;
    @apply 
      w-modal
      lg:w-modal-wide
      dark:bg-surface-600
      bg-surface-50
      p-4
      shadow-xl
      space-y-4
      overflow-auto
  }
  header {
    @apply text-lg
  }
  h2 {
    @apply
      text-base
      mr-8
      min-w-[105px]
  }
  .project {
    @apply my-2
  }
  .project:last-child {
    @apply mb-0
  }
  .project-tool {
    @apply 
      border-surface-500
      dark:border-tertiary-500
      dark:bg-tertiary-700
      bg-surface-200
      dark:bg-opacity-20
      dark:border-opacity-50
      dark:border
      max-h-6
  }
  section {
    @apply my-4
  }
  section:last-child {
    @apply mb-0
  }
  .chip {
    @apply
      mr-1
      mt-1
      cursor-default
      px-1.5
      pt-0.5
      pb-1
  }
  .tool {
    @apply
      my-2
  }
  .tool:first-child {
    @apply mt-0
  }
  .purpose {
    @apply 
      border-surface-500
      dark:border-tertiary-500
      dark:bg-tertiary-700
      bg-surface-200
      dark:bg-opacity-20
      dark:border-opacity-50
      border
  }
  .technology {
    @apply 
      border-surface-500
      dark:border-tertiary-500
      dark:bg-tertiary-700
      bg-surface-200
      dark:bg-opacity-20
      dark:border-opacity-50
      dark:border
      max-h-6
  }
</style>
