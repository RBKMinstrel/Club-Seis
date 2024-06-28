import React from 'react';
import './Section.css';

const Section = ({title, children}) => {

    return (
        <section className="section-component">
            <div className="section-head">
                <h2 className="section-title">
                    {title}
                </h2>
            </div>
            <div className="section-content">
                {children}
            </div>
        </section>
    );

}

export default Section;