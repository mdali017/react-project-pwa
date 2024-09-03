import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data.slice(0, 21)); // Limit to first 10 posts

        // Store data in localStorage for offline use
        localStorage.setItem("cachedPosts", JSON.stringify(data.slice(0, 21)));
      } catch (error) {
        console.error("Error fetching posts:", error);
        // If fetching fails, try to load data from localStorage
        const cachedData = localStorage.getItem("cachedPosts");
        if (cachedData) {
          setPosts(JSON.parse(cachedData));
        }
      }
    };

    fetchPosts();

    // for user
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);

        // Store data in localStorage for offline use
        localStorage.setItem("cachedUsers", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching users:", error);
        // If fetching fails, try to load data from localStorage
        const cachedData = localStorage.getItem("cachedUsers");
        if (cachedData) {
          setUsers(JSON.parse(cachedData));
        }
      }
    };

    fetchUsers();

    // Add event listeners for online/offline status
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to React PWA</h1>
      <p className="mb-4">
        This is a sample Progressive Web App built with React and Vite.
      </p>
      <p className="mb-4">
        Network status:{" "}
        <span className={isOnline ? "text-green-600" : "text-red-600"}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </p>
      <h2 className="text-2xl font-bold mb-2">Posts from JSONPlaceholder:</h2>
      {posts.length > 0 ? (
        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center justify-center">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow h-[250px]">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No posts available. You might be offline and haven't cached any posts
          yet.
        </p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-2">
        Users from JSONPlaceholder:
      </h2>
      {users.length > 0 ? (
        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center justify-center">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded shadow h-[250px]">
              <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No users available. You might be offline and haven't cached any users
          yet.
        </p>
      )}
    </div>
  );
};

export default Home;
