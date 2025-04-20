"use client";
import { createContext, useContext, useState } from "react";
const ReservartionContext = createContext();
const initialState = {
  from: undefined,
  to: undefined,
};

function ReservartionProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservartionContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservartionContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservartionContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { useReservation, ReservartionProvider };
