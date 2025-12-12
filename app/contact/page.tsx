import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact PUXX Ireland - Get in Touch',
  description:
    'Have questions about our nicotine pouches? Contact PUXX Ireland for product information, delivery questions, or customer support. We\'re here to help!',
  keywords: 'contact PUXX Ireland, customer support, nicotine pouches help, PUXX contact',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact PUXX Ireland</h1>
            <p className="text-lg md:text-xl text-green-50">
              Have a question or need assistance? We're here to help. Send us a message and
              we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form - Left Side (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll respond within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Contact Information Sidebar - Right Side (1/3 width on desktop) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:hello@puxxnicotine.ie"
                      className="text-sm text-green-600 hover:text-green-700 hover:underline"
                    >
                      hello@puxxnicotine.ie
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <a
                      href="tel:+35312345678"
                      className="text-sm text-green-600 hover:text-green-700 hover:underline"
                    >
                      +353 1 234 5678
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Business Hours</p>
                    <p className="text-sm text-gray-600">Monday - Friday</p>
                    <p className="text-sm text-gray-600">9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">
                      Serving all of Ireland
                      <br />
                      Fast nationwide delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links Card */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Help</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Shipping:</span> Free delivery on orders over €30
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Returns:</span> 30-day return policy
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Age:</span> 18+ only
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Payment:</span> Secure checkout available
                </p>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Response Time</h3>
              <p className="text-sm text-gray-600">
                We typically respond to all inquiries within <span className="font-semibold text-green-600">24 hours</span> during business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Why Contact Us */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              We're Here to Help
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you have questions about our products, need help with your order, or want
              to learn more about PUXX nicotine pouches, our team is ready to assist you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Questions</h3>
                <p className="text-sm text-gray-600">
                  Learn about flavors, strengths, and ingredients
                </p>
              </div>
              <div className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Support</h3>
                <p className="text-sm text-gray-600">
                  Track shipments and manage your orders
                </p>
              </div>
              <div className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-sm text-gray-600">
                  Partnership opportunities and more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
