"use client";

import { useState } from "react";
export default function Counter({ users }) {
  const [count, setCount] = useState(23);
  console.log(users);

  return (
    <div>
      <p>There are {users.length} users here</p>
      <button onClick={() => setCount((count) => count + 1)}>{count}</button>
    </div>
  );
}
