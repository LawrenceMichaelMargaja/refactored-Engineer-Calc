import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {objectChecker} from "../../../../../utilities/utilities";

import anglesShape from '../images/anglesShape.jpg'
import iShape from '../images/iShape.jpg'
import pipeAndRoundShape from '../images/pipeAndRoundShape.jpg'
import recShape from '../images/recShape.jpg'
import tShape from '../images/tShape.jpg'
import cShape from '../images/cShape.jpg'
import doubleAngles from '../images/doubleAngles.jpg'

const SectionDimensionGraphs = () => {

    const sheets = useSelector(state => state.sheets)
    const selectedSheet = useSelector(state => state.sheets.selectedSheet)
    const insertedSectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const sectionDimensionShapes = objectChecker(sheets, ['sheets', selectedSheet, 'sectionDimensionsArrayMetric'])
    // const angles = require('../../sectionDimensions/images/anglesShape.jpeg')

    let shapesArray = []
    const [shape, setShape] = useState('')
    const [iShapePresent, setIShapePresent] = useState(false)
    const [cShapePresent, setCShapePresent] = useState(false)
    const [anglesPresent, setAnglesPresent] = useState(false)
    const [tShapePresent, setTShapePresent] = useState(false)
    const [doubleAnglePresent, setDoubleAnglePresent] = useState(false)
    const [rectangularHSShapePresent, setRectangularHSShapePresent] = useState(false)
    const [roundHSAndPipeShapePresent, setRoundHSAndPipeShapePresent] = useState(false)

    const [iShapeDisplay, setIShapeDisplay] = useState('none')
    const [cShapeDisplay, setCShapeDisplay] = useState('none')
    const [anglesDisplay, setAnglesDisplay] = useState('none')
    const [tShapeDisplay, setTShapeDisplay] = useState('none')
    const [doubleAnglesDisplay, setDoubleAnglesDisplay] = useState('none')
    const [rectangularHSDisplay, setRectangularDisplay] = useState('none')
    const [roundHSAndPipeDisplay, setRoundHSAndPipeDisplay] = useState('none')

    useEffect(() => {
        if(iShapePresent) {
            setIShapeDisplay('fit-content')
        }
        if(cShapePresent) {
            setCShapeDisplay('fit-content')
        }
        if(anglesPresent) {
            setAnglesDisplay('fit-content')
        }
        if(tShapePresent) {
            // alert("yes yes");
            setTShapeDisplay('fit-content')
        }
        if(doubleAnglePresent) {
            setDoubleAnglesDisplay('fit-content')
        }
        if(rectangularHSShapePresent) {
            setRectangularDisplay('fit-content')
        }
        if(roundHSAndPipeShapePresent) {
            setRoundHSAndPipeDisplay('fit-content')
        }
    }, [])
    //
    // useEffect(() => {
    //     if(iShapePresent) {
    //         alert("hell = " + JSON.stringify(insertedSectionPropertiesMetric))
    //         setIShapeDisplay('fit-content')
    //     }
    //     if(cShapePresent) {
    //         setCShapeDisplay('fit-content')
    //     }
    //     if(anglesPresent) {
    //         setAnglesDisplay('fit-content')
    //     }
    //     if(tShapePresent) {
    //         // alert("yes yes");
    //         setTShapeDisplay('fit-content')
    //     }
    //     if(doubleAnglePresent) {
    //         setDoubleAnglesDisplay('fit-content')
    //     }
    //     if(rectangularHSShapePresent) {
    //         setRectangularDisplay('fit-content')
    //     }
    //     if(roundHSAndPipeShapePresent) {
    //         setRoundHSAndPipeDisplay('fit-content')
    //     }
    // }, [insertedSectionPropertiesMetric])

    // useEffect(() => {
    //     if(iShapePresent) {
    //         setIShapeDisplay('visible')
    //     }
    //     if(cShapePresent) {
    //         setCShapeDisplay('visible')
    //     }
    //     if(anglesPresent) {
    //         setAnglesDisplay('visible')
    //     }
    //     if(tShapePresent) {
    //         setTShapeDisplay('visible')
    //     }
    //     if(doubleAnglePresent) {
    //         setDoubleAnglesDisplay('visible')
    //     }
    //     if(rectangularHSShapePresent) {
    //         setRectangularDisplay('visible')
    //     }
    //     if(roundHSAndPipeShapePresent) {
    //         setRoundHSAndPipeDisplay('visible')
    //     }
    // }, [sectionDimensionShapes])

    const renderIShape = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if(insertedSectionPropertiesMetric[i].sectionShape === 'I-shaped') {
                // alert("i shape");
                setIShapeDisplay('initial')
                setIShapePresent(true)
                setShape(iShape)
            }
        }
    }

    const renderCShape = () => {
        for(let i in insertedSectionPropertiesMetric) {
            if(insertedSectionPropertiesMetric[i].sectionShape === 'C-shaped') {
                // alert("c shape");
                setCShapeDisplay('initial')
                setCShapePresent(true)
                setShape(cShape)
            }
        }
    }

    const renderAngles = () => {
        for(let i in insertedSectionPropertiesMetric) {
            if(insertedSectionPropertiesMetric[i].sectionShape === 'Angles') {
                // alert("angles");
                setAnglesDisplay('initial')
                setAnglesPresent(true)
                setShape(anglesShape)
            }
        }
    }

    const renderTShape = () => {
        for(let i in insertedSectionPropertiesMetric) {
            if(insertedSectionPropertiesMetric[i].sectionShape === 'T-shaped') {
                // alert("t shape");
                setTShapeDisplay('initial')
                setTShapePresent(true)
                setShape(tShape)
            }
        }
    }

    const renderDoubleAngles = () => {
        for(let i in insertedSectionPropertiesMetric) {
            if(insertedSectionPropertiesMetric[i].sectionShape === 'Double Angles') {
                // alert("double angles");
                setDoubleAnglesDisplay('initial')
                setDoubleAnglePresent(true)
                setShape(doubleAngles)
            }
        }
    }

    const renderRectangularHS = () => {
        for(let i in insertedSectionPropertiesMetric) {
            if(insertedSectionPropertiesMetric[i].sectionShape === 'Rectangular HSS') {
                // alert("rec shape");
                setRectangularDisplay('initial')
                setDoubleAnglePresent(true)
                setShape(recShape)
            }
        }
    }

    const renderRoundAndPipeShape = () => {
        for(let i in insertedSectionPropertiesMetric) {
            if(insertedSectionPropertiesMetric[i].sectionShape === 'Round HSS' || shape === 'Pipe') {
                // alert("round and pipe shape");
                setRoundHSAndPipeDisplay('initial')
                setRoundHSAndPipeShapePresent(true)
                setShape(pipeAndRoundShape)
            }
        }
    }

    useEffect(() => {
        renderIShape()
        renderCShape()
        renderAngles()
        renderTShape()
        renderDoubleAngles()
        renderRectangularHS()
        renderRoundAndPipeShape()
    }, [insertedSectionPropertiesMetric])

    useEffect(() => {
        if(iShapePresent) {
            setIShapeDisplay('fit-content')
        }
        if(cShapePresent) {
            setCShapeDisplay('fit-content')
        }
        if(anglesPresent) {
            setAnglesDisplay('fit-content')
        }
        if(tShapePresent) {
            // alert("yes yes");
            setTShapeDisplay('fit-content')
        }
        if(doubleAnglePresent) {
            setDoubleAnglesDisplay('fit-content')
        }
        if(rectangularHSShapePresent) {
            setRectangularDisplay('fit-content')
        }
        if(roundHSAndPipeShapePresent) {
            setRoundHSAndPipeDisplay('fit-content')
        }
    }, [insertedSectionPropertiesMetric])


    const renderGraphs = () => {
        return (
            <div style={{width: '90%', margin: '1em auto', display: 'flex'}}>
                    <div style={{width: 'fit-content', display: `${iShapeDisplay}` }}>
                        <img style={{width: '220px', height: '200px'}} src={iShape} alt="angle shape"/>
                    </div>
                    <div style={{width: 'fit-content', display: `${cShapeDisplay}`}}>
                        <img style={{width: '220px', height: '200px'}} src={cShape} alt="angle shape"/>
                    </div>
                    <div style={{width: 'fit-content', display: `${anglesDisplay}`}}>
                        <img style={{width: '220px', height: '200px'}} src={anglesShape} alt="angle shape"/>
                    </div>
                    <div style={{width: 'fit-content', display: `${tShapeDisplay}`}}>
                        <img style={{width: '220px', height: '200px'}} src={tShape} alt="angle shape"/>
                    </div>
                    <div style={{width: 'fit-content', display: `${doubleAnglesDisplay}`}}>
                        <img style={{width: '220px', height: '200px'}} src={doubleAngles} alt="angle shape"/>
                    </div>
                    <div style={{width: 'fit-content', display: `${rectangularHSDisplay}`}}>
                        <img style={{width: '220px', height: '200px'}} src={recShape} alt="angle shape"/>
                    </div>
                    <div style={{width: 'fit-content', display: `${roundHSAndPipeDisplay}`}}>
                        <img style={{width: '220px', height: '200px'}} src={pipeAndRoundShape} alt="angle shape"/>
                    </div>
            </div>
        )
    }

    // const renderGraphs = () => {
    //     // alert(sectionDimensionShapes)
    //
    //     for (let index in sectionDimensionShapes) {
    //         // shapesArray.push(
    //         //     <div style={{width: '100%'}} key={index}>
    //         //         <img style={{width: '220px', height: '200px'}} src={shape} alt="angle shape"/>
    //         //     </div>
    //         // )
    //
    //         if(iShapePresent) {
    //             shapesArray.push(
    //                 <div style={{width: '100%'}} key={index}>
    //                     <img style={{width: '220px', height: '200px'}} src={iShape} alt="angle shape"/>
    //                 </div>
    //             )
    //         }
    //
    //         if(cShapePresent) {
    //             shapesArray.push(
    //                 <div style={{width: '100%'}} key={index}>
    //                     <img style={{width: '220px', height: '200px'}} src={cShape} alt="angle shape"/>
    //                 </div>
    //             )
    //         }
    //
    //         if(anglesPresent) {
    //             shapesArray.push(
    //                 <div style={{width: '100%'}} key={index}>
    //                     <img style={{width: '220px', height: '200px'}} src={anglesShape} alt="angle shape"/>
    //                 </div>
    //             )
    //         }
    //
    //         if(tShapePresent) {
    //             shapesArray.push(
    //                 <div style={{width: '100%'}} key={index}>
    //                     <img style={{width: '220px', height: '200px'}} src={tShape} alt="angle shape"/>
    //                 </div>
    //             )
    //         }
    //
    //         if(doubleAnglePresent) {
    //             shapesArray.push(
    //                 <div style={{width: '100%'}} key={index}>
    //                     <img style={{width: '220px', height: '200px'}} src={doubleAngles} alt="angle shape"/>
    //                 </div>
    //             )
    //         }
    //
    //         if(rectangularHSShapePresent) {
    //             shapesArray.push(
    //                 <div style={{width: '100%'}} key={index}>
    //                     <img style={{width: '220px', height: '200px'}} src={recShape} alt="angle shape"/>
    //                 </div>
    //             )
    //         }
    //
    //         if(roundHSAndPipeShapePresent) {
    //             shapesArray.push(
    //                 <div style={{width: '100%'}} key={index}>
    //                     <img style={{width: '220px', height: '200px'}} src={pipeAndRoundShape} alt="angle shape"/>
    //                 </div>
    //             )
    //         }
    //     }
    //     return (
    //         <div style={{width: '90%', margin: '1em auto'}}>
    //             <div style={{
    //                 width: '100%',
    //                 margin: '0 auto',
    //                 display: 'flex',
    //             }}>
    //                 {shapesArray}
    //             </div>
    //         </div>
    //     )
    // }
    return renderGraphs()
}
export default SectionDimensionGraphs
