import React from 'react';
import PropTypes from 'prop-types';
import {StatTile} from './StatTile';

export function Exercise(props) {
  const goalMetTotal = React.useMemo(
    () =>
      Object.values(props.data).reduce(
        (daysCompleted, {didFollowFID = false}) => daysCompleted + Number(didFollowFID),
        0
      ),
    [props.data]
  );

  return (
    <StatTile
      value={goalMetTotal / 30}
      onPress={() => null}
      progressColor="#79c141"
      header="Exercise"
      goalMetTotal={goalMetTotal}
    />
  );
}

Exercise.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      duration: PropTypes.number,
      intensity: PropTypes.oneOf(['low', 'moderate', 'high']),
      type: PropTypes.string,
    })
  ),
};
