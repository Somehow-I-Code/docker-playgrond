import Fastify from 'fastify'

import createResource from './http/routes/create-resource'
import getResources from './http/routes/get-resources'

const fastify = Fastify({ logger: true })

fastify.register(createResource)
fastify.register(getResources)

fastify.listen({ port: 8888, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
