import { motion } from 'framer-motion';
import { Wallet, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { timelineEvents } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  Package,
  Truck,
  CheckCircle,
};

export const ImpactTimeline = () => {
  return (
    <div className="py-8">
      <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Impact Timeline
      </h3>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {timelineEvents.map((event, index) => {
            const Icon = iconMap[event.icon] || CheckCircle;
            const isCompleted = event.status === 'completed';
            const isActive = event.status === 'active';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative flex gap-4"
              >
                {/* Icon Circle */}
                <motion.div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? 'trust-gradient'
                      : isActive
                      ? 'bg-amber-500 pulse-glow'
                      : 'bg-muted'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.1, type: 'spring' }}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isCompleted || isActive ? 'text-white' : 'text-muted-foreground'
                    }`}
                  />
                </motion.div>

                {/* Content */}
                <div
                  className={`flex-1 bento-card ${
                    isActive ? 'border-amber-300 bg-amber-50/50' : ''
                  } ${!isCompleted && !isActive ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Phase {event.phase}
                      </span>
                      <h4 className="font-display font-bold text-foreground">
                        {event.title}
                      </h4>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : isActive
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? 'Complete' : isActive ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {event.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.date}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
