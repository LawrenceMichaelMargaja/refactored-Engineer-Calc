import React from "react";
import LegendFirstColumn from "./firstColumn/LegendFirstColumn";
import LegendSecondColumn from "./secondColumn/LegendSecondColumn";

const Legend = () => {

    return (
        <div style={{
            margin: '2em auto',
            paddingTop: '5em',
            // justifyItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            height: 'fit-content',
            backgroundColor: '#f2f2f2',
            textAlign: 'center'
        }}>
            <LegendFirstColumn/>
            <LegendSecondColumn/>
        </div>
    )
}

export default Legend