import React, {component, useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
// import { useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination } from 'react-table';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


// React js fetch: Use componentDidMount to fetch json array of objects from given url and update state

// Using class components
class SecurityBoxAPI extends React.Component {
 constructor(props) {
     super(props);
     this.state = {
         items: [],
         isLoaded: false
     }
     this.onTagsChange = this.onTagsChange.bind(this);
 }
 onTagsChange = (event, values) => {
    this.setState({
      tags: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.tags);
    });
 }


 componentDidMount() {
     fetch("http://127.0.0.1:8000/securitybox/")
         .then(res => res.json())
         .then(json => {
             this.setState({
                 items: json,
                 isLoaded: true,
             })
         }).catch((err) => {
             console.log(err);
         });
 }

     render() {
         const { items, isLoaded } = this.state;
         console.log(this.state.items)

         return (
             <div>
                 {items.map(item => (
                    <Autocomplete
                        id="Security"
                        size="small"
                        options={item.tick_and_name}
                        onChange={this.onTagsChange}
//                        onInputChange={(event, value, reason) => {
//                        (reason === 'clear') ? props.onChange('security', '') : props.onChange('security', value)
//                        }}
                        getOptionLabel={option => option.name}
                        renderInput={params => (
                          <TextField {...params} style={{width:500}} id="Security" variant="outlined" placeholder="Security" />
                        )}>
                    </Autocomplete>
                 ))}
             </div>
         );
     }
 }

export default SecurityBoxAPI;
