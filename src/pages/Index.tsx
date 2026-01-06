import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Sparkles, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransparencyTicker } from '@/components/TransparencyTicker';
import { Navbar } from '@/components/Navbar';

const features = [
  {
    icon: Eye,
    title: 'Full Transparency',
    description: 'Track every rupee from donation to impact with blockchain-verified records.',
  },
  {
    icon: Shield,
    title: '100% Verified NGOs',
    description: 'All organizations undergo rigorous verification before joining our platform.',
  },
  {
    icon: Globe,
    title: 'Pan-India Impact',
    description: 'Support causes across 28 states with local teams on the ground.',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Updates',
    description: 'See your impact unfold with geotagged proof and milestone tracking.',
  },
];

const stats = [
  { value: '₹124Cr+', label: 'Funds Distributed' },
  { value: '450+', label: 'Projects Funded' },
  { value: '8.9L', label: 'Lives Impacted' },
  { value: '99.2%', label: 'Trust Rating' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                <span>Trusted by 10,000+ donors across India</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Donations you can{' '}
              <span className="text-gradient-trust">track</span>,{' '}
              <br className="hidden md:block" />
              impact you can{' '}
              <span className="text-gradient-warm">see</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              The radical transparency platform that lets you follow every rupee 
              from your wallet to real-world change. No black boxes. No guesswork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="heroOutline" size="xl">
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose TrustTrace?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're building the future of charitable giving with complete transparency at every step.
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
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bento-card trust-gradient text-center py-16 px-8"
          >
            <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Join thousands of donors who track their impact in real-time.
            </p>
            <Link to="/catalog">
              <Button variant="glass" size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                Explore Verified NGOs
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Transparency Ticker */}
      <TransparencyTicker />

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold">TrustTrace</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2025 TrustTrace. Transparency in every transaction.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
