import { createContext } from "react";

const AppContext = createContext({
  viewSettings: { isDesktop: false, isCompressedViewNeeded: false },
});

// Hook to provide access to context object

export const AppContextProvider = (props: AppContextProviderArguments) => {
  const isDesktop = true;
  const isCompressedViewNeeded = false;
  // Assign React state and constants to context object
  const AppContextObject = {
    viewSettings: {
      isDesktop,
      isCompressedViewNeeded,
    },
  };
  return (
    <AppContext.Provider value={AppContextObject}>
      {props.children}
    </AppContext.Provider>
  );
};

interface AppContextProviderArguments {
  children: JSX.Element;
}
