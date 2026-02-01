import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addSponsorInquiry, SponsorInquiry } from '../firebase/sponsors';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Sponsors from '../components/Sponsors';

const SponsorContact: React.FC = () => {
    const [formData, setFormData] = useState<SponsorInquiry>({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Basic validation
        if (!formData.name || !formData.email || !formData.company) {
            toast.error('Please fill in all required fields.');
            setIsSubmitting(false);
            return;
        }

        const result = await addSponsorInquiry(formData);

        if (result.success) {
            toast.success('Thank you for your interest! We will be in touch soon.');
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                message: ''
            });
        } else {
            toast.error('Something went wrong. Please try again later.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden flex flex-col items-center gap-20">
            {/* Background Decor - consistent with Main.tsx */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[128px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[128px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-gray-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                        Partner With Us 
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Join us in empowering the next generation of data scientists.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                                placeholder="Tech Corp"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number (Optional)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600 resize-none"
                            placeholder="Tell us about your sponsorship goals..."
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-900/20 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                'Submit Inquiry'
                            )}
                        </button>

                        <Link to="/" className="text-center text-sm text-gray-500 hover:text-gray-300 transition-colors">
                            Return to Home
                        </Link>
                    </div>
                </form>
            </motion.div>

            <div className="w-full max-w-7xl mx-auto z-10">
                <Sponsors title="Join our legacy of sponsors" showBackground={false} />
            </div>
        </div>
    );
};

export default SponsorContact;
