import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Bookmark } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { NGOCard } from '@/components/NGOCard';
import { ComparisonModal } from '@/components/ComparisonModal';
import { ngos, categories, cities } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useBookmarks } from '@/contexts/BookmarkContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const NGOCatalog = () => {
  const { user, isAuthenticated } = useAuth();
  const { bookmarkedNGOs } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredNGOs = ngos.filter((ngo) => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ngo.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || ngo.city === selectedCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {isAuthenticated ? `Hello, ${user?.name}!` : 'Explore Verified Missions'}
              </h1>
              <p className="text-muted-foreground">
                Discover 100% verified organizations making real-world impact.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {bookmarkedNGOs.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  <span>{bookmarkedNGOs.length} bookmarked</span>
                </div>
              )}
              <ComparisonModal />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search NGOs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px] h-12 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* City Filter */}
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full md:w-[180px] h-12 rounded-xl">
              <MapPin className="w-4 h-4 mr-2" />
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground mb-6"
        >
          Showing {filteredNGOs.length} verified organizations
        </motion.p>

        {/* NGO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNGOs.map((ngo, index) => (
            <NGOCard key={ngo.id} ngo={ngo} index={index} />
          ))}
        </div>

        {filteredNGOs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No organizations match your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NGOCatalog;
