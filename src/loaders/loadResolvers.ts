import path from "path";
import fs from "fs";
import { Resolver, Query } from "type-graphql";

@Resolver()
class DefaultResolver {
  @Query(() => String)
  hello() {
    return "Hello, World!";
  }
}

async function loadResolvers():Promise<Function[]> {
  const resolversDir = path.join(__dirname, "../resolvers"); // Path to the resolvers directory

  const resolversFiles = fs
    .readdirSync(resolversDir)
    .filter((file) => file.endsWith("resolver.ts")); // Get all resolver files

    console.log("Found resolver files:", resolversFiles);

  const resolvers = await Promise.all(
    resolversFiles.map(async (file) => {
      const module = await import(path.join(resolversDir, file)); // Dynamically import the resolver
      console.log("Loaded resolver:", file, module.default);
      return module.default; // Return the default export (the resolver class)
    })
  );

  if (resolvers.length === 0) {
    console.warn("No resolver files found in the resolvers directory.");

    resolvers.push(DefaultResolver);
  }

  return resolvers;
}

export default loadResolvers;
