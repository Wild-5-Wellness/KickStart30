import React from 'react';
import PropTypes from 'prop-types';
import {StatTile} from './StatTile';

export function Mindfulness(props) {
  const goalMetTotal = React.useMemo(
    () =>
      Object.values(props.data).reduce(
        (daysCompleted, {didMeditateToday}) =>
          daysCompleted + Number(Boolean(didMeditateToday)),
        0
      ),
    [props.data]
  );

  return (
    <StatTile
      value={goalMetTotal / 30}
      onPress={() => null}
      progressColor="#0ab5eb"
      header="Mindfulness"
      goalMetTotal={goalMetTotal}
    />
  );
}

Mindfulness.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      didMeditateToday: PropTypes.bool,
      type: PropTypes.string,
    })
  ),
};
