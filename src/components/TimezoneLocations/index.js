import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getLocationTimezoneInfo } from '../../api';

const TimezoneLocations = () => {
  const { area, location } = useParams();
  const [ state, dispatch ] = useReducer((state, {error, timezoneInfo}) => {
    if (error || timezoneInfo) {
      return {
        error: Boolean(error),
        timezoneInfo: timezoneInfo || {}
      };
    }

    return state;
  }, {
    timezoneInfo: {},
    error: false
  });

  useEffect(() => {
    getLocationTimezoneInfo(area, location)
      .then((timezoneInfo) => {
        dispatch({timezoneInfo});
      })
      .catch(() => {
        dispatch({error: true});
      })
  }, [area, location]);

  if (state.error) {
    return <div>ops something went wrong</div>;
  }

  return <>
    <div className="row">
      <span>looking for {area} {location}</span>
    </div>
    {state.timezoneInfo?.datetime && <div className="row">
      <span>time is {state.timezoneInfo.datetime}</span>
    </div>}
  </>
};

export default TimezoneLocations;