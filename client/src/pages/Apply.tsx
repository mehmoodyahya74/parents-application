import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertParentApplicationSchema, type InsertParentApplication } from "@shared/schema";
import { useCreateTutorApplication } from "@/hooks/use-tutor-applications";
import { Layout } from "@/components/ui/Layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2, User, MapPin, BookOpen, Phone, Shield, CreditCard, Languages, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const SUBJECTS_LIST = [
  "Quran",
  "Tajweed",
  "Arabic",
  "Islamic Studies",
  "Hifz",
  "Noorani Qaida"
];

const WEEKDAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const TIME_SLOTS = ["Morning", "Afternoon", "Evening"];

const LANGUAGES = ["Urdu", "English", "Arabic", "Both Urdu & English"];

export default function Apply() {
  const [, setLocation] = useLocation();
  const mutation = useCreateTutorApplication();
  const [teachingMode, setTeachingMode] = useState("Online");
  
  const form = useForm<InsertParentApplication>({
    resolver: zodResolver(insertParentApplicationSchema),
    defaultValues: {
      contactPersonName: "",
      studentName: "",
      studentAge: undefined,
      phoneNumber: "",
      email: "",
      subjectsInterested: [],
      studentLevel: "Beginner",
      teachingMode: "Online",
      preferredTimeSlots: [],
      daysAvailable: [],
      specialRequirements: "",
      city: "",
      area: "",
      travelDistance: "",
      paymentPreference: "",
      packageInfo: "",
      confirmationAccuracy: false,
      referralSource: "",
      studentAdditionalNotes: "",
      gender: "",
      previousQuranLearning: "",
      interestedInTrial: "",
      preferredLanguage: "",
    },
  });

  const onSubmit = (data: InsertParentApplication) => {
    mutation.mutate(data, {
      onSuccess: () => setLocation("/success"),
    });
  };

  const studentAge = form.watch("studentAge");
  const isAdult = studentAge && studentAge > 18;

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Registration</h1>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl max-w-2xl mx-auto mb-8">
              <p className="text-blue-800 font-medium">
                All tutors are verified and experienced. The first class can be a free trial. 
                Payments are fully tracked and safe.
              </p>
            </div>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  
                  {/* Section 1: Contact / Identity Information */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-blue-50 p-2 rounded-lg text-primary">
                        <User className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800"> Identity Information</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactPersonName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Contact Person Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Parent, guardian, or student name" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="studentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Student Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Name of the student" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="studentAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                              Student Age {!isAdult && <span className="text-red-500">*</span>}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Age" 
                                className="h-12 rounded-xl" 
                                {...field} 
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Gender <span className="text-red-500">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Contact Number <span className="text-red-500">*</span></FormLabel>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                              <FormControl>
                                <Input placeholder="0300 1234567" className="pl-10 h-12 rounded-xl" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Email Address <span className="text-slate-400 font-normal">(Optional)</span></FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" className="h-12 rounded-xl" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormDescription>Useful for confirmations and digital receipts.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Section 2: Previous Quran Learning */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800"> Previous Quran Learning</h2>
                    </div>

                    <p className="text-slate-600 mb-4">This helps place the student correctly.</p>

                    <FormField
                      control={form.control}
                      name="previousQuranLearning"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-slate-700 font-semibold">Has the student studied Quran before? <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row gap-6"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Yes" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="No" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Section 3: Trial Class Option */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800"> Trial Class Option</h2>
                    </div>

                    <p className="text-slate-600 mb-4">Before payment many parents want a trial class.</p>

                    <FormField
                      control={form.control}
                      name="interestedInTrial"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-slate-700 font-semibold">Interested in free trial class? <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row gap-6"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Yes" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="No" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Section 4: Language Preference */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                        <Languages className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800"> Language Preference</h2>
                    </div>

                    <p className="text-slate-600 mb-4">Some students need Urdu / English / Arabic explanation.</p>

                    <FormField
                      control={form.control}
                      name="preferredLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Preferred teaching language <span className="text-red-500">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              {LANGUAGES.map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Section 5: Class / Subject Information */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-green-50 p-2 rounded-lg text-green-600">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800"> Subject Information</h2>
                    </div>

                    <FormField
                      control={form.control}
                      name="subjectsInterested"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Subjects Interested <span className="text-red-500">*</span></FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                            {SUBJECTS_LIST.map((subject) => (
                              <FormField
                                key={subject}
                                control={form.control}
                                name="subjectsInterested"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(subject)}
                                        onCheckedChange={(checked) => {
                                          const updated = checked
                                            ? [...(field.value || []), subject]
                                            : field.value?.filter((s) => s !== subject);
                                          field.onChange(updated);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">{subject}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="studentLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Student Level <span className="text-red-500">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl">
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teachingMode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Preferred Teaching Mode <span className="text-red-500">*</span></FormLabel>
                            <Select 
                              onValueChange={(val) => {
                                field.onChange(val);
                                setTeachingMode(val);
                              }} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl">
                                  <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="Online">Online</SelectItem>
                                <SelectItem value="Offline">Offline</SelectItem>
                                <SelectItem value="Both">Both</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="preferredTimeSlots"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Preferred Time Slots <span className="text-red-500">*</span></FormLabel>
                            <div className="flex flex-wrap gap-4 mt-2">
                              {TIME_SLOTS.map((slot) => (
                                <FormField
                                  key={slot}
                                  control={form.control}
                                  name="preferredTimeSlots"
                                  render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(slot)}
                                          onCheckedChange={(checked) => {
                                            const updated = checked
                                              ? [...(field.value || []), slot]
                                              : field.value?.filter((s) => s !== slot);
                                            field.onChange(updated);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">{slot}</FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="daysAvailable"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Days Available <span className="text-red-500">*</span></FormLabel>
                            <div className="flex flex-wrap gap-3 mt-2">
                              {WEEKDAYS.map((day) => (
                                <FormField
                                  key={day}
                                  control={form.control}
                                  name="daysAvailable"
                                  render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(day)}
                                          onCheckedChange={(checked) => {
                                            const updated = checked
                                              ? [...(field.value || []), day]
                                              : field.value?.filter((d) => d !== day);
                                            field.onChange(updated);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-xs font-normal cursor-pointer">{day.substring(0, 3)}</FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Special Requirements / Notes <span className="text-slate-400 font-normal">(Optional)</span></FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Female tutor preference, learning difficulty, etc." 
                              className="min-h-[100px] rounded-xl" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Section 6: Location / Offline Info */}
                  {teachingMode !== "Online" && (
                    <section className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b">
                        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800"> Location / Offline Info</h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold">City / Area</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your city and area" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="travelDistance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold">Travel Distance (km)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Max distance you can travel" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </section>
                  )}

                  {/* Section 7: Payment / Package Information */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800"> Payment </h2>
                    </div>

                    <div className="grid md:grid-cols-1 max-w-md">
                      <FormField
                        control={form.control}
                        name="paymentPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Payment Preference</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl">
                                  <SelectValue placeholder="Select preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectItem value="Package">Package</SelectItem>
                                <SelectItem value="Per Class">Per Class</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Section 8: Confirmation */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-red-50 p-2 rounded-lg text-red-600">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Confirmation</h2>
                    </div>

                    <FormField
                      control={form.control}
                      name="confirmationAccuracy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-semibold cursor-pointer">
                              I confirm that all provided information is accurate <span className="text-red-500">*</span>
                            </FormLabel>
                            <p className="text-sm text-gray-500">
                              By checking this box, you confirm that the information provided is true and correct to the best of your knowledge.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </section>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold rounded-2xl transition-all hover:scale-[1.01]"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
