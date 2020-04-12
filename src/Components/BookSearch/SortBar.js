import React, { Component } from 'react'
import Books from './Books'
import { get } from 'https';

function SortBar(props) {
    return(
        <div className='sort-bar'>
            <div>
                Sort By: &nbsp;
                <select id="sort-by" onChange={props.sortBooks}>
                    <option value="null">-------</option>
                    <option value="rating">Rating</option>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                    <option value="published-date">Publish Date</option>
                    <option value="price">Price</option>
                </select>
                <select onChange={props.changeAsc}>
                    <option value="asc">Asc</option>
                    <option value="des">Des</option>
                </select>
            </div>
            <div>
                Rating: &nbsp;
                <select id="rating" onChange={props.rating}>
                    <option value="null">-------</option>
                    <option value="1">⭐+</option>
                    <option value="2">⭐⭐+</option>
                    <option value="3">⭐⭐⭐+</option>
                    <option value="4">⭐⭐⭐⭐+</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
            </div>
            <div>
                Books per page: &nbsp;
                <select onChange={props.bpp}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="1000">∞</option>
                </select>
            </div>
            <div>
                Filter By: &nbsp;
                <select id="rating" onChange={props.filterBooks}>
                    <option value="null">-------</option>
                    <option value="top-seller">Top Sellers</option>
                    <option value="Internet">Internet</option>
                    <option value="Web Development">Web Dev</option>
                    <option value="Java">Java</option>
                    <option value="Miscellaneous">Misc</option>
                </select>
            </div>
        </div>
    );
}

export default SortBar