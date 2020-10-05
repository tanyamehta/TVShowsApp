import React, { Component } from 'react';
import axios from 'axios';

class ShowList extends Component{
    constructor(props){
        super(props);
        this.state = { 
            key1: [],
            favorite : [],
            checked : false
        };
       
       this.addFav = this.addFav.bind(this);
       this.removeFav = this.removeFav.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleClick = this.handleClick.bind(this);
       this.viewFav = this.viewFav.bind(this);
    }

    componentDidMount(){
        axios.get("http://api.tvmaze.com/shows")
        .then(({data}) =>{
            this.setState({ key1: data})
           
        })
    }

    addFav(){
        if(this.state.favorite.length===0){
            alert("No shows selected");
        }else{
        alert("Added to Favorites: "+ this.state.favorite);
        }
    }

    removeFav(){
        if(this.state.favorite.length===0){
            alert("No shows in Favorite list");
        }else{
        alert("Favorites list after removing: "+this.state.favorite);
        }
    }

    viewFav(){
        if(this.state.favorite.length===0){
            alert("Favorite List is empty");
        }else{
        alert("List of Favorite Shows: "+this.state.favorite);
        }
    }
    
    handleChange(e){
        let value = e.target.name;

        if(this.state.favorite.indexOf(value)<0){
            this.setState(prevState => ({
                favorite : [...prevState.favorite, value]
              }))
        }else{
            this.setState(prevState => ({favorite: prevState.favorite.filter(fav => fav !== value)}));
        }
        
        this.setState(state =>({
            checked : !state.checked
        }))

    }

    handleClick(){
        
    }

    render(){
        const { key1 } = this.state;
        return key1?(
        <div>
        <p>**Check the checkbox to add to favorite list</p>
        <p>**Uncheck the checkbox to remove from favorite list</p>
        <input type="button" onClick={this.addFav} value="Add to Favorites"></input>
        <input type="button" onClick={this.removeFav} value="Remove from Favorites"></input>
        <input type="button" onClick={this.viewFav} value="View Favorites"></input>
        
        
        <ul>
        {key1.map(todo =>(
                        <li key={todo.id}>
                            <input type="checkbox" name={todo.name} label={todo.name} onChange={this.handleChange} checked={todo.checked} ></input>
                            <span>{todo.name}</span>
                            
                        </li>
                    ))}
                    </ul>
        </div>): <h1>Loading....</h1>
    }
}

export default ShowList;