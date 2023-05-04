import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Categories } from "../components/Categories";
import { arr, Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App"; // Здесь мы импортируем наш контекст и используем здесь
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  // const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);
  const { searchInput } = React.useContext(SearchContext); // Вот здесь

  const onChangeCategory = React.useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);



  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };




  // ЕСЛИ БЫЛ ПЕРВЫЙ РЕНДЕР, ТО ПРОВЕРЯЕМ URL-ПАРАМЕТРЫ И СОХРАНЯЕМ В РЕДУКСЕ
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // console.log("PARAMS", params);
      const sort = arr.find((obj) => obj.sortProperty === params.sortProperty);
      // console.log("sort", sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);



// ЕСЛИ ИЗМЕНИЛИ ПАРАМЕТРЫ И БЫЛ ПЕРВЫЙ РЕНДЕР
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
      // console.log("queryStringssssssssssssssss", queryString);
    }
    isMounted.current = true;

  }, [categoryId, sort.sortProperty, currentPage]);



  const fetchPizzas = () => {
    setIsloading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    axios
      .get(
        `https://640ad97165d3a01f9808d355.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((response) => {
        setItems(response.data);
        setIsloading(false); // ЗДЕСЬ МЫ ЕЁ ОТКЛЮЧАЕМ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
      });
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, searchInput]);



  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading // ЕСЛИ ОНА ТРУ , ТО ВЫПОЛНЯЕТСЯ СКЕЛЕТОН ДЛЯ СТРАНИЦЫ
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items
              .filter((elem) =>
                elem.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((elem) => <PizzaBlock key={elem.id} {...elem} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
