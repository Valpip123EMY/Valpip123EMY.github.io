'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle, 
  Linkedin, 
  Github,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { isValidEmail } from '@/lib/utils';

// Animation variants matching hero page
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      inquiryType: '',
      message: '',
    });
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'valmik.nahata@gmail.com',
      href: 'mailto:valmik.nahata@gmail.com',
      description: 'Best way to reach me',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: '/in/valmiknahata',
      href: 'https://linkedin.com/in/valmiknahata',
      description: 'Professional network',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      description: 'Available for calls',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'New York City, NY',
      href: null,
      description: 'UC San Diego student',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'Coming Soon',
      href: null,
      description: 'Portfolio repositories',
      isComingSoon: true,
    },
  ];

  if (isSubmitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background matching hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-900" />
        
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 200 200" preserveAspectRatio="none">
          <defs>
            <pattern id="successgrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#successgrid)" />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center px-6"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Message Sent Successfully!
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl">
            Thank you for reaching out. I'll get back to you within 24 hours with a detailed response.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/40"
          >
            Send Another Message
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background matching hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-900" />
      
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 200 200" preserveAspectRatio="none">
        <defs>
          <pattern id="contactgrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contactgrid)" />
      </svg>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h1 variants={fadeInVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Let's{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Connect
              </span>
            </motion.h1>
            <motion.p variants={fadeInVariants} className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Ready to discuss opportunities, collaborate on projects, or explore how we can work together? 
              I'd love to connect and learn about your goals.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Methods - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  I'm available for research collaborations, internship opportunities, 
                  and professional discussions. Let's connect and explore potential partnerships.
                </p>
              </div>

              {/* Contact Methods Grid */}
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${
                      method.href && !method.isComingSoon ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => {
                      if (method.href && !method.isComingSoon) {
                        window.open(method.href, '_blank');
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        method.isComingSoon 
                          ? 'bg-slate-600/50' 
                          : 'bg-gradient-to-br from-indigo-400 to-purple-400'
                      }`}>
                        <method.icon className={`w-6 h-6 ${
                          method.isComingSoon ? 'text-slate-400' : 'text-white'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-semibold text-lg">{method.title}</h3>
                          {method.isComingSoon && (
                            <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                              Coming Soon
                            </span>
                          )}
                          {method.href && !method.isComingSoon && (
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                          )}
                        </div>
                        <p className={`text-lg font-medium ${
                          method.isComingSoon ? 'text-slate-400' : 'text-slate-200'
                        }`}>{method.value}</p>
                        <p className="text-slate-400 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Professional Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg"
              >
                <h3 className="text-white font-semibold text-lg mb-3">Response Time</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I typically respond to all inquiries within 24 hours. For urgent matters, 
                  please call directly or mention "urgent" in your subject line.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 ${
                          errors.name ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 ${
                          errors.email ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="your.email@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                        placeholder="Subject of your message"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-300 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="Research Collaboration">Research Collaboration</option>
                        <option value="Internship Opportunity">Internship Opportunity</option>
                        <option value="Project Inquiry">Project Inquiry</option>
                        <option value="Academic Question">Academic Question</option>
                        <option value="General Question">General Question</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none transition-all duration-200 ${
                        errors.message ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Tell me about your project, requirements, and goals..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator matching hero */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2" 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-white/15 rounded-full flex justify-center items-start">
          <motion.div 
            className="w-1 h-3 bg-white/50 rounded-full mt-2" 
            animate={{ opacity: [0.6, 1, 0.6] }} 
            transition={{ duration: 2.4, repeat: Infinity }} 
          />
        </div>
      </motion.div>
    </section>
  );
}