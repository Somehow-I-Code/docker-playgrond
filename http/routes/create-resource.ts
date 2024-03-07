import { FastifyInstance } from "fastify";
import { z } from "zod";

import prisma from "../../lib/prisma";

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

    const {
      name,
      description,
      category: { id: categoryId, name: categoryName },
    } = resourceBody.parse(request.body);

    const resource = await prisma.resource.create({
      data: {
        name,
        description,
        category: {
          connectOrCreate: {
            where: {
              id: categoryId || 0,
            },
            create: {
              name: categoryName,
            },
          },
        },
      },
    });

    return reply.code(201).send(resource);
  });
}
