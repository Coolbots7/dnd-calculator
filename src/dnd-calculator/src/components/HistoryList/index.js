import React from 'react';
import './HistoryList.scss'
import HistoryItem from '../HistoryItem';

const HistoryList = (props) => {
    const { history } = props;

    return (
        <div className="history-list d-flex flex-column justify-content-center h-100">
            <div className="h-auto w-100 mt-auto">
                {history.map((historyItem) => (
                    <HistoryItem expression={historyItem.expression} evaluation={historyItem.evaluation} character={historyItem.character} rolledOn={historyItem.rolledOn} />
                ))}
            </div>
        </div>
    );
}

export default HistoryList;