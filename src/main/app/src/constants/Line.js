import React from 'react';

const Line = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
            marginTop: 50,
            marginBottom: 50
        }}
    />
);

export default Line;
