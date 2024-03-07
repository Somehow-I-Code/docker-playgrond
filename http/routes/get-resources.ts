import { FastifyInstance } from "fastify";
import prisma from "../../lib/prisma";

export default async function getResources(fastify: FastifyInstance) {
  fastify.get("/resources", async (request, reply) => {
    const resources = await prisma.resource.findMany({
      include: {
        category: true,
      },
    });

    return reply.send(resources);
  });
}
