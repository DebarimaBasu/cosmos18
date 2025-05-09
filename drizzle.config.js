export default {
    dialect: "postgresql",
    schema: "./src/utils/schema.jsx",
    out: "./drizzle",
    dbCredentials: {
      url: "postgresql://neondb_owner:npg_bM1nAoCd2BQP@ep-snowy-boat-a5ci2r0a-pooler.us-east-2.aws.neon.tech/cosmos?sslmode=require",
      connectionString:
        "postgresql://neondb_owner:npg_bM1nAoCd2BQP@ep-snowy-boat-a5ci2r0a-pooler.us-east-2.aws.neon.tech/cosmos?sslmode=require",
    },
  };