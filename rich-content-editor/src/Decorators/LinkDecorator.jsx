import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/text-link.scss';

const Name = 'LinkDecorator';

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

const Link = ({ entityKey, contentState, className, children }) => {
  const { url, targetBlank, nofollow } = contentState.getEntity(entityKey).getData();
  const anchorProps = {
    href: url,
    target: targetBlank ? '_blank' : '_self',
    rel: nofollow ? 'nofollow' : null,
    className: classNames(Styles.link, className),
  };
  return (
    <a
      {...anchorProps}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.string.isRequired,
  contentState: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
};

export { Name, findLinkEntities as Strategy, Link as Component };
