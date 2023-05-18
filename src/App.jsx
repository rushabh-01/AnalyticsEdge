import { useEffect, useState } from "react";
import Pagination from "./components/Pagination.jsx";
import GridLayout from "./components/GridLayout.jsx";
import api from "./api-json.js";


const Limit = 10;

function App() {
  const [Loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterAttribute, setFilterAttribute] = useState("");
  const [grid, setgrid] = useState("users");
  const [current, setCurrent] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [total, setTotal] = useState(0);
  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [comments, setComments] = useState([]);
  
  

  const fetching = async (resource, page) => {
    setLoading(true);
    try {
      const start = (page - 1) * Limit;
      const response = await fetch(
        `${api}/${resource}?_start=${start}&_limit=${Limit}`
      );
      const data = await response.json();
      setLoading(false);
  
      const resourceMap = {
        users: setUsers,
        posts: setPosts,
        comments: setComments,
      };
  
      if (resource in resourceMap) {
        resourceMap[resource](data);
      }
      
      setTotal(Math.ceil(response.headers.get("X-Total-Count") / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setCurrent(1);
    //fetching
    fetching(grid, 1);
  }, [grid]);

  useEffect(() => {
    //fetching
    fetching(grid, current);
  }, [grid, current]);

  //filter value here
  const handleFilterValue = (event) => {
    setFilterValue(event.target.value);
  };

  //function to handle page
  const handlePage = (page) => {
    setCurrent((prevPage) => (prevPage !== page ? page : prevPage));
  };
  
  // function to search
  const Search = (event) => {
    setSearchWord(event.target.value);
  };

  //filter attribute here
  const handleFilterAttr = (event) => {
    setFilterAttribute(event.target.value);
  };
  // data to be filtered
  const filterData = (data) => {
    if (!filterAttribute || !filterValue) {
      return data;
    }

    return data.filter((item) => {
      const itemValue = item[filterAttribute];
      return (
        itemValue &&
        itemValue.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    });
  };
  const filterSearch = (data) => {
    if (!searchWord && !filterAttribute && !filterValue) {
      return data;
    }
    let filteredResult = data;

    if (searchWord) {
      filteredResult = filteredResult.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    return filterData(filteredResult);
  };

  // filter and sort
  const filteredResult = 
    filterSearch(
      grid === "users" 
      ?
      users : grid === "posts" 
      ?
      posts : comments
    )
  .sort()
  const columns =
    grid === "users"
      ? ["id", "name", "email"]
      : grid === "posts"
      ? ["id", "title"]
      : ["id", "name", "email", "body"];

  return (
    <div className=" w-full flex flex-col justify-center items-center m-6">
      <div className="p-4 flex flex-wrap gap-4">
        <button
          className="bg-green-400 p-3 text-white"
          onClick={() => setgrid("users")}
        >
          Users
        </button>
        <button
          className="bg-green-400 p-3 text-white"
          onClick={() => setgrid("posts")}
        >
          Posts
        </button>
        <button
          className="bg-green-400 p-3 text-white"
          onClick={() => setgrid("comments")}
        >
          Comments
        </button>
      </div>
      <div className="flex flex-wrap">
        <label className="text-xl">Search:
          <input
            className="border-black border-2 px-2 text-lg "
            type="text"
            value={searchWord}
            onChange={Search}
          />
        </label>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        <label>Filter:
          <select
            className="border-1 mt-4"
            value={filterAttribute}
            onChange={handleFilterAttr}
          >
            <option value="">Select</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter the value:
          <input
            className="border-2 border-black rounded-sm  px-3"
            type="text"
            value={filterValue}
            onChange={handleFilterValue}
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {columns.map((col) => (
          <button
            key={col}
            style={{
            }}
          >{col}
          </button>
        ))}
      </div>
      <GridLayout
        data={filteredResult}
        columns={columns}
        onColumnSort={filterSearch}
      />
      <Pagination
        current={current}
        total={total}
        onPageChange={handlePage}
      />
    </div>
  );
}

export default App;
