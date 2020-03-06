import React from 'react';
import ReactDOM from 'react-dom';
import { Radiobox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { render } from 'react-dom';
import { DropdownList } from 'react-widgets'
import Container from '@material-ui/core/Container';
import MacroResults from './results/macroresults.js'

let country = ["US", "Singapore", "China"]


function MacroPage() {

  return (
    <div>
        <h2>&emsp; Market Chronicles</h2>
        <div style={{height:20, backgroundColor: "#375259"}}/>
        <div style={{height:5, backgroundColor: "#cccecf"}}/>
        <p>&emsp; Welcome to our macro page!</p>
        <div style={{height:5}}/>
        <h3>&emsp; Search for past economic surprises</h3>
        <form>
            <label>
                &emsp; Region:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
            <div style={{height:10}}/>
            <label>
                &emsp; Select a region:
                    <select>
                    <option value="US">US</option>
                    <option value="EMEA">EMEA</option>
                    <option value="APAC">APAC</option>
                    </select>
            </label>
            <input type="submit" value="Submit" />
        </form>

      <div style={{height:50}}/>
      <h3>&emsp; Random test input boxes</h3>

        <DropdownList
        data={country}
        defaultValue={"US"}>
        </DropdownList>

        <hr></hr>
        <h3>&emsp; Results </h3>
        <MacroResults />
    </div>

  );
}

export default MacroPage;
