
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getProjectsByUserId = query({
    args:{
        id: v.string()
    }, handler: async(ctx, args)=>{
        return ctx.db.query("projects").withIndex("by_userId", (q) => q.eq("userId", args.id)).collect()
    }
})

export const createProject = mutation({
    args:{
    name:v.string(),
    description: v.string(),
    imgs: v.array(v.string()),
    userId:v.string()
    },
    handler: async(ctx, args)=>{
      return  await ctx.db.insert("projects", args)
    }
})
