import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./components/Table/Table";
import { getPagesCount } from "./utils/helpers";
import { Pagination } from "./components/Pagination/Pagination";
import { Search } from "./components/Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./stores/store";

const ROWS_PER_PAGE = 10;

function App() {
  const dispatch = useDispatch();
  const data = useSelector(({ data }) => data);
  const searchParams = new URLSearchParams(window.location.search);
  const [filtredData, setFiltredData] = useState([]);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
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

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page);
    window.history.pushState(null, null, `?${searchParams.toString()}`);
  }, [page]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (key === "id") {
        return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
      } else {
        return direction === "ascending"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setFiltredData(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    const target = e.target.value;
    setSearchValue(target);

    if (!target) return setFiltredData(data);

    setPage(1);
    const resultsPosts = data.filter((cell) =>
      [cell["title"], cell["body"], cell["id"].toString()].some((item) =>
        item.includes(target)
      )
    );

    setFiltredData(resultsPosts);
  };

  if (data.length === 0) {
    return;
  }

  return (
    <div className="App">
      <div className="App__row">
        <div className="App__content">
          <div className="App__search">
            <Search value={searchValue} onChange={handleSearch} />
          </div>
          <div className="App__table">
            <Table
              data={filtredData.slice(firstIndex, lastIndex)}
              handleSort={handleSort}
            />
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
