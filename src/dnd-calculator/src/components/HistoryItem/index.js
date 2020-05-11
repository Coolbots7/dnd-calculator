import React from 'react';
import './HistoryItem.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

const HistoryItem = (props) => {
    const { expression, evaluation, character, rolledOn } = props;

    moment.relativeTimeThreshold('ss', 0);

    return (
        <div className="history-list-item mb-3 mx-auto p-3">
            <div className="d-flex flex-column text-left">
                <span>{character}</span>
                <span>{moment(rolledOn).fromNow()}</span>
            </div>
            <div className="d-flex flex-column text-right">
                <span>{expression}</span>
                <span>{evaluation}</span>
            </div>
        </div>
    );
}

HistoryItem.propTypes = {
    expression: PropTypes.string.isRequired,
    evaluation: PropTypes.string.isRequired,
    character: PropTypes.string,
    rolledOn: PropTypes.string.isRequired
}

HistoryItem.defaultProps = {
    character: ""
}

export default HistoryItem;