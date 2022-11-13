import AppRoute from "./AppRoute";
import { Provider } from 'react-redux'
import {store} from './app/store'
import './index.css'
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { DOMAIN } from "./constant";

export default function App() {
    axios.defaults.baseURL = `${DOMAIN}api/v1`
    return (
        <Router>
            <Provider store={store}>
                <AppRoute />
            </Provider>
        </Router>
        
    )
}