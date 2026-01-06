export interface NGO {
  id: string;
  name: string;
  category: 'Environment' | 'Education' | 'Healthcare' | 'Humanitarian' | 'Wildlife';
  location: string;
  city: string;
  trustScore: number;
  description: string;
  totalRaised: number;
  projectsFunded: number;
  image: string;
  verified: boolean;
  verificationId: string;
  establishedDate: string;
  totalDonors: number;
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
  };
  projects: {
    id: string;
    name: string;
  }[];
  fundUtilization: {
    programs: number;
    admin: number;
    fundraising: number;
  };
  impactMetrics: {
    label: string;
    value: string;
  }[];
}

export interface Transaction {
  id: string;
  date: string;
  item: string;
  amount: number;
  type: 'Program' | 'Admin' | 'Operations';
  receiptId: string;
  ngoId: string;
}

export interface TimelineEvent {
  id: string;
  phase: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  date: string;
  icon: string;
}

export interface ProofItem {
  id: string;
  imageUrl: string;
  gpsCoordinates: string;
  timestamp: string;
  caption: string;
  location: string;
}

export interface BeneficiaryQuote {
  id: string;
  name: string;
  avatar: string;
  quote: string;
  location: string;
}

export interface UserDonation {
  id: string;
  ngoName: string;
  amount: number;
  date: string;
  impactDescription: string;
}

