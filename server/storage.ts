import { db } from "./db.js";
import { eq, desc } from "drizzle-orm";
import { parentApplications, type InsertParentApplication, type ParentApplication } from "../shared/schema.js";

export interface IStorage {
  createApplication(app: InsertParentApplication): Promise<ParentApplication>;
  getApplications(): Promise<ParentApplication[]>;
  getApplication(id: number): Promise<ParentApplication | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(app: InsertParentApplication): Promise<ParentApplication> {
    try {
      const [newApp] = await db
        .insert(parentApplications)
        .values(app)
        .returning();
      return newApp;
    } catch (error) {
      console.error("Error creating application:", error);
      throw new Error("Failed to create application in database");
    }
  }

  async getApplications(): Promise<ParentApplication[]> {
    try {
      return await db
        .select()
        .from(parentApplications)
        .orderBy(desc(parentApplications.createdAt));
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw new Error("Failed to fetch applications from database");
    }
  }

  async getApplication(id: number): Promise<ParentApplication | undefined> {
    try {
      const [application] = await db
        .select()
        .from(parentApplications)
        .where(eq(parentApplications.id, id));
      return application;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
      throw new Error("Failed to fetch application from database");
    }
  }
}

export const storage = new DatabaseStorage();
