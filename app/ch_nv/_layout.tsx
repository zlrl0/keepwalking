// ✅ app/ch_nv/_layout.tsx

import { Slot } from 'expo-router';
import { ChallengeProvider } from '../context/ChallengeContext';

export default function Layout() {
  return (
    <ChallengeProvider>
      <Slot />
    </ChallengeProvider>
  );
}