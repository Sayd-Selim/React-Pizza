import React from "react";
import styles from "./NotfoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Нечего не найдено
      </h1>
      <p className={styles.description}>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  );
};
