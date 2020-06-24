import React, { forwardRef, useContext } from 'react';
import ConfigContext from '../../contexts/config-context';

const AreasSelector = React.memo(forwardRef(({
  currentArea,
  updateArea
}, ref) => {
  const config = useContext(ConfigContext);

  const onUpdate = (e) => {
    updateArea(e.target.value);
  };

  return <select ref={ref} value={currentArea} onChange={onUpdate}>
        {config.areas.map((area) => <option value={area} key={area}>{area}</option>)}
      </select>
}));

export default AreasSelector;