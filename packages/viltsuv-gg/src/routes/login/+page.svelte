<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData

	/** @type {import('./$types').ActionData} */
	export let form: import('./$types').ActionData

  console.log('----- +page.svelte ----- data: ', data)
</script>

<svelte:head>
  <title>Log in</title>
</svelte:head>

<div class="flex flex-col justify-center items-center">

  <form method="POST" action="/login" class="login-form card flex flex-col max-w-lg mt-8 p-7 gap-5">

    <header class="text-2xl">Log in</header>

    <div>
      <div>Email</div>
      <input class="input" type="text" name="email">
    </div>

    <div>
      <div>Password</div>
      <input class="input" type="password" name="password">
    </div>

    <button type="submit" class="btn variant-filled-tertiary">Submit</button>

  </form>

  {#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
	<p>Successfully logged in! Welcome back, {data.user.username}</p>
{/if}

</div>