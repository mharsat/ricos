/* eslint-disable max-len */
import React from 'react';

const ShrinkIcon = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
    <g fill="none" fillRule="evenodd">
      <path fill={props.backgroundColor} d="M0 0H60V60H0z" />
      <g fill={props.foregroundColor}>
        <path
          d="M4.055 16.447H5.135V28.363999999999997H4.055z"
          transform="translate(17 16) rotate(-135 4.595 22.405)"
        />
        <g>
          <path d="M10 8.083H9v-7H2v-1h8v8z" transform="translate(17 16) rotate(-180 13 5.458)" />
          <path
            d="M4.583 -1H5.666V10.917H4.583z"
            transform="translate(17 16) rotate(-180 13 5.458) rotate(45 5.125 4.958)"
          />
        </g>
        <path d="M9.468 17.53v8h-1v-7h-7v-1h8z" transform="translate(17 16)" />
      </g>
    </g>
  </svg>
);

export default ShrinkIcon;
