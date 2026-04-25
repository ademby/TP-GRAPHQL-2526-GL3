import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context#GraphQLContext",
        mappers: {
          Cv: "@prisma/client#Cv_prisma",
          User: "@prisma/client#User_prisma",
          Skill: "@prisma/client#Skill_prisma",
          Role: "@prisma/client#Role_prisma",
        },
      },
    },
  },
};

export default config;
