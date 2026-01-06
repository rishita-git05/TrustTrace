import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Send, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { grievanceCategories } from '@/data/mockData';

interface GrievanceFormProps {
  ngoName: string;
}

export const GrievanceForm = ({ ngoName }: GrievanceFormProps) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    // Mock submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setCategory('');
      setDescription('');
      setIsOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-rose-600 border-rose-200 hover:bg-rose-50">
          <AlertTriangle className="w-4 h-4" />
          Report Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Report an Issue
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">Report Submitted</h3>
            <p className="text-sm text-muted-foreground">
              We will review your concern and take appropriate action.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Report a concern about <span className="font-medium text-foreground">{ngoName}</span>. 
              All reports are reviewed by our verification team.
            </p>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Category of Issue
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {grievanceCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your concern in detail..."
                rows={4}
              />
            </div>

            <Button
              variant="hero"
              className="w-full"
              onClick={handleSubmit}
              disabled={!category || !description}
            >
              <Send className="w-4 h-4" />
              Submit Report
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
