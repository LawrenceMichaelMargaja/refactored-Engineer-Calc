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
    const method = objectChecker(sheets, ['sheets', selectedSheet, 'method'])
    const insertedSectionPropertiesMetric = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesMetric'])
    const insertedSectionPropertiesEnglish = objectChecker(sheets, ['sheets', selectedSheet, 'apiMap', 'sectionPropertiesEnglish'])
    const sectionDimensionShapes = objectChecker(sheets, ['sheets', selectedSheet, 'sectionDimensionsArrayMetric'])

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
        if (iShapePresent) {
            setIShapeDisplay('fit-content')
        }
        if (cShapePresent) {
            setCShapeDisplay('fit-content')
        }
        if (anglesPresent) {
            setAnglesDisplay('fit-content')
        }
        if (tShapePresent) {
            // alert("yes yes");
            setTShapeDisplay('fit-content')
        }
        if (doubleAnglePresent) {
            setDoubleAnglesDisplay('fit-content')
        }
        if (rectangularHSShapePresent) {
            setRectangularDisplay('fit-content')
        }
        if (roundHSAndPipeShapePresent) {
            setRoundHSAndPipeDisplay('fit-content')
        }
    }, [])

    const renderIShape = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if ((insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('I-shaped').toUpperCase()) {
                // alert("i shape");
                setIShapeDisplay('initial')
                setIShapePresent(true)
                setShape(iShape)
            }
        }
    }

    const renderCShape = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if ((insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('C-shaped').toUpperCase()) {
                // alert("c shape");
                setCShapeDisplay('initial')
                setCShapePresent(true)
                setShape(cShape)
            }
        }
    }

    const renderAngles = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if ((insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('Angles').toUpperCase()) {
                // alert("angles");
                setAnglesDisplay('initial')
                setAnglesPresent(true)
                setShape(anglesShape)
            }
        }
    }

    const renderTShape = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if ((insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('T-shaped').toUpperCase()) {
                // alert("t shape");
                setTShapeDisplay('initial')
                setTShapePresent(true)
                setShape(tShape)
            }
        }
    }

    const renderDoubleAngles = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if ((insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('Double Angles').toUpperCase()) {
                // alert("double angles");
                setDoubleAnglesDisplay('initial')
                setDoubleAnglePresent(true)
                setShape(doubleAngles)
            }
        }
    }

    const renderRectangularHS = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if ((insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('Rectangular HSS').toUpperCase()) {
                // alert("rec shape");
                setRectangularDisplay('initial')
                setDoubleAnglePresent(true)
                setShape(recShape)
            }
        }
    }

    const renderRoundAndPipeShape = () => {
        for (let i in insertedSectionPropertiesMetric) {
            if ((insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('Round HSS').toUpperCase() || (insertedSectionPropertiesMetric[i].sectionShape).toUpperCase() === ('Pipe').toUpperCase()) {
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
        if (iShapePresent) {
            setIShapeDisplay('fit-content')
        }
        if (cShapePresent) {
            setCShapeDisplay('fit-content')
        }
        if (anglesPresent) {
            setAnglesDisplay('fit-content')
        }
        if (tShapePresent) {
            // alert("yes yes");
            setTShapeDisplay('fit-content')
        }
        if (doubleAnglePresent) {
            setDoubleAnglesDisplay('fit-content')
        }
        if (rectangularHSShapePresent) {
            setRectangularDisplay('fit-content')
        }
        if (roundHSAndPipeShapePresent) {
            setRoundHSAndPipeDisplay('fit-content')
        }
    }, [insertedSectionPropertiesMetric])


    const renderGraphs = () => {
        return (
            <div style={{width: 'fit-content', margin: '1em auto', display: 'flex'}}>
                <div style={{width: 'fit-content', display: `${iShapeDisplay}`, padding: '0 0.5em'}}>
                    <img style={{width: '235px', height: '215px'}} src={iShape} alt="angle shape"/>
                </div>
                <div style={{width: 'fit-content', display: `${cShapeDisplay}`, padding: '0 0.5em'}}>
                    <img style={{width: '235px', height: '215px'}} src={cShape} alt="angle shape"/>
                </div>
                <div style={{width: 'fit-content', display: `${anglesDisplay}`, padding: '0 0.5em'}}>
                    <img style={{width: '235px', height: '215px'}} src={anglesShape} alt="angle shape"/>
                </div>
                <div style={{width: 'fit-content', display: `${tShapeDisplay}`, padding: '0 0.5em'}}>
                    <img style={{width: '235px', height: '215px'}} src={tShape} alt="angle shape"/>
                </div>
                <div style={{width: 'fit-content', display: `${doubleAnglesDisplay}`, padding: '0 0.5em'}}>
                    <img style={{width: '235px', height: '215px'}} src={doubleAngles} alt="angle shape"/>
                </div>
                <div style={{width: 'fit-content', display: `${rectangularHSDisplay}`, padding: '0 0.5em'}}>
                    <img style={{width: '235px', height: '215px'}} src={recShape} alt="angle shape"/>
                </div>
                <div style={{width: 'fit-content', display: `${roundHSAndPipeDisplay}`, padding: '0 0.5em'}}>
                    <img style={{width: '235px', height: '215px'}} src={pipeAndRoundShape} alt="angle shape"/>
                </div>
            </div>
        )
    }
    return renderGraphs()
}
export default SectionDimensionGraphs
