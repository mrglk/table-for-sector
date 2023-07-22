import "./Search.css";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { useRef } from "react";

export function Search({ onSubmit, value, onChange }) {
const $inputRef = useRef(null);
  return (
    <form className="Search" onSubmit={onSubmit}>
      <input
      ref={$inputRef}
        className="Search__input"
        type="text"
        id="search"
        value={value}
        onChange={onChange}
        placeholder="Поиск"
      />
      <button className="Search__button" onClick={() => $inputRef.current.focus()}>
        <SearchIcon />
      </button>
    </form>
  );
}
