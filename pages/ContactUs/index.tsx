import React, { useState } from 'react';
import { db } from '../../database/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const contactCollection = collection(db, 'ContactMessages');
      await addDoc(contactCollection, {
        ...formData,
        timestamp: new Date(),
      });

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Address */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-[#e3a62f]/10 rounded-lg">
                      <svg className="w-6 h-6 text-[#e3a62f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                    <p className="mt-1 text-gray-600">
                      123 Business Avenue<br />
                      Bangalore, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-[#5c941d]/10 rounded-lg">
                      <svg className="w-6 h-6 text-[#5c941d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <a href="mailto:info@askyourdost.com" className="mt-1 text-[#5c941d] hover:text-[#5c941d]/80">
                      info@askyourdost.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-[#0cc0df]/10 rounded-lg">
                      <svg className="w-6 h-6 text-[#0cc0df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <a href="tel:+919876543210" className="mt-1 text-gray-600 hover:text-gray-900">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm p-4 h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085423527511!3d12.954294595483649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1650123456789!5m2!1sen!2sin"
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5c941d] focus:ring-[#5c941d] sm:text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5c941d] focus:ring-[#5c941d] sm:text-sm"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5c941d] focus:ring-[#5c941d] sm:text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5c941d] focus:ring-[#5c941d] sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5c941d] hover:bg-[#5c941d]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c941d] ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`rounded-md p-4 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
