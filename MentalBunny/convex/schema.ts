import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
  }).index("by_email", ["email"]),

  journal: defineTable({
    userEmail: v.string(),
    mood: v.string(),
    note: v.string(),
    createdAt: v.number(),
  }).index("by_user_email", ["userEmail"]),

  brainDump: defineTable({
    userEmail: v.string(),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_user_email", ["userEmail"]),

  grounding: defineTable({
    userEmail: v.string(),
    fiveSee: v.string(),
    fourFeel: v.string(),
    threeHear: v.string(),
    twoSmell: v.string(),
    oneTaste: v.string(),
    bunnyMessage: v.string(),
    createdAt: v.number(),
  }).index("by_user_email", ["userEmail"]),

  mood: defineTable({
    userEmail: v.string(),
    mood: v.string(),
    createdAt: v.number(),
  }).index("by_user_email", ["userEmail"]),
});
