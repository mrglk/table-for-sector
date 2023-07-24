import "./App.css";
import { Table } from "./components/Table/Table";
import { getPagesCount } from "./utils/helpers";
import { Pagination } from "./components/Pagination/Pagination";
import { Search } from "./components/Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./stores/store";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ROWS_PER_PAGE = 10;

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector(({ data }) => data);
  const [filtredData, setFiltredData] = useState([]);

  const [page, setPage] = useState(+location.pathname.split("/")[1] || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ASC",
  });
  const [searchValue, setSearchValue] = useState("");

  const lastIndex = page * ROWS_PER_PAGE;
  const firstIndex = lastIndex - ROWS_PER_PAGE;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    setFiltredData(data);
  }, [data]);

  useEffect(() => {
    setTotalPages(getPagesCount(filtredData.length, ROWS_PER_PAGE));
  }, [filtredData]);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "ASC" ? "DESC" : "ASC";

    const sortedData = [...data].sort((a, b) => {
      if (key === "id") {
        return direction === "ASC" ? a[key] - b[key] : b[key] - a[key];
      } else {
        return direction === "ASC" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
    });

    setFiltredData(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSearch = (query) => {
    setSearchValue(query);

    if (!query) {
      return setFiltredData(data);
    }

    setPage(1);
    const resultsPosts = data.filter(({ userId, ...rowData }) => Object.values(rowData).join(" ").includes(query));
    setFiltredData(resultsPosts);
  };

  return (
    <div className="App">
      <div className="App__row">
        <div className="App__content">
          <div className="App__search">
            <Search value={searchValue} onChange={handleSearch} />
          </div>
          <div className="App__table">
            <Routes>
              <Route exact path="/" element={<Navigate to="/1" />} />
              <Route path="/:pageNum" element={<Table data={filtredData.slice(firstIndex, lastIndex)} handleSort={handleSort} />} />
            </Routes>
          </div>
          <div className="App__bottom">
            <Pagination setPage={setPage} page={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
