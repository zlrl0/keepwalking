import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';

export interface CellData {
  day: string;
  time: string;
  color: string;
  text?: string;
}

interface TimetableContextProps {
  timetableData: CellData[];
  setTimetableData: (data: CellData[]) => void;
}

const TimetableContext = createContext<TimetableContextProps>({
  timetableData: [],
  setTimetableData: () => {},
});

export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timetableData, setTimetableData] = useState<CellData[]>([]);

  // 🔄 사용자 로그인 상태에 따라 시간표 불러오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ref = doc(db, 'timetables', user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            setTimetableData(data.timetable || []);
            console.log('✅ 사용자별 시간표 불러오기 성공');
          } else {
            setTimetableData([]); // 🔄 기존 유저지만 시간표 없음
          }
        } catch (err) {
          console.error('❌ 시간표 불러오기 오류:', err);
        }
      } else {
        setTimetableData([]); // 🔄 로그아웃 시 초기화
      }
    });

    return () => unsubscribe(); // 정리
  }, []);

  return (
    <TimetableContext.Provider value={{ timetableData, setTimetableData }}>
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetable = () => useContext(TimetableContext);
