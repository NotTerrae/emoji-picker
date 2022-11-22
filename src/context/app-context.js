import React, { useState, useEffect, useRef } from 'react';

const AppContext = React.createContext({
  emojiPanelActive: false,
  inputText: '',
  setInputText: () => {},
  inputRef: null,
  toggleEmojiPanelHandler: event => {},
  selectedEmojiHandler: emoji => {},
  scrollToTop: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [emojiPanelActive, setEmojiPanelActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef();

  //Keeps input in focus after each emoji click
  useEffect(() => {
    inputRef.current.focus();
  }, [inputText]);

  //Toggles the emoji container
  const toggleEmojiPanelHandler = event => {
    event.preventDefault();
    setEmojiPanelActive(prevState => !prevState);
  };

  //Updates the input text
  const selectedEmojiHandler = emoji => {
    setInputText(prevInputState => prevInputState + emoji);
  };

  const scrollToTop = () => {
    const topElement = document.getElementById('top');

    topElement.scrollIntoView({ behavior: 'smooth' });
  };

  const contextValue = {
    emojiPanelActive,
    inputText,
    setInputText,
    inputRef,
    toggleEmojiPanelHandler,
    selectedEmojiHandler,
    scrollToTop,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