// NGO Data
export const ngos: NGO[] = [
  {
    id: 'ngo-1',
    name: 'Green Earth Initiative',
    category: 'Environment',
    location: 'Mumbai, India',
    city: 'Mumbai',
    trustScore: 98,
    description: 'Pioneering sustainable forestry and urban greening projects across India. We plant trees, restore ecosystems, and empower local communities.',
    totalRaised: 24500000,
    projectsFunded: 45,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    verified: true,
    verificationId: '12AAAT1234G1FL1',
    establishedDate: '2015-03-21',
    totalDonors: 12450,
    address: {
      street: '42, Linking Road, Bandra West',
      city: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
    },
    projects: [
      { id: 'proj-1', name: 'Urban Tree Plantation' },
      { id: 'proj-2', name: 'Solar Village Initiative' },
      { id: 'proj-3', name: 'River Cleanup Drive' },
      { id: 'proj-4', name: 'Eco-Education Program' },
    ],
    fundUtilization: {
      programs: 78,
      admin: 12,
      fundraising: 10,
    },
    impactMetrics: [
      { label: 'Trees Planted', value: '125,000' },
      { label: 'CO₂ Offset', value: '3,200 tons' },
      { label: 'Villages Reached', value: '89' },
    ],
  },
  {
    id: 'ngo-2',
    name: 'Bright Futures Foundation',
    category: 'Education',
    location: 'Bangalore, India',
    city: 'Bangalore',
    trustScore: 96,
    description: 'Providing quality education and school supplies to underprivileged children across India. Every child deserves a chance to learn.',
    totalRaised: 18900000,
    projectsFunded: 78,
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800',
    verified: true,
    verificationId: '12AABF5678H1FL2',
    establishedDate: '2012-08-15',
    totalDonors: 8930,
    address: {
      street: '156, MG Road, Indiranagar',
      city: 'Bangalore',
      region: 'Karnataka',
      country: 'India',
    },
    projects: [
      { id: 'proj-5', name: 'Digital Literacy Program' },
      { id: 'proj-6', name: 'Mid-Day Meals Initiative' },
      { id: 'proj-7', name: 'Girl Child Education' },
      { id: 'proj-8', name: 'Skill Development Workshops' },
    ],
    fundUtilization: {
      programs: 82,
      admin: 10,
      fundraising: 8,
    },
    impactMetrics: [
      { label: 'Students Supported', value: '12,500' },
      { label: 'Schools Built', value: '23' },
      { label: 'Teachers Trained', value: '450' },
    ],
  },
  {
    id: 'ngo-3',
    name: 'Clean Water Alliance',
    category: 'Humanitarian',
    location: 'Chennai, India',
    city: 'Chennai',
    trustScore: 97,
    description: 'Installing water purification systems and wells in communities lacking access to clean drinking water across South India.',
    totalRaised: 32000000,
    projectsFunded: 156,
    image: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?w=800',
    verified: true,
    verificationId: '12AACW9012I1FL3',
    establishedDate: '2010-06-05',
    totalDonors: 15670,
    address: {
      street: '78, Anna Salai, T. Nagar',
      city: 'Chennai',
      region: 'Tamil Nadu',
      country: 'India',
    },
    projects: [
      { id: 'proj-9', name: 'Village Well Construction' },
      { id: 'proj-10', name: 'RO Plant Installation' },
      { id: 'proj-11', name: 'Rainwater Harvesting' },
      { id: 'proj-12', name: 'Water Quality Testing' },
    ],
    fundUtilization: {
      programs: 85,
      admin: 8,
      fundraising: 7,
    },
    impactMetrics: [
      { label: 'Wells Installed', value: '340' },
      { label: 'People Served', value: '450,000' },
      { label: 'Communities', value: '120' },
    ],
  },
  {
    id: 'ngo-4',
    name: 'Wildlife Guardians',
    category: 'Wildlife',
    location: 'Jaipur, India',
    city: 'Jaipur',
    trustScore: 95,
    description: 'Protecting endangered species through anti-poaching patrols, habitat restoration, and community education programs across Rajasthan.',
    totalRaised: 15600000,
    projectsFunded: 34,
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800',
    verified: true,
    verificationId: '12AAWG3456J1FL4',
    establishedDate: '2014-01-26',
    totalDonors: 6890,
    address: {
      street: '23, MI Road, Civil Lines',
      city: 'Jaipur',
      region: 'Rajasthan',
      country: 'India',
    },
    projects: [
      { id: 'proj-13', name: 'Tiger Conservation' },
      { id: 'proj-14', name: 'Anti-Poaching Patrols' },
      { id: 'proj-15', name: 'Wildlife Corridor Restoration' },
      { id: 'proj-16', name: 'Community Awareness Camps' },
    ],
    fundUtilization: {
      programs: 76,
      admin: 14,
      fundraising: 10,
    },
    impactMetrics: [
      { label: 'Animals Protected', value: '8,500' },
      { label: 'Rangers Deployed', value: '120' },
      { label: 'Hectares Patrolled', value: '50,000' },
    ],
  },
  {
    id: 'ngo-5',
    name: 'HealthBridge India',
    category: 'Healthcare',
    location: 'Delhi, India',
    city: 'Delhi',
    trustScore: 99,
    description: 'Delivering essential medical care and health education to remote communities across North India and the Himalayan regions.',
    totalRaised: 41000000,
    projectsFunded: 89,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    verified: true,
    verificationId: '12AAHB7890K1FL5',
    establishedDate: '2008-11-14',
    totalDonors: 23450,
    address: {
      street: '89, Connaught Place, Block C',
      city: 'New Delhi',
      region: 'Delhi',
      country: 'India',
    },
    projects: [
      { id: 'proj-17', name: 'Mobile Health Clinics' },
      { id: 'proj-18', name: 'Maternal Care Program' },
      { id: 'proj-19', name: 'Vaccination Drives' },
      { id: 'proj-20', name: 'Mental Health Awareness' },
    ],
    fundUtilization: {
      programs: 88,
      admin: 7,
      fundraising: 5,
    },
    impactMetrics: [
      { label: 'Patients Treated', value: '78,000' },
      { label: 'Medical Camps', value: '320' },
      { label: 'Vaccines Given', value: '125,000' },
    ],
  },
  {
    id: 'ngo-6',
    name: 'Solar Hope Project',
    category: 'Environment',
    location: 'Hyderabad, India',
    city: 'Hyderabad',
    trustScore: 94,
    description: 'Bringing renewable energy to off-grid villages through solar panel installations and energy education across Telangana and Andhra Pradesh.',
    totalRaised: 9800000,
    projectsFunded: 42,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    verified: true,
    verificationId: '12AASH1234L1FL6',
    establishedDate: '2017-04-22',
    totalDonors: 4560,
    address: {
      street: '112, Jubilee Hills, Road No. 36',
      city: 'Hyderabad',
      region: 'Telangana',
      country: 'India',
    },
    projects: [
      { id: 'proj-21', name: 'Solar Home Systems' },
      { id: 'proj-22', name: 'Solar Street Lighting' },
      { id: 'proj-23', name: 'Solar Water Pumps' },
      { id: 'proj-24', name: 'Green Energy Education' },
    ],
    fundUtilization: {
      programs: 80,
      admin: 11,
      fundraising: 9,
    },
    impactMetrics: [
      { label: 'Solar Panels', value: '5,200' },
      { label: 'Homes Powered', value: '3,400' },
      { label: 'Schools Lit', value: '89' },
    ],
  },
];

