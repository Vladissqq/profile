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
            <div className='container-fluid   row'>
                <div className='history-content col-lg-10 container-fluid text-left lead'>
                    <div><b className= 'history-data'>{this.data}</b></div> 
                    <p className='p  '>{this.historyContent}&nbsp;</p>
                </div>
                <div className='col-lg-2'>
                    <span
                        className='btn btn-outline-danger history-remove '
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