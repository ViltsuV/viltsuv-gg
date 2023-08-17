import type { Projects } from '$lib/types'
import type { PageLoad } from './$types'

export const load = (async () => {
	// todo: fetch data from db
	const projects: Projects = [
		{
			name: 'FFMPEG Command Generator',
			activity_periods: [{ start_time: '', end_time: '' }],
			company_name: '',
			description: 'A web interface for creating FFMPEG commands',
			join_time: '',
			owner: '',
			screenshot: {
				href: 'https://gravatar.com/avatar/38f2aba6683a7e54f4d81252718a17f7?s=200',
				alt: 'screenshot alt',
			},
			slug: 'ffmpeg-command-generator',
			technologies: [
				{
					link: {
						href: 'https://svelte.dev',
						text: 'Svelte'
					},
					name: 'Svelte',
					type: 'frontend',
					icon: {
						src: ''
					}
				}
			],
			tools: [],
			link: {
				href: '/',
				text: 'FFMPEG Command Generator'
			},
			expanded: false,
		},
		{
			name: 'Work History Timeline',
			activity_periods: [{ start_time: '', end_time: '' }],
			company_name: '',
			description: 'description',
			join_time: '',
			owner: '',
			screenshot: {
				href: 'https://gravatar.com/avatar/38f2aba6683a7e54f4d81252718a17f7?s=200',
				alt: 'screenshot alt',
			},
			slug: 'work-history-timeline',
			technologies: [],
			tools: [],
			link: {
				href: '/',
				text: 'Work History Timeline'
			},
			expanded: false,
		},
	]
	return {
		projects: projects,
	}
}) satisfies PageLoad
