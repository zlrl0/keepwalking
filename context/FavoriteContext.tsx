import React, { createContext, useContext, useState, ReactNode } from 'react';

type FavoriteContextType = {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([
    '수업 정보', '도서관 예약', '셔틀버스', '축제',
  ]);

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error('useFavorites must be used within a FavoriteProvider');
  return context;
};
