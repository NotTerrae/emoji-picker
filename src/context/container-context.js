import React, { useState, useEffect } from 'react';

const ContainerContext = React.createContext({
  setSearch: () => {},
  emojiGroups: {},
  emojiCategory: '',
  setEmojiCategory: () => {},
  filteredEmojis: emojis => {},
  hasFilteredEmojis: emojis => {},
});

let storedEmojis = null;

export const ContainerContextProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [emojiGroups, setEmojiGroups] = useState({});
  const [emojiCategory, setEmojiCategory] = useState('');

  //Fetches emoji data, creates category groups and sets all emojis in their respective groups
  useEffect(() => {
    const emojiRequest = async () => {
      const response = await fetch(
        'https://emoji-api.com/emojis?access_key=3f4d54503aace455b1cc5bcfbf9b5bc7a82d8c66'
      );

      const emojiData = await response.json();

      const groups = emojiData.map(emoji => emoji.group);

      const newGroups = {};

      for (let group of groups) {
        newGroups[group] = [];
      }
      for (let emoji of emojiData) {
        newGroups[emoji.group].push(emoji);
      }

      setEmojiGroups(newGroups);
      storedEmojis = newGroups;
    };

    //Stores the fetched emoji data for faster loading after first fetch
    if (!storedEmojis) {
      emojiRequest();
    } else {
      setEmojiGroups(storedEmojis);
    }
  }, []);

  //Filters emojis with the help of the search state
  const filteredEmojis = emojis => {
    if (search === '') {
      return emojis;
    }
    return emojis.filter(emoji =>
      emoji.unicodeName.toLowerCase().includes(search.toLowerCase())
    );
  };

  //Verifies if the filtered category has more than 0 elements
  const hasFilteredEmojis = emojis => {
    return filteredEmojis(emojis).length > 0;
  };

  //Watches every category change and grabs it, then scrolls to it.
  useEffect(() => {
    if (emojiCategory === '') {
      return;
    }
    let element = document.getElementById(`${emojiCategory}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [emojiCategory]);

  const contextValue = {
    setSearch,
    emojiGroups,
    emojiCategory,
    setEmojiCategory,
    filteredEmojis,
    hasFilteredEmojis,
  };

  return (
    <ContainerContext.Provider value={contextValue}>
      {children}
    </ContainerContext.Provider>
  );
};

export default ContainerContext;
