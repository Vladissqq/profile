import React, { Component } from 'react';
import PropTypes from 'prop-types';

class History extends Component {

    constructor(props) {
        super(props);
        console.log(props.data);
        this.historyContent = props.historyContent;
        this.data = props.data;
        this.historyId = props.historyId;
        this.handleRemoveHistory = this.handleRemoveHistory.bind(this);
    };

    handleRemoveHistory(id) {
        this.props.removeHistory(id);
    }

    render() {
        return (
            <div className='container-fluid text-center flex'>
                <p className='lead history-content'>{this.historyContent}&nbsp;<b>{this.data}</b></p>
                <div >
                    <span
                        className='btn btn-outline-danger history-remove'
                        onClick={() => this.handleRemoveHistory(this.historyId)}>
                        &times;
                    </span>
                </div>

            </div>

        );
    }
};

History.propTypes = {
    historyContent: PropTypes.string
}
export default History;