// Transactions (dates updated to 2025-2026)
export const transactions: Transaction[] = [
  { id: 'tx-1', date: '2025-12-15', item: 'Solar Lamp Purchase (50 units)', amount: 25000, type: 'Program', receiptId: 'RCP-2025-001', ngoId: 'ngo-1' },
  { id: 'tx-2', date: '2025-12-14', item: 'Staff Training Workshop', amount: 12000, type: 'Admin', receiptId: 'RCP-2025-002', ngoId: 'ngo-1' },
  { id: 'tx-3', date: '2025-12-13', item: 'Tree Saplings (500 units)', amount: 15000, type: 'Program', receiptId: 'RCP-2025-003', ngoId: 'ngo-1' },
  { id: 'tx-4', date: '2025-12-12', item: 'Transportation & Logistics', amount: 8000, type: 'Operations', receiptId: 'RCP-2025-004', ngoId: 'ngo-1' },
  { id: 'tx-5', date: '2025-12-11', item: 'Water Filtration Systems (10)', amount: 45000, type: 'Program', receiptId: 'RCP-2025-005', ngoId: 'ngo-1' },
  { id: 'tx-6', date: '2025-12-10', item: 'Office Supplies', amount: 3500, type: 'Admin', receiptId: 'RCP-2025-006', ngoId: 'ngo-1' },
  { id: 'tx-7', date: '2026-01-09', item: 'Community Workshop Materials', amount: 6000, type: 'Program', receiptId: 'RCP-2026-007', ngoId: 'ngo-1' },
  { id: 'tx-8', date: '2026-01-08', item: 'Field Equipment Purchase', amount: 18000, type: 'Operations', receiptId: 'RCP-2026-008', ngoId: 'ngo-1' },
  { id: 'tx-9', date: '2026-01-07', item: 'Educational Materials (200 kits)', amount: 32000, type: 'Program', receiptId: 'RCP-2026-009', ngoId: 'ngo-1' },
  { id: 'tx-10', date: '2026-01-06', item: 'Monthly Audit Services', amount: 7500, type: 'Admin', receiptId: 'RCP-2026-010', ngoId: 'ngo-1' },
];

// Timeline Events (dates updated to 2025-2026)
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'phase-1',
    phase: 1,
    title: 'Funds Received',
    description: 'Your donation has been securely received and logged in the project wallet.',
    status: 'completed',
    date: '2026-01-05 09:23 AM',
    icon: 'Wallet',
  },
  {
    id: 'phase-2',
    phase: 2,
    title: 'Allocation Complete',
    description: 'Funds allocated to purchase 5 Solar Lamps for rural households in Maharashtra.',
    status: 'completed',
    date: '2026-01-05 02:15 PM',
    icon: 'Package',
  },
  {
    id: 'phase-3',
    phase: 3,
    title: 'In-Field Execution',
    description: 'Local team deployed for distribution. Expected delivery to 5 households today.',
    status: 'active',
    date: '2026-01-06 10:00 AM',
    icon: 'Truck',
  },
  {
    id: 'phase-4',
    phase: 4,
    title: 'Impact Verified',
    description: 'Geotagged proof-of-work photos uploaded. Impact confirmed by field coordinator.',
    status: 'pending',
    date: 'Pending',
    icon: 'CheckCircle',
  },
];

