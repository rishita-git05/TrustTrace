import { motion } from 'framer-motion';
import { Navigate, Link } from 'react-router-dom';
import { TrendingUp, Heart, Star, Calendar, ArrowRight, Settings, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { userDonations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground">
                Track your impact and manage your giving journey.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 w-fit">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bento-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                Level 3 Donor
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Your Impact Score</p>
            <p className="font-display text-4xl font-bold text-foreground mb-3">
              {user?.impactScore || 87}
            </p>
            <Progress value={user?.impactScore || 87} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              13 points to Level 4 Hero
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bento-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl warm-gradient flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Donated</p>
            <p className="font-display text-4xl font-bold text-foreground">
              ₹{(user?.totalDonated || totalDonated).toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Across {userDonations.length} organizations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bento-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Impact This Month</p>
            <p className="font-display text-4xl font-bold text-foreground">
              +23%
            </p>
            <p className="text-xs text-emerald-600 mt-2">
              ↑ Higher than last month
            </p>
          </motion.div>
        </div>

        {/* Donation History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bento-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Donation History
            </h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3">Organization</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground py-3">Impact</th>
                </tr>
              </thead>
              <tbody>
                {userDonations.map((donation, index) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 text-sm text-muted-foreground">
                      {donation.date}
                    </td>
                    <td className="py-4">
                      <p className="text-sm font-medium text-foreground">
                        {donation.ngoName}
                      </p>
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-bold text-foreground">
                        ₹{donation.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        {donation.impactDescription}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Verification Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bento-card bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full trust-gradient flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-foreground">
                Verified Donor Status
              </h3>
              <p className="text-sm text-muted-foreground">
                Your account is verified with Government ID: {user?.governmentId}
              </p>
            </div>
            <Link to="/catalog">
              <Button variant="default" size="sm">
                Continue Giving
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
