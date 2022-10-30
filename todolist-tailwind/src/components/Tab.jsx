import React from "react";

function Tab({ children }) {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap justify-between -mb-px text-sm font-medium text-center"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        {children}
      </ul>
    </div>
  );
}

function TabItem() {
  return (
    <>
      <li className="mr-2" role="presentation">
        <button
          className="inline-block p-4 rounded-t-lg border-b-2 border-blue-600 text-blue-600"
          id="profile-tab"
          data-tabs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          全部
        </button>
      </li>
      <li className="mr-2" role="presentation">
        <button
          className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="dashboard-tab"
          data-tabs-target="#dashboard"
          type="button"
          role="tab"
          aria-controls="dashboard"
          aria-selected="false"
        >
          待完成
        </button>
      </li>
      <li className="mr-2" role="presentation">
        <button
          className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="settings-tab"
          data-tabs-target="#settings"
          type="button"
          role="tab"
          aria-controls="settings"
          aria-selected="false"
        >
          已完成
        </button>
      </li>
    </>
  );
}

export { TabItem };

export default Tab;
