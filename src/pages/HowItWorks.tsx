import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wallet, Package, Truck, CheckCircle, ArrowRight, Shield, Eye, Globe, FileText } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: 1,
    icon: Eye,
    title: 'Discover Verified NGOs',
    description: 'Browse our catalog of 100% verified organizations. Each NGO undergoes rigorous vetting including financial audits, impact verification, and governance checks.',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    number: 2,
    icon: Wallet,
    title: 'Make Your Donation',
    description: 'Choose an amount and see your potential impact in real-time. Our impact slider shows exactly what your donation will fund.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    number: 3,
    icon: Package,
    title: 'Funds Are Allocated',
    description: 'Watch as your funds are allocated to specific projects. Every transaction is logged on our transparent ledger with receipt-level detail.',
    color: 'from-amber-400 to-amber-600',
  },
  {
    number: 4,
    icon: Truck,
    title: 'Impact In Action',
    description: 'Follow your donation through the execution phase. Our Pizza Tracker-style timeline shows real-time progress updates.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    number: 5,
    icon: CheckCircle,
    title: 'Verified Proof of Impact',
    description: 'Receive geotagged photos, beneficiary testimonials, and AI-generated impact reports proving your donation made a difference.',
    color: 'from-rose-400 to-rose-600',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Blockchain-Secured',
    description: 'Every transaction is immutably recorded for complete audit trails.',
  },
  {
    icon: Eye,
    title: 'Live Ledger',
    description: 'See every expense in real-time with downloadable receipts.',
  },
  {
    icon: Globe,
    title: 'GPS Verification',
    description: 'Geotagged proof-of-work from field teams worldwide.',
  },
  {
    icon: FileText,
    title: 'AI Reports',
    description: 'Quarterly AI-generated summaries of organizational impact.',
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/3 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              How <span className="text-gradient-trust">TrustTrace</span> Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From donation to verified impact in 5 transparent steps. 
              No black boxes. No guesswork. Just radical transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-12 last:mb-0"
              >
                {/* Step Number & Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bento-card">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Trust
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature designed to maximize transparency and donor confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bento-card text-center"
              >
                <div className="w-14 h-14 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bento-card trust-gradient text-center py-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Give with Confidence?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Join the transparency revolution. Your donations, verified.
            </p>
            <Link to="/catalog">
              <Button variant="glass" size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                Explore NGOs Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
