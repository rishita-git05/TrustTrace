import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { transactions as initialTransactions, Transaction } from '@/data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const typeColors: Record<string, string> = {
  Program: 'bg-emerald-100 text-emerald-700',
  Admin: 'bg-blue-100 text-blue-700',
  Operations: 'bg-amber-100 text-amber-700',
};

interface ReceiptModalProps {
  transaction: Transaction;
}

const ReceiptModal = ({ transaction }: ReceiptModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <FileText className="w-3 h-3" />
          View Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Transaction Receipt</DialogTitle>
        </DialogHeader>
        <div className="bg-slate-50 rounded-xl p-6 font-mono text-sm">
          <div className="text-center border-b border-dashed border-slate-300 pb-4 mb-4">
            <h3 className="font-bold text-lg">TrustTrace</h3>
            <p className="text-xs text-muted-foreground">Verified Transaction Receipt</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Receipt ID:</span>
              <span className="font-bold">{transaction.receiptId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{transaction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <Badge className={typeColors[transaction.type]}>
                {transaction.type}
              </Badge>
            </div>
            <div className="border-t border-dashed border-slate-300 my-3" />
            <div>
              <span className="text-muted-foreground">Description:</span>
              <p className="font-medium mt-1">{transaction.item}</p>
            </div>
            <div className="border-t border-dashed border-slate-300 my-3" />
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-primary">₹{transaction.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-dashed border-slate-300 text-center text-xs text-muted-foreground">
            <p>Verified on blockchain</p>
            <p className="mt-1 flex items-center justify-center gap-1">
              <ExternalLink className="w-3 h-3" />
              View on Explorer
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface DonationInfo {
  amount: number;
  project: string;
  isAnonymous: boolean;
}

interface LiveLedgerProps {
  newDonation?: DonationInfo | null;
}

export const LiveLedger = ({ newDonation }: LiveLedgerProps) => {
  const [ledgerTransactions, setLedgerTransactions] = useState<Transaction[]>(initialTransactions);
  const [processedDonation, setProcessedDonation] = useState<DonationInfo | null>(null);

  // Add new donation to ledger when it changes
  if (newDonation && newDonation !== processedDonation) {
    const newTransaction: Transaction = {
      id: `tx-new-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      item: newDonation.project === 'General Fund' 
        ? `${newDonation.isAnonymous ? 'Anonymous' : 'User'} Donation - General Fund`
        : `${newDonation.isAnonymous ? 'Anonymous' : 'User'} Donation - ${newDonation.project}`,
      amount: newDonation.amount,
      type: 'Program',
      receiptId: `RCP-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
      ngoId: 'ngo-1',
    };
    setLedgerTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    setProcessedDonation(newDonation);
  }

  return (
    <div className="bento-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Live Ledger
        </h3>
        <span className="text-xs text-muted-foreground">
          {ledgerTransactions.length} transactions
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Item</th>
              <th className="text-right text-xs font-medium text-muted-foreground py-3 pr-4">Amount</th>
              <th className="text-center text-xs font-medium text-muted-foreground py-3 pr-4">Type</th>
              <th className="text-right text-xs font-medium text-muted-foreground py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {ledgerTransactions.slice(0, 10).map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, x: -20, backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                  animate={{ opacity: 1, x: 0, backgroundColor: 'transparent' }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 pr-4 text-sm text-muted-foreground whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3 pr-4 text-sm font-medium text-foreground max-w-[200px] truncate">
                    {tx.item}
                  </td>
                  <td className="py-3 pr-4 text-sm font-bold text-foreground text-right whitespace-nowrap">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 pr-4 text-center">
                    <Badge className={`${typeColors[tx.type]} text-xs`}>
                      {tx.type}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <ReceiptModal transaction={tx} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
