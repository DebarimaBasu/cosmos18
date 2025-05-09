import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:npg_bM1nAoCd2BQP@ep-snowy-boat-a5ci2r0a-pooler.us-east-2.aws.neon.tech/cosmos?sslmode=require"
);
export const db = drizzle(sql, { schema });