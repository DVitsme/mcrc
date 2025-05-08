import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Handshake, Heart } from 'lucide-react';

const FEATURES = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    title: 'Licensed Professionals',
    description: 'Our mediators are certified and experienced in conflict resolution.'
  },
  {
    icon: <Users className="w-6 h-6 text-green-600" />,
    title: 'Community Focused',
    description: 'Serving Howard County with a commitment to inclusivity and respect.'
  },
  {
    icon: <Handshake className="w-6 h-6 text-green-600" />,
    title: 'Collaborative Solutions',
    description: 'We help parties find common ground and lasting agreements.'
  },
  {
    icon: <Heart className="w-6 h-6 text-green-600" />,
    title: 'Confidential & Caring',
    description: 'Your privacy and well-being are our top priorities.'
  },
];

export function FeatureBlock() {
  return (
    <section className="w-full flex justify-center py-12 px-2">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl px-6 md:px-16 py-12 border border-gray-100">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-2">Why Choose Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Empowering Resolution, Building Community</h2>
          <p className="text-gray-600 max-w-2xl">We provide professional mediation and conflict resolution services to help individuals and organizations in Howard County, Maryland, find peaceful, lasting solutions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-start bg-gray-50 rounded-xl p-6 h-full shadow-sm">
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 