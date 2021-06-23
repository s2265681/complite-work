import React, { Component } from 'react'

import {store} from '../redux/store'


export default class Reducer1 extends Component {
    state={}
    add=()=>{
        store.dispatch({type:'add'})
        store.subscript(()=>{
            console.log('change')
            this.setState({})
        })
    }
    render() {
        return (
            <div>
                Reducer1
                <br/>
                <button onClick={this.add}>add</button>
                <br/>
                {store.getState().count}
            </div>
        )
    }
}
