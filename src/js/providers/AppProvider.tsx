import {
  ReactNode,
  useReducer,
  createContext,
  useContext,
  Dispatch,
} from "react";
import { appReducer } from "./AppReducer";
import { contacts } from "../data/contacts";

interface AppState {
  contacts: typeof contacts;
  currentContact: any | null;
  acknowledgedIds: string[];
}

type AppAction =
  | { type: "SET_CURRENT_CONTACT"; payload: any }
  | { type: "SET_ACKNOWLEDGED_IDS"; payload: string[] };

export const initialState: AppState = {
  contacts: contacts,
  currentContact: null,
  acknowledgedIds: [],
};

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
