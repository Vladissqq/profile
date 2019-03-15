import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHistoryContent: 'something',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeHistory = this.writeHistory.bind(this);
    }

    handleUserInput = e => {
        this.setState({
            newHistoryContent: e.target.value,
        })
    };

    writeHistory = () => {
        this.props.addHistory(this.state.newHistoryContent)

        this.setState({
            newHistoryContent: '',
        })
    };


    render() {

        return (
            <form className='search-form container-fluid' onSubmit={e => e.preventDefault()}>
                <input
                    className='search-form--input form-control '
                    type='text'
                    name='input'
                    value={this.state.newHistoryContent}
                    onChange={this.handleUserInput} />

                <button
                    disabled={this.state.newHistoryContent.length <= 2 || this.state.newHistoryContent.length >= 80}
                    name='search'
                    className='search-form--button btn btn-outline-primary'
                    onClick={this.writeHistory}>Search</button>

            </form>

        );
    }
};


export default Form;