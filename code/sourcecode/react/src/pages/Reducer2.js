import React, { Component } from 'react'
import {store} from '../redux/store'

export default class Reducer2 extends Component {
    render() {
        return (
            <div>
                Reducer2<br/>
                {store.getState().count}
            </div>
        )
    }
}
