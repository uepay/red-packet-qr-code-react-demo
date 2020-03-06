import React from 'react';

class Application extends React.Component {

    render() {
        const { Component } = this.props;
        return (<Component />);
    }
}


export default Application