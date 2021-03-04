import {useParams} from 'react-router-dom';
import React from 'react';
const Memo = () => {
    const { id } = useParams();
    return <h2>About：{id}</h2>
}

export default Memo;