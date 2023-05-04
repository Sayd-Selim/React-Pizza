import React from 'react';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
]

export function Categories({value,onChangeCategory}) {

  return (
      <div className="categories">
        <ul>
          {categories.map((categoryName,i) => <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active': null }>{categoryName}</li>)}
        </ul>
      </div>
    );
  }