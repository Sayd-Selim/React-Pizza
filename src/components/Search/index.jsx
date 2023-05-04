import React from "react";
import styles from "./Search.module.scss";
import lovoSearch from "../../assets/img/search.png";
import closerInput from "../../assets/img/close-button.png";
import { SearchContext } from "../../App"; // Здесь мы импортируем наш контекст и используем здесь
import debounce from "lodash.debounce";

export const Search = () => {
  const { setSearchInput } = React.useContext(SearchContext); // Вот здесь
  const [inputValue, setInputValue] = React.useState('')


  const onChangeInput = React.useCallback(
    debounce((event) => {
      console.log(event);
      setSearchInput(event);
    },400),
    []
  );


    const uodateValueInput = (event) => {
      onChangeInput(event)
      setInputValue(event)
    }



  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchInput("");
    setInputValue('')
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={lovoSearch} alt="" />
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(event) => uodateValueInput(event.target.value)}
        className={styles.input}
        placeholder="Поиск Пиццы..."
      />
      <img
        onClick={onClickClear}
        className={styles.closer}
        src={inputValue ? closerInput : ""}
        alt=""
      />
    </div>
  );
};
