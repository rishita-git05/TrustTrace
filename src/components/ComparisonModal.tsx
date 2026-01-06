import { motion } from 'framer-motion';
import { Scale, X, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ngos } from '@/data/mockData';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { TrustScoreBadge } from './TrustScoreBadge';

export const ComparisonModal = () => {
  const { bookmarkedNGOs, clearBookmarks } = useBookmarks();
  
  const bookmarkedNGOData = ngos.filter((ngo) => bookmarkedNGOs.includes(ngo.id));

  if (bookmarkedNGOs.length < 2) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Scale className="w-4 h-4" />
        Compare ({bookmarkedNGOs.length}/2+)
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Scale className="w-4 h-4" />
          Compare ({bookmarkedNGOs.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            NGO Comparison
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(bookmarkedNGOData.length, 3)}, 1fr)` }}>
            {bookmarkedNGOData.map((ngo, index) => (
              <motion.div
                key={ngo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bento-card"
              >
                {/* Header */}
                <div className="text-center mb-4">
                  <img
                    src={ngo.image}
                    alt={ngo.name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  />
                  <h3 className="font-display font-bold text-foreground text-sm">
                    {ngo.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{ngo.category}</p>
                </div>

                {/* Trust Score */}
                <div className="flex justify-center mb-4">
                  <TrustScoreBadge score={ngo.trustScore} size="sm" />
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Program Spend</span>
                    <span className="font-bold text-emerald-600">{ngo.fundUtilization.programs}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Admin Spend</span>
                    <span className="font-bold text-amber-600">{ngo.fundUtilization.admin}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fundraising</span>
                    <span className="font-bold text-rose-600">{ngo.fundUtilization.fundraising}%</span>
                  </div>
                  <div className="border-t border-border my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Raised</span>
                    <span className="font-bold">₹{(ngo.totalRaised / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Donors</span>
                    <span className="font-bold">{ngo.totalDonors.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Projects</span>
                    <span className="font-bold">{ngo.projectsFunded}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline" size="sm" onClick={clearBookmarks} className="gap-2">
              <X className="w-4 h-4" />
              Clear All Bookmarks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
