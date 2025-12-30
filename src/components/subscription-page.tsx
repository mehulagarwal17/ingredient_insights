'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, Shield, Headphones, Star } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen main-content-bg pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
            Simple Pricing
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'hsl(25, 20%, 35%)' }}>
            Choose the perfect plan for your health journey. Start free, scale as you grow, and only pay for what you use.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: 1000 }}
              >
                <Card
                  className={`relative bg-card border ${plan.highlighted
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-border'
                    } rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${plan.highlighted ? 'ring-2 ring-primary/20' : ''
                    } h-full`}
                >
                  {plan.highlighted && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                        MOST POPULAR
                      </div>
                    </motion.div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <motion.div
                      className="flex justify-center mb-4"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${plan.highlighted
                          ? 'bg-primary/10 border-2 border-primary/30'
                          : 'bg-muted border-2 border-border'
                        }`}>
                        <Icon className={`w-8 h-8 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                    </motion.div>
                    <CardTitle className="text-2xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
                      {plan.name}
                    </CardTitle>
                    <motion.div
                      className="mb-2"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                    >
                      <span className="text-4xl font-bold" style={{ color: 'hsl(25, 30%, 15%)' }}>{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                    </motion.div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.4 + featureIndex * 0.05 }}
                        >
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {plan.id === 'enterprise' ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleContactSales}
                          className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md"
                        >
                          Contact Sales
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => handleSubscribe(plan.id)}
                          className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${plan.highlighted
                              ? 'bg-primary hover:bg-primary/90 text-white shadow-md'
                              : 'bg-muted hover:bg-muted/80 text-foreground border border-border'
                            }`}
                        >
                          Get Started
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
            Compare Features Across Plans
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: 'hsl(25, 30%, 15%)' }}>Features</h3>
                {['Ingredient Analysis', 'Nutrition Insights', 'Mobile App', 'API Access', 'Priority Support', 'Custom Integrations'].map((feature, index) => (
                  <div key={index} className="text-foreground">{feature}</div>
                ))}
              </div>
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="text-center space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: 'hsl(25, 30%, 15%)' }}>{plan.name}</h3>
                  {[
                    plan.id !== 'enterprise' ? '✓' : '✓',
                    plan.id !== 'enterprise' ? '✓' : '✓',
                    '✓',
                    plan.id === 'enterprise' || plan.id === 'pro' ? '✓' : '✗',
                    plan.id === 'enterprise' ? '✓' : plan.id === 'pro' ? '✓' : '✗',
                    plan.id === 'enterprise' ? '✓' : '✗'
                  ].map((item, index) => (
                    <div key={index} className={item === '✓' ? 'text-accent font-bold' : 'text-muted-foreground'}>
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
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'hsl(25, 30%, 15%)' }}>Can I change my plan later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </Card>
            <Card className="bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'hsl(25, 30%, 15%)' }}>Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes! All plans come with a 14-day free trial. No credit card required.</p>
            </Card>
            <Card className="bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'hsl(25, 30%, 15%)' }}>What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </Card>
            <Card className="bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'hsl(25, 30%, 15%)' }}>Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Absolutely. You can cancel your subscription at any time with no cancellation fees.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
