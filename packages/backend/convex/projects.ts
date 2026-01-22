
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { usePaginatedQuery } from "convex-helpers/react";


export const my_projects = query({
    handler: async(ctx)=>{
        const index = await ctx.auth.getUserIdentity();
        const id =  index?.subject as any
        return ctx.db.query("projects").withIndex("by_userId", (q) => q.eq("userId", id)).collect()
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
       const identity =  await ctx.auth.getUserIdentity()
         if (!identity) throw new Error("Usuário não autenticado");
        const userId = identity.subject
      return  await ctx.db.insert("projects", {...args, userId})
    }
})
export const PatchProjects = mutation({
    args:{
        projectId: v.id("projects"),
        updates: v.object({
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        })
    },
    handler: async(ctx, args)=> {
        ctx.db.patch(args.projectId, args.updates)
    },
})