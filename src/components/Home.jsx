import React, { useEffect, useState } from "react";
import axios from "axios";
import './home.scss';
function Home() {
  const [usersData, setUsersData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsersData(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
        setError(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPostsData(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
        setError(err);
      });
  }, []);
  const onClickItem = (val) => {
    const id = usersData
      .filter((item) => item.name == val)
      .map((item) => item.id)
      .toString();
    setData(postsData.filter((item) => item.userId == id));
  };
  return (
    <>
      {!isLoading && (
        <div className="users-ui">
          <div>
            <h2>Data from JSON Placeholder</h2>
            <select onChange={(e) => onClickItem(e.target.value)} id="select">
              <option>Choose a person </option>
              {usersData.map((data) => (
                <option key={data.id}> {data.name} </option>
              ))}
            </select>
          </div>
          <div className="posts">
            <ul>
              {data?.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
