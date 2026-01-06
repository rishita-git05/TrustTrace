import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Check, Gift, Download, User, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import confetti from 'canvas-confetti';

interface DonationSectionProps {
  ngoName: string;
  ngoVerificationId: string;
  projects: { id: string; name: string }[];
  onDonate: (amount: number) => void;
}

const impactLevels = [
  { amount: 500, impact: '2 School Kits' },
  { amount: 1000, impact: '5 Solar Lamps' },
  { amount: 2500, impact: '10 Water Filters' },
  { amount: 5000, impact: '25 Meal Packs' },
  { amount: 10000, impact: '50 Tree Saplings' },
];

const generateSerialNumber = () => {
  const prefix = 'TT';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const DonationSection = ({ ngoName, ngoVerificationId, projects, onDonate }: DonationSectionProps) => {
  const [amount, setAmount] = useState(1000);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedProject, setSelectedProject] = useState('general');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<{ serialNumber: string; amount: number; date: string } | null>(null);
  const { updateDonation } = useAuth();

  const getImpactText = (value: number) => {
    const level = impactLevels.reduce((prev, curr) =>
      Math.abs(curr.amount - value) < Math.abs(prev.amount - value) ? curr : prev
    );
    const multiplier = value / level.amount;
    const impactNum = parseInt(level.impact.split(' ')[0]) * multiplier;
    return `${Math.round(impactNum)} ${level.impact.split(' ').slice(1).join(' ')}`;
  };

  const handleDonate = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b'],
    });

    const receipt = {
      serialNumber: generateSerialNumber(),
      amount: amount,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setReceiptData(receipt);
    setIsProcessing(false);
    setShowSuccess(true);
    updateDonation(amount);
    onDonate(amount);
  };

  const handleDownloadReceipt = () => {
    setShowReceipt(true);
  };

  return (
    <div className="bento-card relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full trust-gradient mx-auto flex items-center justify-center mb-4"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Thank You! 🎉
            </h3>
            <p className="text-muted-foreground mb-4">
              Your donation of <span className="font-bold text-primary">₹{amount.toLocaleString('en-IN')}</span> to {ngoName} is making a difference!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm mb-4">
              <Gift className="w-4 h-4" />
              <span>Impact: {getImpactText(amount)}</span>
            </div>
            {isAnonymous && (
              <p className="text-xs text-muted-foreground mb-4 flex items-center justify-center gap-1">
                <User className="w-3 h-3" />
                Donated anonymously
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadReceipt}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="font-display text-lg font-bold text-foreground">
                Make an Impact
              </h3>
            </div>

            {/* Project Selection */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Select Donation Type
              </label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Donation</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      Project: {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Display */}
            <div className="text-center mb-6">
              <motion.div
                key={amount}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-display font-bold text-gradient-trust mb-2"
              >
                ₹{amount.toLocaleString('en-IN')}
              </motion.div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm">≈ {getImpactText(amount)}</span>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-6 px-2">
              <Slider
                value={[amount]}
                onValueChange={([val]) => setAmount(val)}
                min={100}
                max={25000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>₹100</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[500, 1000, 2500, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`py-2 rounded-lg text-xs font-medium transition-all ${
                    amount === preset
                      ? 'trust-gradient text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  ₹{preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <label
                htmlFor="anonymous"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Donate Anonymously
              </label>
            </div>

            {/* Donate Button */}
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleDonate}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  Donate Now (Demo)
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-3">
              This is a demo. No actual payment will be processed.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Receipt Modal */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Donation Receipt
            </DialogTitle>
          </DialogHeader>
          {receiptData && (
            <div className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-xl p-6 border-2 border-dashed border-emerald-200">
              <div className="text-center border-b border-dashed border-emerald-300 pb-4 mb-4">
                <div className="w-12 h-12 rounded-full trust-gradient mx-auto flex items-center justify-center mb-2">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">TrustTrace</h3>
                <p className="text-xs text-muted-foreground">Official Donation Receipt</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serial Number:</span>
                  <span className="font-mono font-bold text-primary">{receiptData.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{receiptData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-medium">{ngoName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project:</span>
                  <span className="font-medium">
                    {selectedProject === 'general' 
                      ? 'General Fund' 
                      : projects.find(p => p.id === selectedProject)?.name || 'General Fund'}
                  </span>
                </div>
                <div className="border-t border-dashed border-emerald-300 my-3" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Amount:</span>
                  <span className="font-bold text-primary">₹{receiptData.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-emerald-300 text-center">
                <p className="text-xs text-muted-foreground mb-1">Tax Exemption Details</p>
                <p className="text-xs font-mono text-foreground">{ngoVerificationId}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Eligible for 80G tax deduction under Income Tax Act, 1961
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
