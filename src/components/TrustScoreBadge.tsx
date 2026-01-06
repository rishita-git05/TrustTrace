import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

interface TrustScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const TrustScoreBadge = ({ score, size = 'md', showLabel = true }: TrustScoreBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 95) return 'from-emerald-400 to-emerald-600';
    if (score >= 85) return 'from-green-400 to-green-600';
    if (score >= 70) return 'from-amber-400 to-amber-600';
    return 'from-orange-400 to-orange-600';
  };

  const sizes = {
    sm: { badge: 'w-12 h-12', text: 'text-sm', icon: 12 },
    md: { badge: 'w-16 h-16', text: 'text-lg', icon: 16 },
    lg: { badge: 'w-20 h-20', text: 'text-2xl', icon: 20 },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <div
        className={`${sizes[size].badge} rounded-full bg-gradient-to-br ${getScoreColor(score)} flex items-center justify-center shadow-lg relative`}
      >
        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
          <span className={`font-bold ${sizes[size].text} text-slate-800`}>{score}</span>
        </div>
        {score >= 95 && (
          <motion.div
            className="absolute -top-1 -right-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 fill-white" />
          </motion.div>
        )}
      </div>
      {showLabel && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Trust Score</span>
        </div>
      )}
    </motion.div>
  );
};
