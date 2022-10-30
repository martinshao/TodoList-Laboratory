import React from "react";

function Todolist({children}) {
  return (
    <ul className="w-full text-sm font-medium text-gray-900 bg-white border-b-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {children}
    </ul>
  );
}

function TodoItem() {
  return (
    <>
      <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
        Profile
      </li>
      <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
        Settings
      </li>
      <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
        Messages
      </li>
      <li className="py-2 px-4 w-full rounded-b-lg">Download</li>
    </>
  );
}

export { TodoItem };

export default Todolist;
