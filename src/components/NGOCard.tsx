import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NGO } from '@/data/mockData';
import { TrustScoreBadge } from './TrustScoreBadge';
import { Badge } from './ui/badge';

interface NGOCardProps {
  ngo: NGO;
  index: number;
}

const categoryColors: Record<string, string> = {
  Environment: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Education: 'bg-blue-100 text-blue-700 border-blue-200',
  Healthcare: 'bg-rose-100 text-rose-700 border-rose-200',
  Humanitarian: 'bg-amber-100 text-amber-700 border-amber-200',
  Wildlife: 'bg-purple-100 text-purple-700 border-purple-200',
};

export const NGOCard = ({ ngo, index }: NGOCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/ngo/${ngo.id}`}>
        <div className="bento-card overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
            <img
              src={ngo.image}
              alt={ngo.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <Badge className={`absolute top-3 left-3 ${categoryColors[ngo.category]} border`}>
              {ngo.category}
            </Badge>

            {/* Verified Badge */}
            {ngo.verified && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
            )}
          </div>

          {/* Trust Score - Positioned outside image area */}
          <div className="flex justify-end -mt-8 mb-2 mr-1 relative z-10">
            <TrustScoreBadge score={ngo.trustScore} size="sm" showLabel={false} />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {ngo.name}
            </h3>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{ngo.location}</span>
            </div>

            {/* Donor Count */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>{ngo.totalDonors.toLocaleString('en-IN')} donors</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {ngo.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Total Raised</p>
                <p className="font-bold text-foreground">
                  ₹{(ngo.totalRaised / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
