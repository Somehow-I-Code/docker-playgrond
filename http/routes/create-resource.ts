import { FastifyInstance } from "fastify";
import { z } from "zod";

import resourceRepository from "../../repositories/resource";

export default async function createResource(fastify: FastifyInstance) {
  fastify.post("/resources", async (request, reply) => {
    const resourceBody = z.object({
      name: z.string(),
      description: z.string(),
      category: z.object({
        id: z.number().optional(),
        name: z.string(),
      }),
    });

    const newResource = resourceBody.parse(request.body);
    const resource = await resourceRepository.create(newResource);

    return reply.code(201).send(resource);
  });
}
