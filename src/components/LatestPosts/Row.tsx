import React from 'react';

import './styles.scss';

type Row = {
    postContent: Array<string>,
    titleStyle: boolean
}

const Row = ({titleStyle, postContent} : Row) => {

    const [ title, content, date ] = postContent;

    return (
        <>
            <span className={titleStyle ? 'header' : ''}>
                {title}
            </span>
            <span className={titleStyle ? 'header' : ''}>
                {content}
            </span>
            <span className={titleStyle ? 'header' : ''}>
                {date}
            </span>
        </>
    )
}

export default Row;
