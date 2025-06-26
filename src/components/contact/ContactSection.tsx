import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Facebook, Twitter, Instagram, Youtube, Linkedin, Music, Users, MessageSquare } from 'lucide-react';

interface ContactData {
  contact: {
    company: string;
    tagline: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    phone: string;
    email: string;
    website: string;
    hours: {
      weekdays: string;
      weekends: string;
      timezone: string;
    };
  };
  socialMedia: Array<{
    platform: string;
    url: string;
    icon: string;
    followers: string;
  }>;
  departments: Array<{
    name: string;
    email: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  newsletter: {
    title: string;
    description: string;
    benefits: string[];
  };
}

export const ContactSection: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    // Load contact data
    fetch('/data/contact.json')
      .then(response => response.json())
      .then(data => setContactData(data))
      .catch(error => console.error('Error loading contact data:', error));
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate newsletter subscription
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const getSocialIcon = (iconType: string) => {
    switch (iconType.toLowerCase()) {
      case 'facebook': return <Facebook size={24} />;
      case 'twitter': return <Twitter size={24} />;
      case 'instagram': return <Instagram size={24} />;
      case 'youtube': return <Youtube size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'music': return <Music size={24} />; // TikTok
      default: return <MessageSquare size={24} />;
    }
  };

  if (!contactData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contact information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-afriqar-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-afriqar-white/90 max-w-3xl mx-auto">
            {contactData.contact.tagline} - We're here to help you on your heritage journey. 
            Get in touch with our team for support, partnerships, or just to say hello.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-afriqar-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-afriqar-secondary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-afriqar-primary mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us a message and we'll respond within 24 hours</p>
            <a
              href={`mailto:${contactData.contact.email}`}
              className="text-afriqar-accent hover:text-afriqar-blue-dark font-medium"
            >
              {contactData.contact.email}
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-afriqar-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-afriqar-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-afriqar-primary mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our support team</p>
            <a
              href={`tel:${contactData.contact.phone}`}
              className="text-afriqar-accent hover:text-afriqar-blue-dark font-medium"
            >
              {contactData.contact.phone}
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-afriqar-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-afriqar-secondary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-afriqar-primary mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Come see us at our headquarters</p>
            <div className="text-afriqar-accent">
              <div>{contactData.contact.address.street}</div>
              <div>{contactData.contact.address.city}, {contactData.contact.address.state}</div>
              <div>{contactData.contact.address.country} {contactData.contact.address.zipCode}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Send us a Message</h2>
            
            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                  >
                    <option value="">Select a department</option>
                    {contactData.departments.map((dept, index) => (
                      <option key={index} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Departments */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Contact Departments</h2>
              <div className="space-y-4">
                {contactData.departments.map((dept, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-semibold text-afriqar-primary mb-1">{dept.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-afriqar-accent hover:text-afriqar-blue-dark text-sm font-medium"
                    >
                      {dept.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-afriqar-primary mb-6 flex items-center">
                <Clock className="mr-3" size={24} />
                Office Hours
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Weekdays:</span>
                  <span className="text-afriqar-secondary">{contactData.contact.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Weekends:</span>
                  <span className="text-afriqar-secondary">{contactData.contact.hours.weekends}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Timezone:</span>
                  <span className="text-afriqar-secondary">{contactData.contact.hours.timezone}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Follow Us</h2>
              <div className="grid grid-cols-2 gap-4">
                {contactData.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-afriqar-secondary/50 hover:bg-afriqar-green-light/10 transition-colors"
                  >
                    <div className="text-afriqar-accent">
                      {getSocialIcon(social.icon)}
                    </div>
                    <div>
                      <div className="font-medium text-afriqar-primary">{social.platform}</div>
                      <div className="text-sm text-gray-600">{social.followers}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {contactData.faq.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-afriqar-primary">{faq.question}</h3>
                    <div className={`transform transition-transform ${expandedFAQ === index ? 'rotate-45' : ''}`}>
                      <svg className="w-6 h-6 text-afriqar-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-afriqar-secondary to-afriqar-accent rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{contactData.newsletter.title}</h2>
            <p className="text-lg opacity-90 mb-8">{contactData.newsletter.description}</p>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">You'll receive:</h3>
                <div className="space-y-2">
                  {contactData.newsletter.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="flex-shrink-0 mt-1" size={16} />
                      <span className="opacity-90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {newsletterSubscribed ? (
                  <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Welcome Aboard!</h3>
                    <p className="opacity-90">You've successfully subscribed to our newsletter.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-white text-afriqar-secondary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                    >
                      Subscribe Now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
