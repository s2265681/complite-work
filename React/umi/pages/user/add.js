import React, { Component } from 'react'

export default class add extends Component {
    render() {
        return (
           <form action="">
               用户名<input type="text" className="form-control"/>
               密码<input type="text" className="form-control"/>
               <br/>
               <input type="submit" className="btn btn-primary"/>
           </form>
        )
    }
}
