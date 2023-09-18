import { useContext, createContext, useState } from "react";

interface InitialStates {
   theme: string;
   setTheme: (newTheme: string) => void;
}

const initialStates: InitialStates = {
   theme: "light",
   setTheme: () => undefined,
};

const MyContext = createContext<InitialStates>(initialStates);

interface Props {
   children?: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
   const [theme, setTheme] = useState(initialStates.theme);

   return <MyContext.Provider value={{ theme, setTheme }}>{children}</MyContext.Provider>;
};

export default AppProvider;

//theme hook
export const useTheme = () => {
   const { theme, setTheme } = useContext(MyContext);
   return { theme, setTheme };
};
