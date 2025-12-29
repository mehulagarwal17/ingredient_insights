'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, Shield, Headphones, Star } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$9',
    description: 'Perfect for individuals getting started',
    icon: Star,
    features: [
      '50 ingredient analyses per month',
      'Basic nutrition insights',
      'Email support',
      'Mobile app access',
      'Ad-free experience'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    description: 'Best for health-conscious individuals',
    icon: Zap,
    highlighted: true,
    features: [
      'Unlimited ingredient analyses',
      'Advanced nutrition insights',
      'Priority email support',
      'Custom dietary preferences',
      'Detailed health reports',
      'API access',
      'Export data to CSV/JSON'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and large organizations',
    icon: Shield,
    features: [
      'Everything in Pro',
      'White-label solutions',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics dashboard',
      'SLA guarantee',
      '24/7 phone support',
      'On-premise deployment option'
    ]
  }
];

export function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  const handleSubscribe = (planId: string) => {
    // TODO: Implement subscription logic
    console.log(`Subscribing to ${planId} plan`);
  };

  const handleContactSales = () => {
    // TODO: Implement contact sales logic
    console.log('Contact sales for enterprise plan');
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              Simple Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your health journey. Start free, scale as you grow, and only pay for what you use.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`relative bg-black/40 backdrop-blur-md border ${
                  plan.highlighted 
                    ? 'border-cyan-400/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]' 
                    : 'border-white/10'
                } rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                  plan.highlighted ? 'ring-2 ring-cyan-400/20' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      plan.highlighted 
                        ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30' 
                        : 'bg-white/10 border border-white/20'
                    }`}>
                      <Icon className={`w-8 h-8 ${plan.highlighted ? 'text-cyan-400' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.id === 'enterprise' ? (
                    <Button 
                      onClick={handleContactSales}
                      className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      Contact Sales
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleSubscribe(plan.id)}
                      className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      }`}
                    >
                      Get Started
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Compare Features Across Plans
          </h2>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Features</h3>
                {['Ingredient Analysis', 'Nutrition Insights', 'Mobile App', 'API Access', 'Priority Support', 'Custom Integrations'].map((feature, index) => (
                  <div key={index} className="text-gray-300">{feature}</div>
                ))}
              </div>
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  {[
                    plan.id !== 'enterprise' ? '✓' : '✓',
                    plan.id !== 'enterprise' ? '✓' : '✓',
                    '✓',
                    plan.id === 'enterprise' || plan.id === 'pro' ? '✓' : '✗',
                    plan.id === 'enterprise' ? '✓' : plan.id === 'pro' ? '✓' : '✗',
                    plan.id === 'enterprise' ? '✓' : '✗'
                  ].map((item, index) => (
                    <div key={index} className={item === '✓' ? 'text-cyan-400' : 'text-gray-500'}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Can I change my plan later?</h3>
              <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Is there a free trial?</h3>
              <p className="text-gray-400">Yes! All plans come with a 14-day free trial. No credit card required.</p>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Can I cancel anytime?</h3>
              <p className="text-gray-400">Absolutely. You can cancel your subscription at any time with no cancellation fees.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
