import ReactDOM from "react-dom/client";
import Header from "./Header";
import CycleOPediaClassPage from "./CycleOPediaClassPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Header></Header>
    <div className="row text-white">
        <div className="col-6">
            <span className="h1 text-warning text-center">Class Component</span>
            <CycleOPediaClassPage></CycleOPediaClassPage>
        </div>
    </div>
  </div>
);
