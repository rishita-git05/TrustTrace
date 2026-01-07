import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CheckCircle, Users, TreePine, Banknote, Calendar, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { TrustScoreBadge } from '@/components/TrustScoreBadge';
import { LiveLedger } from '@/components/LiveLedger';
import { DonationSection } from '@/components/DonationSection';
import { ImpactTimeline } from '@/components/ImpactTimeline';
import { AIImpactReport } from '@/components/AIImpactReport';
import { ProofGallery } from '@/components/ProofGallery';
import { GrievanceForm } from '@/components/GrievanceForm';
import { ngos } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBookmarks } from '@/contexts/BookmarkContext';

interface DonationInfo {
  amount: number;
  project: string;
  isAnonymous: boolean;
}

const NGODetail = () => {
  const { id } = useParams<{ id: string }>();
  const ngo = ngos.find((n) => n.id === id);
  const [totalRaised, setTotalRaised] = useState(ngo?.totalRaised || 0);
  const [totalDonors, setTotalDonors] = useState(ngo?.totalDonors || 0);
  const [hasDonated, setHasDonated] = useState(false);
  const [lastDonation, setLastDonation] = useState<DonationInfo | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!ngo) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">NGO Not Found</h1>
          <Link to="/catalog">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDonate = (amount: number, project: string, isAnonymous: boolean) => {
    setTotalRaised((prev) => prev + amount);
    setTotalDonors((prev) => prev + 1);
    setHasDonated(true);
    setLastDonation({ amount, project, isAnonymous });
  };

  const bookmarked = isBookmarked(ngo.id);

  const fullAddress = `${ngo.address.street}, ${ngo.address.city}, ${ngo.address.region}, ${ngo.address.country}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={ngo.image}
          alt={ngo.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/catalog"
          className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Catalog</span>
        </Link>

        {/* Bookmark Button */}
        <button
          onClick={() => toggleBookmark(ngo.id)}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          {bookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-amber-400" />
          ) : (
            <Bookmark className="w-5 h-5 text-white" />
          )}
        </button>

        {/* NGO Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-emerald-500 text-white border-0">
                    {ngo.category}
                  </Badge>
                  {ngo.verified && (
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  {ngo.name}
                </h1>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span>{ngo.location}</span>
                </div>
              </div>
              <TrustScoreBadge score={ngo.trustScore} size="lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bento-card"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground flex-1">{ngo.description}</p>
                <GrievanceForm ngoName={ngo.name} />
              </div>
              
              {/* NGO Metadata */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Verification ID (80G/CSR)</p>
                  <p className="font-mono text-sm font-medium text-foreground">{ngo.verificationId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Established</p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(ngo.establishedDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Address</p>
                  <p className="text-sm text-foreground mb-2">{fullAddress}</p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <MapPin className="w-3 h-3" />
                      View on Map
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <Banknote className="w-6 h-6 text-primary mx-auto mb-2" />
                  <motion.p
                    key={totalRaised}
                    initial={{ scale: 1.2, color: 'hsl(var(--primary))' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    className="font-display text-xl font-bold text-foreground"
                  >
                    ₹{(totalRaised / 100000).toFixed(1)}L
                  </motion.p>
                  <p className="text-xs text-muted-foreground">Total Raised</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <Users className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <motion.p
                    key={totalDonors}
                    initial={{ scale: 1.2, color: 'hsl(var(--amber-500))' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    className="font-display text-xl font-bold text-foreground"
                  >
                    {totalDonors.toLocaleString('en-IN')}
                  </motion.p>
                  <p className="text-xs text-muted-foreground">Total Donors</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <TreePine className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <p className="font-display text-xl font-bold text-foreground">
                    {ngo.projectsFunded}
                  </p>
                  <p className="text-xs text-muted-foreground">Projects Funded</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="font-display text-xl font-bold text-foreground">
                    {ngo.impactMetrics[0]?.value || 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ngo.impactMetrics[0]?.label || 'Impact'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Conditional Timeline - Only shown after donation */}
            {hasDonated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bento-card bg-gradient-to-br from-amber-50 to-emerald-50"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm font-medium text-amber-700">Live Status Tracker</span>
                </div>
                <ImpactTimeline />
              </motion.div>
            )}

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Tabs defaultValue="ledger" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-12 rounded-xl bg-muted p-1">
                  <TabsTrigger value="ledger" className="rounded-lg">Ledger</TabsTrigger>
                  <TabsTrigger value="report" className="rounded-lg">AI Report</TabsTrigger>
                  <TabsTrigger value="proof" className="rounded-lg">Proof</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="ledger">
                    <LiveLedger newDonation={lastDonation} />
                  </TabsContent>

                  <TabsContent value="report">
                    <AIImpactReport 
                      ngoName={ngo.name} 
                      fundUtilization={ngo.fundUtilization}
                      impactScore={ngo.trustScore - 5 + Math.floor(Math.random() * 10)}
                      projects={ngo.projects}
                    />
                  </TabsContent>

                  <TabsContent value="proof">
                    <ProofGallery />
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          </div>

          {/* Right Column - Donation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <DonationSection 
                ngoName={ngo.name} 
                ngoVerificationId={ngo.verificationId}
                projects={ngo.projects}
                onDonate={handleDonate} 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODetail;
