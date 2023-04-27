import "./App.css";
import List from "./components/List";

function App() {
    return (
        <div>
            <h1 className="display-1 text-light text-center"><span className="">ToDo</span> List</h1>
            <div className="horizontal-line"></div>
            <List />
        </div>
    )
}

export default App;
