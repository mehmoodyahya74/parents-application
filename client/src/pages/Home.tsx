import { Link } from "wouter";
import { Layout } from "@/components/ui/Layout";
import { ArrowRight, CheckCircle2, Search, Shield, BookOpen, Star, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Find Your Perfect Tutor Today
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 text-balance">
              Discover Expert Tutors for{" "}
              <span className="text-primary">Quran & Islamic Studies</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
              Connect with qualified, vetted tutors who provide personalized Islamic education. 
              Free trial class • Safe payments • Flexible scheduling
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Find a Tutor - Now the main/primary button */}
              <Link href="/find-tutor">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Find a Tutor <Search className="w-5 h-5" />
                </button>
              </Link>
              {/* Register as Student - Now the secondary button */}
              <Link href="/apply">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 font-bold text-lg border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all duration-300">
                  Register as Student
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Verified Tutors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Free Trial Class</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-green-600" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Families Choose Us</h2>
            <p className="text-muted-foreground text-lg">Quality education tailored to your child's needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Verified & Vetted Tutors"
              description="All tutors undergo background checks and qualification verification for your peace of mind."
              delay={0}
            />
            <FeatureCard 
              icon={<Clock className="w-8 h-8 text-primary" />}
              title="Flexible Scheduling"
              description="Book sessions that fit your family's schedule. Morning, afternoon, or evening availability."
              delay={0.1}
            />
            <FeatureCard 
              icon={<MessageCircle className="w-8 h-8 text-primary" />}
              title="Free Trial Class"
              description="Try a tutor risk-free with one free session to ensure the right fit for your child."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Popular Subjects */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Subjects</h2>
            <p className="text-muted-foreground text-lg">Specialized tutors for every aspect of Islamic education</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Quran",
              "Tajweed",
              "Arabic",
              "Islamic Studies",
              "Hifz",
              "Noorani Qaida"
            ].map((subject, index) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/tutors?subject=${subject}`}>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary hover:shadow-lg transition-all duration-300 text-center cursor-pointer group">
                    <BookOpen className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-slate-700">{subject}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-slate-200 -z-10" />
            
            <StepCard 
              number="01"
              title="Register Your Child"
              description="Fill out a simple form with your child's learning needs and preferences."
              delay={0}
            />
            <StepCard 
              number="02"
              title="Browse & Connect"
              description="Review tutor profiles, qualifications, and reviews. Message potential tutors."
              delay={0.1}
            />
            <StepCard 
              number="03"
              title="Start Learning"
              description="Begin with a free trial class and continue with flexible scheduling."
              delay={0.2}
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/find-tutor">
              <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25">
                Find Your Tutor
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials / Stats */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Qualified Tutors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">Parent Satisfaction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">10k+</div>
              <div className="text-primary-foreground/80">Classes Completed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start learning?</h2>
              <p className="text-slate-300 text-lg mb-8">
                Join hundreds of families who have found their perfect tutor match with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/find-tutor">
                  <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25">
                    Find a Tutor
                  </button>
                </Link>
                <Link href="/apply">
                  <button className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200">
                    Register as Student
                  </button>
                </Link>
              </div>
              <p className="text-sm text-slate-400 mt-6">
                First class is free. No commitment required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-8 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-slate-200 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StepCard({ number, title, description, delay }: { number: string, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-primary text-white rounded-2xl text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
