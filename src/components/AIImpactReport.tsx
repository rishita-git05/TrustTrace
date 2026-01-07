import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, TrendingUp, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { quarterlyImpactData } from '@/data/mockData';
import { Progress } from './ui/progress';

interface Project {
  id: string;
  name: string;
  fundAllocated: number;
  fundUtilized: number;
}

interface AIImpactReportProps {
  ngoName: string;
  fundUtilization: {
    programs: number;
    admin: number;
    fundraising: number;
  };
  impactScore?: number;
  projects?: Project[];
}

const reportText = `This quarter, the organization demonstrated exceptional execution across all program areas. Key highlights include:

**Environmental Impact**: Successfully planted 12,500 trees across 15 districts, exceeding targets by 25%. Carbon sequestration efforts now offset an estimated 850 tons of CO₂ annually.

**Community Reach**: Engaged 45 villages in sustainable agriculture training, with 89% of participants reporting improved crop yields within 3 months.

**Financial Efficiency**: Maintained an impressive 92% program-to-overhead ratio, with 94 paise of every donated rupee directly funding field operations.

**Verification Status**: All activities have been independently verified through geotagged documentation and third-party audits.

*Report generated using verified on-ground data and blockchain-secured transaction records.*`;

const CHART_COLORS = {
  programs: '#14b8a6', // Teal for Programs
  admin: '#f59e0b',    // Amber for Admin
  fundraising: '#f43f5e', // Rose for Fundraising
};

const PROJECT_COLORS = ['#14b8a6', '#10b981', '#059669', '#047857', '#065f46'];

export const AIImpactReport = ({ ngoName, fundUtilization, impactScore = 92, projects = [] }: AIImpactReportProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < reportText.length) {
        setDisplayedText(reportText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const formatText = (text: string) => {
    return text
      .split('\n\n')
      .map((paragraph, i) => {
        // Handle bold text
        const formatted = paragraph.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="text-foreground">$1</strong>'
        );
        // Handle italic text
        const withItalics = formatted.replace(
          /\*(.*?)\*/g,
          '<em class="text-muted-foreground">$1</em>'
        );
        return (
          <p
            key={i}
            className="mb-3 last:mb-0"
            dangerouslySetInnerHTML={{ __html: withItalics }}
          />
        );
      });
  };

  const pieData = [
    { name: 'Programs', value: fundUtilization.programs, color: CHART_COLORS.programs },
    { name: 'Admin', value: fundUtilization.admin, color: CHART_COLORS.admin },
    { name: 'Fundraising', value: fundUtilization.fundraising, color: CHART_COLORS.fundraising },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getScoreExplanation = (score: number) => {
    if (score >= 90) return 'Excellent transparency and impact metrics. This NGO consistently exceeds industry benchmarks.';
    if (score >= 75) return 'Good performance with room for improvement in certain areas.';
    return 'Needs attention. Some metrics are below expected standards.';
  };

  return (
    <div className="space-y-6">
      {/* AI Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bento-card bg-gradient-to-br from-slate-50 to-emerald-50/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl trust-gradient flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground flex items-center gap-2">
              AI Impact Summary
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-xs text-muted-foreground">
              Quarterly report for {ngoName}
            </p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
          {formatText(displayedText)}
          {isTyping && (
            <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 typing-effect" />
          )}
        </div>
      </motion.div>

      {/* Impact Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bento-card"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">Impact Score</h3>
            <p className="text-xs text-muted-foreground">Overall performance rating</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className={`text-6xl font-display font-bold ${getScoreColor(impactScore)}`}
            >
              {impactScore}
            </motion.div>
            <p className="text-sm text-muted-foreground">out of 100</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{getScoreExplanation(impactScore)}</p>
          </div>
        </div>
      </motion.div>

      {/* Project-wise Fund Utilization */}
      {projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bento-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground">Project-wise Fund Utilization</h3>
              <p className="text-xs text-muted-foreground">Detailed breakdown by project</p>
            </div>
          </div>

          <div className="space-y-4">
            {projects.map((project, index) => {
              const utilizationPercent = Math.round((project.fundUtilized / project.fundAllocated) * 100);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{project.name}</span>
                    <span className="text-xs font-bold text-primary">{utilizationPercent}% utilized</span>
                  </div>
                  <Progress value={utilizationPercent} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Allocated: ₹{(project.fundAllocated / 100000).toFixed(1)}L</span>
                    <span>Utilized: ₹{(project.fundUtilized / 100000).toFixed(1)}L</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Allocated:</span>
              <span className="font-bold text-foreground">
                ₹{(projects.reduce((sum, p) => sum + p.fundAllocated, 0) / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-muted-foreground">Total Utilized:</span>
              <span className="font-bold text-primary">
                ₹{(projects.reduce((sum, p) => sum + p.fundUtilized, 0) / 100000).toFixed(1)}L
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Fund Utilization Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bento-card"
        >
          <h3 className="font-display font-bold text-foreground mb-4">Overall Fund Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quarterly Trend Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bento-card"
        >
          <h3 className="font-display font-bold text-foreground mb-4">Quarterly Impact Trend (2025-2026)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyImpactData}>
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'impact' ? `${value}%` : `₹${(value / 10000000).toFixed(1)}Cr`,
                    name === 'impact' ? 'Impact Score' : 'Donations'
                  ]}
                />
                <Legend />
                <Bar dataKey="impact" name="Impact Score" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};