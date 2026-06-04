import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveMood = mutation({
  args: {
    userEmail: v.string(),
    mood: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mood", {
      userEmail: args.userEmail,
      mood: args.mood,
      createdAt: Date.now(),
    });
  },
});

export const listMoods = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("mood")
      .withIndex("by_user_email", (q) => q.eq("userEmail", args.userEmail))
      .order("desc")
      .take(20);
  },
});
