import React, { Component } from 'react'

export default class add extends Component {
    render() {
        let user = this.props.location.state || {}
        return (
          <div className="panel panel-default">
              <div className="panel-body">
                  ID:{user.id}
                  姓名:{user.name}
              </div>
          </div>
        )
    }
}
