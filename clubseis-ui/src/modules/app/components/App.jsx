import './App.css'
import {Route, Routes} from "react-router-dom";
import {Base, Login} from "../../user/index.js";

const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/*" element={<Login/>}/>
                <Route path="/gestion" element={<Base/>}/>
            </Routes>
        </div>
    );
}

export default App
