import React from 'react';
import PropTypes from 'prop-types';
import './DynamicList.css';
import FooterList from "./FooterList.jsx";
import {FormattedMessage} from "react-intl";

const DynamicList = ({data, total, renderItem, page, setPage, size, setSize, height, header, footer}) => {
    return (
        <div className="dynamic-list-container">
            {header && <div className="dynamic-list-header">{header}</div>}
            <div className="dynamic-list-content" style={{height: `${height}px`}}>
                {
                    data === null || data.length === 0 ? (
                        <FormattedMessage id="project.common.DynamicList.noResult"/>
                    ) : (
                        data.map((item, index) => (
                            <div key={index} className="dynamic-list-item">
                                {renderItem(item)}
                            </div>
                        ))
                    )
                }
            </div>
            <div className="dynamic-list-footer">
                <FooterList
                    count={data ? data.length : 0}
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    total={total}
                />
            </div>
        </div>
    );
};

DynamicList.propTypes = {
    data: PropTypes.any.isRequired,
    renderItem: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    setSize: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
};

export default DynamicList;