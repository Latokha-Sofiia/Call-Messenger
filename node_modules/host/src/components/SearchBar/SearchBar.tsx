import React from "react"
import * as styles from "./SearchBar.module.scss"

export const SearchBar = () => {
  const onClickSearchTodo = async () => {}
  const onInput = () => {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <img src="/search.svg" className={styles.searchLogo}/>
        <input
          // value={inputValue}
          onInput={onInput}
          className={styles.searchInput}
          placeholder="Поиск"
        />
        {/*<div onClick={onClickSearchTodo} className={styles.addTodo}>*/}
        {/*  +*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default SearchBar
