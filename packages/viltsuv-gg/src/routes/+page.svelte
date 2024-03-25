<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton'
	import ProjectsListItem from '$lib/components/ProjectsListItem.svelte'
  import type { PageData } from './$types'
    
  export let data: PageData
</script>

<div class="container h-full mx-auto flex flex-col items-center">

	<header class="space-y-1 text-center flex flex-row items-center justify-start py-8">
		<Avatar
			src="https://gravatar.com/avatar/38f2aba6683a7e54f4d81252718a17f7?s=200"
			width="w-32"
			rounded="rounded-full"
		/>
		<h2 class="font-bold pl-6">ViltsuV</h2>
	</header>

	<article class="flex flex-wrap justify-center lg:flex-nowrap mb-8 mx-4">

		<section class="description flex flex-col items-center min-w-[300px] lg:max-w-lg pb-8 lg:pb-0">
			<h2 class="mb-8">About me</h2>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed sapiente cupiditate voluptates! Obcaecati praesentium atque non quaerat sunt, consequatur quod ipsa rerum aperiam laudantium similique quidem necessitatibus quisquam beatae officia hic. Iusto assumenda labore illum rerum corporis atque dolore quaerat incidunt quidem consequatur? Molestiae, tempore. Odio deserunt facere iste alias ipsam veritatis magnam aut. Aliquam ipsum ratione atque veritatis qui corrupti! Fugit excepturi maxime sint distinctio pariatur eius sunt qui ducimus, dolore, labore exercitationem officiis sapiente aut nam iure esse perspiciatis ullam sit nesciunt odit quidem nostrum voluptas. Placeat vero, quis quaerat iste quia similique nam ducimus corporis suscipit sapiente, illo laboriosam dolores! Qui cumque atque quos unde debitis, vero pariatur. Pariatur dolore quam consequuntur. Culpa molestiae sit beatae harum, dicta nemo quos voluptatum facere deleniti assumenda ad nobis, impedit iste esse, minima eveniet! Dicta quia beatae voluptates asperiores rerum itaque placeat velit? Fuga culpa ipsam molestiae maiores molestias odio quae porro consequuntur similique, rerum, et at, suscipit placeat! Magni expedita dolor libero consectetur voluptatibus, quasi alias sit earum cumque cupiditate sed molestias iusto consequatur quaerat officia tenetur, ratione, architecto totam. Voluptas, cumque fugiat. Iusto quos aut ipsam sit facere totam placeat explicabo amet culpa dolorum doloremque illo nesciunt labore nisi praesentium quibusdam, maiores consequatur! Voluptatem, tempora quam ex eius ut nulla quos excepturi atque repellendus itaque totam in natus veniam quod nostrum? Architecto eum in facilis. Eius consequatur quia magnam! Nesciunt deleniti necessitatibus dolor, facere asperiores officia nam! Velit inventore excepturi natus quasi assumenda ullam dolorum aliquam distinctio nemo cumque eos amet molestiae modi dolor esse veniam fugit optio eaque, incidunt commodi quas! Ipsa, saepe repudiandae culpa provident laboriosam, ullam suscipit obcaecati unde sapiente nulla est possimus magnam tempore? Rerum autem, qui ut illo voluptatum nostrum neque culpa fugiat atque dolore dignissimos consequatur, repellat unde enim ducimus impedit magni.</p>
		</section>

		<span class="divider-vertical hidden lg:inline-block mx-4"></span>

		<section class="projects flex flex-col items-center">
			<h2 class="mb-8">Projects</h2>
			{#each data.projects as project}
				<ProjectsListItem project={project} />
			{/each}
		</section>

	</article>

</div>

<style lang="postcss">
</style>
