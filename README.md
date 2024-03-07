If you want to run this project you'll need to follow the steps below:

- run `docker compose up --build` from the root directory
- if you don't change anything in the `Dockerfile` you can use `docker compose up` for future container execution

This container is going to expose port 8888 on both host and container. That way, you're going to follow [http://localhost:8888/resources](http://localhost:8888/resources) to see results for resources.

That repo is going to build a container for `node` called `api` and another container for `postgres` called `postgres`. Since we're using Prisma, that can end up creating some files that differ depending on the current OS. That may cause your host `node_modules` to be different from the one in the container. To avoid problems, the `node_modules` is left to be handled during the build process.

If you want to add any packages by running `npm i <package>` (where `package` is a placeholder for what you're intending to install) you may need to run the same install command in the container to avoid missing module errors. You can do that by calling a `docker compose run api npm i <package>` (docker compose is going to run the command `npm i <package>` into the `api` service that corresponds to tho node project).

That's just a playground for us to practice backend concepts, so feel free to play and break it. We can always come back using git.
