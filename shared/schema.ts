import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const parentApplications = pgTable("parent_applications", {
  id: serial("id").primaryKey(),
  contactPersonName: text("contact_person_name").notNull(),
  studentName: text("student_name").notNull(),
  studentAge: integer("student_age"),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  email: text("email"),
  
  // New fields
  gender: text("gender").notNull(),
  previousQuranLearning: text("previous_quran_learning").notNull(),
  interestedInTrial: text("interested_in_trial").notNull(),
  preferredLanguage: text("preferred_language").notNull(),
  
  subjectsInterested: text("subjects_interested").array().notNull(),
  studentLevel: text("student_level").notNull(),
  teachingMode: text("teaching_mode").notNull(),
  preferredTimeSlots: text("preferred_time_slots").array().notNull(),
  daysAvailable: text("days_available").array().notNull(),
  specialRequirements: text("special_requirements"),
  
  city: text("city"),
  area: text("area"),
  travelDistance: text("travel_distance"),
  
  paymentPreference: text("payment_preference"),
  packageInfo: text("package_info"),
  
  confirmationAccuracy: boolean("confirmation_accuracy").notNull(),
  
  referralSource: text("referral_source"),
  studentAdditionalNotes: text("student_additional_notes"),
  createdAt: text("created_at").default("NOW()"),
});

export const insertParentApplicationSchema = createInsertSchema(parentApplications)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    studentAge: z.number().min(1, "Age must be at least 1").optional().or(z.literal(null)),
    
    // New field validations
    gender: z.enum(['Male', 'Female', 'Other'], {
      required_error: "Gender is required",
    }),
    previousQuranLearning: z.enum(['Yes', 'No'], {
      required_error: "Please specify if student has studied Quran before",
    }),
    interestedInTrial: z.enum(['Yes', 'No'], {
      required_error: "Please specify if interested in trial class",
    }),
    preferredLanguage: z.enum(['Urdu', 'English', 'Arabic', 'Both Urdu & English'], {
      required_error: "Preferred language is required",
    }),
    
    subjectsInterested: z.array(z.string()).min(1, "Select at least one subject"),
    studentLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    teachingMode: z.enum(['Online', 'Offline', 'Both']),
    preferredTimeSlots: z.array(z.string()).min(1, "Select at least one time slot"),
    daysAvailable: z.array(z.string()).min(1, "Select at least one day"),
    confirmationAccuracy: z.boolean().refine(val => val === true, {
      message: "You must confirm the information is accurate"
    }),
    
    // Make existing optional fields explicitly optional
    city: z.string().optional(),
    area: z.string().optional(),
    travelDistance: z.string().optional(),
    paymentPreference: z.string().optional(),
    packageInfo: z.string().optional(),
    referralSource: z.string().optional(),
    studentAdditionalNotes: z.string().optional(),
    specialRequirements: z.string().optional(),
  });

export type ParentApplication = typeof parentApplications.$inferSelect;
export type InsertParentApplication = z.infer<typeof insertParentApplicationSchema>;
