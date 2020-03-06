//get output from backend via API

import React, {component} from "react"
import axios from 'axios'

class MacroResult extents Component{
    constructor(props) {
        super(props)

        this.state = {
            results : []
        }
       }
}

export default MacroResult


// API with set headers at the back
//componentDidMount() {
//    // GET request using fetch with set headers
//    const headers = { 'Content-Type': 'application/json' }
//    fetch('https://api.npms.io/v2/search?q=react', { headers })
//        .then(response => response.json())
//        .then(data => this.setState({ totalReactPackages: data.total }));
//}