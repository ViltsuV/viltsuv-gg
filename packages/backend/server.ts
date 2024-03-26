import fastifyEnv from '@fastify/env'
import dotenv from 'dotenv'
import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import Fastify from 'fastify'

dotenv.config({
	path: `./.env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`,
})

const logger_env_options = {
	development: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	},
	production: true,
	test: false,
}
const server: FastifyInstance = Fastify({
	logger: logger_env_options[process.env.NODE_ENV] ?? true, // defaults to true if no entry matches in the map
})

const backend_env_options = {
	schema: {
		type: 'object',
		required: [
			'NODE_ENV',
			'BACKEND_IP_ADDRESS',
			'BACKEND_PORT',
			'EXTERNAL_API_KEY',
			'DB_PROTOCOL',
			'DB_IP_ADDRESS',
			'DB_USERNAME',
			'DB_PASSWORD',
		],
		properties: {
			NODE_ENV: { type: 'string' },
			BACKEND_IP_ADDRESS: { type: 'string' },
			BACKEND_PORT: { type: 'string' },
			EXTERNAL_API_KEY: { type: 'string' },
			DB_PROTOCOL: { type: 'string' },
			DB_IP_ADDRESS: { type: 'string' },
			DB_USERNAME: { type: 'string' },
			DB_PASSWORD: { type: 'string' },
		},
	},
	dotenv: {
		encoding: 'UTF-8',
		path: `./.env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`,
		debug: true,
	},
	data: process.env, // Load environment variables from process.env
}

// Register @fastify/env plugin to load environment variables
server.register(fastifyEnv, backend_env_options)

server.get('/', async function handler(/* request, reply */) {
	return { message: 'Hello from Fastify!' }
})

const opts: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					pong: {
						type: 'string',
					},
				},
			},
		},
	},
}
server.get('/ping', opts, async () => {
	console.log('responding', `node running in ${process.env.NODE_ENV}`)
	return JSON.stringify({ pong: 'it worked!', env: `node running in ${process.env.NODE_ENV}` })
})

const start = async () => {
	try {
		await server.listen({
			port: 4000,
			host: '0.0.0.0', // listen to all network interfaces
		})

		const address = server.server.address()
		const port = typeof address === 'string' ? address : address?.port
		console.log(`\n--- [${process.env.NODE_ENV} mode] Fastify listening on port ${port} ---\n`)
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}

start()
