import React from 'react';

const AREAS = ['America', 'Africa', 'Antarctica', 'Asia', 'Atlantic', 'Australia', 'Europe', 'Indian', 'Pacific'];

const ConfigContext = React.createContext({
  areas: AREAS
});

export default ConfigContext;