import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveGroundingEntry = mutation({
  args: {
    userEmail: v.string(),
    fiveSee: v.string(),
    fourFeel: v.string(),
    threeHear: v.string(),
    twoSmell: v.string(),
    oneTaste: v.string(),
    bunnyMessage: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("grounding", {
      userEmail: args.userEmail,
      fiveSee: args.fiveSee,
      fourFeel: args.fourFeel,
      threeHear: args.threeHear,
      twoSmell: args.twoSmell,
      oneTaste: args.oneTaste,
      bunnyMessage: args.bunnyMessage,
      createdAt: Date.now(),
    });
  },
});

export const listGroundingEntries = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("grounding")
      .withIndex("by_user_email", (q) => q.eq("userEmail", args.userEmail))
      .order("desc")
      .take(10);
  },
});
