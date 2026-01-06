import { motion } from 'framer-motion';
import { MapPin, Clock, Camera } from 'lucide-react';
import { proofItems, beneficiaryQuotes } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const ProofGallery = () => {
  return (
    <div className="space-y-8">
      {/* Proof Wall */}
      <div>
        <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Proof Wall
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proofItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay with metadata */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm mb-2">
                    {item.caption}
                  </p>
                  <div className="flex items-center gap-3 text-white/80 text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.gpsCoordinates}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </div>
                </div>
              </div>

              {/* GPS Badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{item.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Beneficiary Voices */}
      <div>
        <h3 className="font-display text-xl font-bold text-foreground mb-4">
          Beneficiary Voices
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {beneficiaryQuotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bento-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={quote.avatar} alt={quote.name} />
                  <AvatarFallback>{quote.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {quote.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {quote.location}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "{quote.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
