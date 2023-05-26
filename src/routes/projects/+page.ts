import type { Projects } from '$lib/types'
import type { PageLoad } from './$types'

export const load = (async () => {
	// todo: fetch data from db
	const projects: Projects = [
		{
			name: 'FFMPEG Command Generator',
			activity_periods: [{ start_time: '', end_time: '' }],
			company_name: '',
			description: 'description',
			join_time: '',
			owner: '',
			screenshot_alt: 'screenshot alt',
			screenshot_url: 'https://gravatar.com/avatar/38f2aba6683a7e54f4d81252718a17f7?s=200',
			slug: 'ffmpeg-command-generator',
			technologies: [{ name: '', type: 'frontend', url: '' }],
			url: 'https://gravatar.com/avatar/38f2aba6683a7e54f4d81252718a17f7?s=200',
		},
	]
	return {
		projects: projects,
	}
}) satisfies PageLoad
