import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    clerkId: v.string(),
    role: v.optional(v.string()),
    sector: v.optional(v.string()),
    status: v.optional(v.string()),
    approvedBy: v.optional(v.id("users")),
    approvedAt: v.optional(v.number()),
    rejectedBy: v.optional(v.id("users")),
    rejectedAt: v.optional(v.number()),
    rejectionReason: v.optional(v.string()),
    description: v.optional(v.string()),
    avatar: v.optional(v.string()),
    projects: v.optional(v.array(v.string())),
    likedProjects: v.optional(v.array(v.string())),
    stars: v.optional(v.array(v.string())),
    ProjectsCount: v.optional(v.array(v.number())),
  })
    .index("by_name", ["name"])
    .index("by_clerk_id", ["clerkId"])
    .index("by_role", ["role"])
    .index("by_status", ["status"]),
  projects: defineTable({
    name:v.string(),
    description: v.string(),
    imgs: v.array(v.string()),
    userId:v.string()
  })
  .index("by_userId",["userId"]),
});


