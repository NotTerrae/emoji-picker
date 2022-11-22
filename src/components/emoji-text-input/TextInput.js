import classes from './TextInput.module.css';

const TextInput = ({ onRef, onValue, onChange, onToggle }) => {
  return (
    <form action="" className={classes.form}>
      <input
        className={classes.input}
        type="text"
        name=""
        id=""
        ref={onRef}
        onChange={event => onChange(event.target.value)}
        value={onValue}
      />
      <button className={classes.button} onClick={onToggle}>
        {'🙂'}
      </button>
    </form>
  );
};

export default TextInput;
