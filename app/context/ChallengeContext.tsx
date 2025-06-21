// context/ChallengeContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
}

interface ChallengeContextType {
  challenges: Challenge[];
  addChallenge: (challenge: Challenge) => void;
  removeChallenge: (id: string) => void; // ✅ 반드시 포함
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const addChallenge = (challenge: Challenge) => {
    setChallenges((prev) => [...prev, challenge]);
  };

  const removeChallenge = (id: string) => {
    setChallenges((prev) => prev.filter((c) => c.id !== id)); // ✅ 반드시 구현
  };

  return (
    <ChallengeContext.Provider value={{ challenges, addChallenge, removeChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) throw new Error('useChallenge must be used within a ChallengeProvider');
  return context;
};

export default ChallengeProvider;
