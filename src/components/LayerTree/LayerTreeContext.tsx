import React, { useContext } from 'react';

type LayerTreeContextStore = {
  onItemClick?: (value: string, data: unknown) => void;
  allowCollapse: boolean;
};

const defaultState: LayerTreeContextStore = {
  onItemClick: undefined,
  allowCollapse: true,
};

const LayerTreeContext = React.createContext<LayerTreeContextStore>(defaultState);

type LayerTreeContextProviderProps = Partial<LayerTreeContextStore> & { children?: React.ReactNode };

const LayerTreeContextProvider: React.FC<LayerTreeContextProviderProps> = ({ onItemClick, allowCollapse, children }) => {
  allowCollapse = allowCollapse ?? true;
  const state = { ...defaultState, onItemClick, allowCollapse };
  return <LayerTreeContext.Provider value={state}>{children}</LayerTreeContext.Provider>;
};

const useLayerTreeContext = () => {
  const context = useContext(LayerTreeContext);
  if (!context) {
    throw new Error('useLayerTreeContext must be used within xxx');
  }
  return context;
};

export { LayerTreeContextProvider, useLayerTreeContext };
