import { useAppSelector } from "./store";
import { getAboutData } from './store/reducers/aboutReducer';
import logo from "./logo.svg";
import "./App.css";

function App() {
  const data = useAppSelector((state) => getAboutData(state));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>{data}</span>
      </header>
    </div>
  );
}

export default App;
