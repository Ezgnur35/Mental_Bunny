import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveBrainDumpNote = mutation({
  args: {
    userEmail: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("brainDump", {
      userEmail: args.userEmail,
      text: args.text,
      createdAt: Date.now(),
    });
  },
});

export const listBrainDumpNotes = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("brainDump")
      .withIndex("by_user_email", (q) => q.eq("userEmail", args.userEmail))
      .order("desc")
      .take(20);
  },
});
