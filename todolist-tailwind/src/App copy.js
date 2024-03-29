function App() {
  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#edf2f7" }}
    >
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button className="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">
                Add
              </button>
            </div>
          </div>
          <div>
            <div className="flex mb-4 items-center">
              <p className="w-full text-grey-darkest">
                Add another component to Tailwind Components
              </p>
              <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-emerald-500 border-emerald-500 hover:text-white text-green border-green hover:bg-emerald-500">
                Done
              </button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-rose-600 border-rose-600 hover:text-white hover:bg-rose-600">
                Remove
              </button>
            </div>
            <div className="flex mb-4 items-center">
              <p className="w-full line-through text-emerald-600">
                Submit Todo App Component to Tailwind Components
              </p>
              <button className="flex-none p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-grey hover:bg-gray-400">
                Not Done
              </button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
