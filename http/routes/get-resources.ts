import { FastifyInstance } from 'fastify'
import resourceRepository from '../../repositories/resource'

export default async function getResources(fastify: FastifyInstance) {
  fastify.get('/resources', async (request, reply) => {
    const resources = await resourceRepository.findAll()
    return reply.send(resources)
  })
}
