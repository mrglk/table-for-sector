// import logo from './logo.svg';
import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./components/Table/Table";
import { getPagesCount } from "./utils/helpers";
import { Pagination } from "./components/Pagination/Pagination";
import { Search } from "./components/Search/Search";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const ROWS_PER_PAGE = 10;

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  const [filtredData, setFiltredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const lastIndex = page * ROWS_PER_PAGE;
  const firstIndex = lastIndex - ROWS_PER_PAGE;
  // const totalPages = getPagesCount(data.length, ROWS_PER_PAGE);

  const getData = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFiltredData(data);
  }, [data]);

  useEffect(() => {
    setTotalPages(getPagesCount(filtredData.length, ROWS_PER_PAGE));
  }, [filtredData]);

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

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const target = e.target.value;
    setSearchValue(target);

    if (!target) return setFiltredData(data);

    const resultsPosts = data.filter(
      (row) =>
        row["title"].includes(target) ||
        row["body"].includes(target) ||
        row["id"].toString().includes(target)
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
            <Search
              onSubmit={handleSubmit}
              value={searchValue}
              onChange={handleChange}
            />
          </div>
          <div className="App__table">
            <Table
              data={filtredData.slice(firstIndex, lastIndex)}
              handleSort={handleSort}
              sortConfig={sortConfig}
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
