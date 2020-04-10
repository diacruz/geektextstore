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
            </div>
            <div>
                Genres: &nbsp;
                <select id="rating" onChange={props.sortBooks}>
                    <option value="null">-------</option>
                    <option value="top-sellers">Top Sellers</option>
                    <option value="action">Action</option>
                    <option value="info">Informative</option>
                    <option value="fiction">Fiction</option>
                    <option value="rom">Romantic</option>
                </select>
            </div>
        </div>
    );
}

export default SortBar