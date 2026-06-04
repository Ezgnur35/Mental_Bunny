import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveJournalEntry = mutation({
  args: {
    userEmail: v.string(),
    mood: v.string(),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("journal", {
      userEmail: args.userEmail,
      mood: args.mood,
      note: args.note,
      createdAt: Date.now(),
    });
  },
});

export const listJournalEntries = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("journal")
      .withIndex("by_user_email", (q) => q.eq("userEmail", args.userEmail))
      .order("desc")
      .take(20);
  },
});