// Proof Items (timestamps updated to 2025-2026)
export const proofItems: ProofItem[] = [
  {
    id: 'proof-1',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600',
    gpsCoordinates: '19.0760° N, 72.8777° E',
    timestamp: '2026-01-04 11:23:45 IST',
    caption: 'Solar lamp installation at Patel household',
    location: 'Nashik District, Maharashtra',
  },
  {
    id: 'proof-2',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600',
    gpsCoordinates: '19.0823° N, 72.8812° E',
    timestamp: '2026-01-04 14:45:12 IST',
    caption: 'Children studying with new solar lighting',
    location: 'Ahmednagar, Maharashtra',
  },
  {
    id: 'proof-3',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
    gpsCoordinates: '19.0945° N, 72.8956° E',
    timestamp: '2026-01-05 09:15:33 IST',
    caption: 'Tree planting ceremony with local volunteers',
    location: 'Pune Rural, Maharashtra',
  },
  {
    id: 'proof-4',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600',
    gpsCoordinates: '19.1012° N, 72.9023° E',
    timestamp: '2026-01-05 16:30:00 IST',
    caption: 'Water filter distribution event',
    location: 'Satara, Maharashtra',
  },
];

// Beneficiary Quotes
export const beneficiaryQuotes: BeneficiaryQuote[] = [
  {
    id: 'quote-1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    quote: 'The solar lamp has transformed our evenings. My children can now study after sunset. Thank you for this gift of light.',
    location: 'Nashik, India',
  },
  {
    id: 'quote-2',
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    quote: 'Clean water has reduced illness in our village by half. We are forever grateful to the donors who made this possible.',
    location: 'Chennai, India',
  },
  {
    id: 'quote-3',
    name: 'Anita Devi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    quote: 'Education changed my life. Now I dream of becoming a doctor to help my community.',
    location: 'Bangalore, India',
  },
];

// User Donations (updated to 2025-2026, amounts in INR)
export const userDonations: UserDonation[] = [
  { id: 'ud-1', ngoName: 'Green Earth Initiative', amount: 12500, date: '2026-01-05', impactDescription: '15 trees planted' },
  { id: 'ud-2', ngoName: 'Bright Futures Foundation', amount: 6250, date: '2025-12-28', impactDescription: '3 school kits provided' },
  { id: 'ud-3', ngoName: 'Clean Water Alliance', amount: 16600, date: '2025-12-15', impactDescription: '20 families served' },
  { id: 'ud-4', ngoName: 'HealthBridge India', amount: 8300, date: '2025-11-20', impactDescription: '10 vaccines delivered' },
];

// Ticker Stats (amounts in INR)
export const tickerStats = {
  totalVerifiedImpact: 1245000000,
  projectsFunded: 450,
  carbonOffset: 12000,
  livesImpacted: 890000,
  volunteersActive: 2500,
};

// Quarterly Impact Data for charts (2025-2026)
export const quarterlyImpactData = [
  { quarter: 'Q1 2025', impact: 65, donations: 45000000 },
  { quarter: 'Q2 2025', impact: 72, donations: 52000000 },
  { quarter: 'Q3 2025', impact: 78, donations: 61000000 },
  { quarter: 'Q4 2025', impact: 85, donations: 74000000 },
  { quarter: 'Q1 2026', impact: 92, donations: 82000000 },
];

// Categories and Cities for filters
export const categories = ['All', 'Environment', 'Education', 'Healthcare', 'Humanitarian', 'Wildlife'] as const;
export const cities = ['All', 'Mumbai', 'Bangalore', 'Chennai', 'Jaipur', 'Delhi', 'Hyderabad'] as const;

// Grievance Categories
export const grievanceCategories = [
  'Fund Misuse',
  'Incorrect Information',
  'Lack of Transparency',
  'Poor Communication',
  'Project Delays',
  'Other',
] as const;
