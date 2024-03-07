import prisma from "../lib/prisma";

type CreateResourceProps = {
  name: string;
  description: string;
  category: {
    id?: number;
    name: string;
  };
};

class ResourceRepository {
  public async create(newResource: CreateResourceProps) {
    const {
      name,
      description,
      category: { id: categoryId, name: categoryName },
    } = newResource;

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

    return resource;
  }

  public async findAll() {
    const resources = await prisma.resource.findMany({
      include: {
        category: true,
      },
    });

    return resources;
  }
}

const resourceRepository = new ResourceRepository();

export default resourceRepository;
