import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const registerUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();

    if (existingUser) {
      throw new ConvexError("Bu e-posta ile kayıtlı bir kullanıcı var.");
    }

    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: args.password,
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
    });

    return {
      id: userId,
      name: args.name,
      email: args.email,
    };
  },
});

export const loginUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();

    if (!user) {
      throw new ConvexError("Kullanıcı bulunamadı.");
    }

    if (user.password !== args.password) {
      throw new ConvexError("Şifre hatalı.");
    }

    await ctx.db.patch(user._id, {
      lastLoginAt: Date.now(),
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  },
});

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();
  },
});