import React, {Component} from "react"

class Form extends Component {
    constructor() {
        super()
        this.state = {
            instrument: "",
            indicator: "",
            direction: "",
            magnitude: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        console.log(this.state)
        console.log(JSON.stringify(this.state))
    }

    handleSubmit (event) {
    //alert('A list was submitted: ' + this.state.formvalue);
    event.preventDefault();
    fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({
        instrument: this.state.instrument,
        indicator: this.state.indicator,
        direction: this.state.direction,
        magnitude: this.state.magnitude,
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.instrument}
                    name="instrument"
                    placeholder="Instrument"
                    onChange={this.handleChange}
                />
                <br />
                <input
                    type="text"
                    value={this.state.indicator}
                    name="indicator"
                    placeholder="Indicator"
                    onChange={this.handleChange}
                />

                {
                    /**
                     * Other useful form elements:
                     *
                     *  <textarea /> element
                     *  <input type="checkbox" />
                     *  <input type="radio" />
                     *  <select> and <option> elements
                     */
                }
                {/* Formik */}
                <br />

                <label>Direction:</label>
                <select
                    value={this.state.direction}
                    onChange={this.handleChange}
                    name="direction"
                >
                    <option value="Exceed">Exceed Expectations</option>
                    <option value="Meet">Meet Expectations</option>
                    <option value="Below">Below Expectations</option>
                </select>

                <br />

                <label>Magnitude:</label>
                <select
                    value={this.state.magnitude}
                    onChange={this.handleChange}
                    name="magnitude"
                >
                    <option value="Large">Large</option>
                    <option value="Medium">Medium</option>
                    <option value="Small">Small</option>
                </select>

                <h1>{this.state.instrument}</h1>
                <h2>{this.state.indicator}</h2>
                <h2>Direction: {this.state.direction}</h2>
                <h2>Magnitude: {this.state.magnitude}</h2>
                <button onChange={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default Form

