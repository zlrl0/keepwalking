import React, { createContext, useContext, useState } from 'react';

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

  return (
    <TimetableContext.Provider value={{ timetableData, setTimetableData }}>
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetable = () => useContext(TimetableContext);
