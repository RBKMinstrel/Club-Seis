import React from 'react';
import './Section.css';

const Section = ({title, extras = null, children, style}) => {

    return (
        <section className="section-component" style={style}>
            <div className="section-head">
                <h2 className="section-title">
                    {title}
                </h2>
                {extras}
            </div>
            <div className="section-content">
                {children}
            </div>
        </section>
    );

}

export default Section;