import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Users, Heart, Globe } from 'lucide-react';
import { tickerStats } from '@/data/mockData';

const formatNumber = (num: number) => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
  return num.toString();
};

const tickerItems = [
  { icon: TrendingUp, label: 'Total Verified Impact', value: formatNumber(tickerStats.totalVerifiedImpact), color: 'text-emerald-500' },
  { icon: Globe, label: 'Projects Funded', value: tickerStats.projectsFunded.toString(), color: 'text-blue-500' },
  { icon: Leaf, label: 'Carbon Offset', value: `${(tickerStats.carbonOffset / 1000).toFixed(0)}k Tons`, color: 'text-green-500' },
  { icon: Users, label: 'Lives Impacted', value: formatNumber(tickerStats.livesImpacted), color: 'text-amber-500' },
  { icon: Heart, label: 'Active Volunteers', value: formatNumber(tickerStats.volunteersActive), color: 'text-rose-500' },
];

export const TransparencyTicker = () => {
  return (
    <div className="w-full bg-slate-900 py-4 overflow-hidden">
      <div className="flex ticker-scroll">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 mx-8 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="text-slate-400 text-sm">{item.label}:</span>
            <span className="text-white font-bold text-lg">{item.value}</span>
            <span className="text-slate-600 mx-4">•</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
