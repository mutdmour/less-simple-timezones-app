import React, { useState, useCallback, useEffect, useReducer } from "react";
import { getAreaTimezones } from '../../api';
import AreasSelector from '../AreasSelector';
import { Link } from 'react-router-dom';

const DEFAULT_AREA = 'Europe';

const useInput = (initialValue) => {
  const [value, setValue]  = useState(initialValue);

  const onUpdate = useCallback((e) => {
    setValue(e.target? e.target.value : e);
  }, [setValue]);

  return {
    onUpdate,
    value
  };
};

const TimezoneAreas = () => {
  const area = useInput(DEFAULT_AREA);
  const filter = useInput('');
  const [state, dispatch] = useReducer((state, {type, payload}) => {
    switch (type) {
      case 'error':
        return {
          error: true,
          timezones: null
        };
      case 'update':
        return {
          error: false,
          timezones: payload 
        };
      default:
        return state;
    }
  }, {
    timezones: null,
    error: false
  });

  const selectorRef = React.createRef();

  const getTimezones = () => {
    getAreaTimezones(area.value)
      .then((payload) => {
        dispatch({
         type: 'update',
         payload 
        });
      })
      .catch(() => {
        dispatch({
          type: 'error'
        });
      });
  };

  const renderContent = () => {
    if (state.error) {
      return <div className="alert" variant="danger"> Something went wrong </div>;
    }

    if (state.timezones?.length === 0) {
      return <div className="alert" variant="warning"> No results were returned </div>;
    }

    if (!state.timezones) {
      return null;
    }

    let listItems = state.timezones;
    if (filter.value) {
      listItems = listItems.filter((item) => item.toLowerCase().match(filter.value));
    }
    listItems = listItems.map((loc) => <li key={loc}><Link to={`${loc}`}>{loc}</Link></li>);

    return <ul>{listItems}</ul>;
  };

  useEffect(() => {
    if (!state.timezones) {
      selectorRef.current.focus();
    }
  }, [selectorRef, state.timezones]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <AreasSelector ref={selectorRef} updateArea={area.onUpdate} currentArea={area.value}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button variant="primary" onClick={getTimezones}>Get timezones</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {
            state.timezones && <input type="text" value={filter.value} onChange={filter.onUpdate}></input>
          }
        </div>
      </div>
      <div className="row">
        <div className="col">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default TimezoneAreas;
