import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../lib/api.js";
import { DEFAULT_SETTINGS } from "../lib/defaults.js";

const SettingsContext = createContext(null);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .get("/settings")
      .then((res) => {
        if (active && res?.data) setSettings(res.data);
      })
      .catch(() => {
        // Fall back to defaults if settings can't be loaded.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}