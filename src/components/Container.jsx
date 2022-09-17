import React, { Children } from "react";

export class Wrapper extends React.Component {
    render() {
        return (
            <div className="wrapper">{Children}</div>
        )
    }
}