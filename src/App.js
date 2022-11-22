import React, { useContext } from 'react';
import TextInput from './components/emoji-text-input/TextInput';
import EmojiContainer from './components/emoji-container/EmojiContainer';
import AppContext from './context/app-context';
import ContainerContext from './context/container-context';

import classes from './App.module.css';

function App() {
  const {
    emojiPanelActive,
    inputText,
    setInputText,
    inputRef,
    toggleEmojiPanelHandler,
    selectedEmojiHandler,
    scrollToTop,
  } = useContext(AppContext);

  const { setEmojiCategory, setSearch } = useContext(ContainerContext);

  const resetUi = event => {
    toggleEmojiPanelHandler(event);
    setEmojiCategory('');
    setSearch('');
  };

  return (
    <div className={classes.container}>
      <TextInput
        onRef={inputRef}
        onValue={inputText}
        onChange={setInputText}
        onToggle={resetUi}
      />
      {emojiPanelActive && (
        <EmojiContainer onSelectedEmoji={selectedEmojiHandler} />
      )}
      {emojiPanelActive && (
        <button className={classes.button} onClick={scrollToTop}>
          🔝
        </button>
      )}
    </div>
  );
}

export default App;
