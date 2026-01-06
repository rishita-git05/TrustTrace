import { createContext, useContext, useState, ReactNode } from 'react';
import { NGO } from '@/data/mockData';

interface BookmarkContextType {
  bookmarkedNGOs: string[];
  toggleBookmark: (ngoId: string) => void;
  isBookmarked: (ngoId: string) => boolean;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedNGOs, setBookmarkedNGOs] = useState<string[]>([]);

  const toggleBookmark = (ngoId: string) => {
    setBookmarkedNGOs((prev) =>
      prev.includes(ngoId)
        ? prev.filter((id) => id !== ngoId)
        : [...prev, ngoId]
    );
  };

  const isBookmarked = (ngoId: string) => bookmarkedNGOs.includes(ngoId);

  const clearBookmarks = () => setBookmarkedNGOs([]);

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedNGOs, toggleBookmark, isBookmarked, clearBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
