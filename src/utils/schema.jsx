import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text ,boolean} from "drizzle-orm/pg-core";

// users schema
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull(),
  age: integer("age").notNull(),
  location: varchar("location").notNull(),
  folders: text("folders")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  treatmentCounts: integer("treatment_counts").notNull(),
  folder: text("folder")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  createdBy: varchar("created_by").notNull(),
});

//records schema
// schema.js or schema.mjs


export const Records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  todo: varchar("todo").notNull(),  // This will hold the todo string
  completed: boolean("completed").default(false),  // You can add a completion status if you'd like
  createdBy: varchar("created_by", { length: 256 }).default("Unknown"),

 // To track who created the todo
});




// export const Records = pgTable("records", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id")
//     .references(() => Users.id)
//     .notNull(),
//   // userId: varchar("user_id", { length: 255 })  // Ensuring the field matches the Users table id type
//   //   .references(() => Users.id)
//   //   .notNull(),
//   recordName: varchar("record_name").notNull(),
//   analysisResult: varchar("analysis_result").notNull(),
//   kanbanRecords: varchar("kanban_records").notNull(),
//   createdBy: varchar("created_by").notNull(),
// });



// Creating an index separately
// index("user_id_index", Records.userId);
