import { motion } from 'framer-motion';
import { Shield, CheckCircle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface TrustScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const trustScoreExplanation = `Trust Score is calculated based on:
• Financial Transparency (30%) - Audited reports & fund utilization
• Program Efficiency (25%) - % spent on actual programs
• Verification Status (20%) - 80G/CSR registration
• Impact Metrics (15%) - Verified on-ground outcomes
• Donor Feedback (10%) - User ratings & reviews`;

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-help">
                <Shield className="w-3 h-3" />
                <span>Trust Score</span>
                <Info className="w-3 h-3 text-muted-foreground/70" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs bg-background border border-border shadow-lg z-50">
              <p className="text-xs whitespace-pre-line text-foreground">{trustScoreExplanation}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </motion.div>
  );
};
