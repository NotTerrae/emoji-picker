import React, { useContext } from 'react';
import ContainerContext from '../../context/container-context';

import classes from './EmojiContainer.module.css';

const EmojiContainer = ({ onSelectedEmoji }) => {
  const {
    setSearch,
    emojiGroups,
    emojiCategory,
    setEmojiCategory,
    filteredEmojis,
    hasFilteredEmojis,
  } = useContext(ContainerContext);

  // Displays all the content or just one category based on whether a category is selected or not.
  const displayContent = categoryName => {
    if (emojiCategory === '') {
      return Object.keys(emojiGroups).map(group => {
        const emojisInGroup = emojiGroups[group];
        return (
          // if the category has 0 emojis it will be filtered out.
          hasFilteredEmojis(emojisInGroup) && (
            <div key={group} className={classes.categoryIndividual}>
              <h4 id={group} className={classes.categoryTitle}>
                {group}
              </h4>
              <div className={classes.emojis}>
                {filteredEmojis(emojisInGroup).map(emoji => (
                  <div
                    className={classes.categoryIcon}
                    onClick={() => onSelectedEmoji(emoji.character)}
                    key={Math.random()}
                  >
                    {emoji.character}
                  </div>
                ))}
              </div>
            </div>
          )
        );
      });
    } else {
      return Object.keys(emojiGroups).map(group => {
        const emojisInGroup = emojiGroups[group];
        return (
          // if the category has 0 emojis it will be filtered out.
          hasFilteredEmojis(emojisInGroup) &&
          categoryName === group && (
            <div key={group} className={classes.categoryIndividual}>
              <h4 id={group} className={classes.categoryTitle}>
                {group}
              </h4>
              <div className={classes.emojis}>
                {filteredEmojis(emojisInGroup).map(emoji => (
                  <div
                    className={classes.categoryIcon}
                    onClick={() => onSelectedEmoji(emoji.character)}
                    key={Math.random()}
                  >
                    {emoji.character}
                  </div>
                ))}
              </div>
            </div>
          )
        );
      });
    }
  };

  return (
    <div className={classes.container}>
      <div id="top" />
      <h1 className={classes.categoryTitle}>Categories</h1>

      <div className={classes.categories}>
        <div
          className={classes.categoryIcon}
          onClick={() => setEmojiCategory('')}
        >
          {'💯'}
        </div>
        {Object.keys(emojiGroups).map(group => {
          return (
            <div
              onClick={() => setEmojiCategory(group)}
              key={group}
              className={classes.categoryIcon}
            >
              {emojiGroups[group].map(item => item.character)[0]}
            </div>
          );
        })}
      </div>
      <input
        placeholder="Search Emoji Here!"
        className={classes.search}
        onChange={event => setSearch(event.target.value)}
      />
      <div className={classes.categoryContainer}>
        {displayContent()}
        {displayContent(emojiCategory)}
      </div>
    </div>
  );
};

export default EmojiContainer;
