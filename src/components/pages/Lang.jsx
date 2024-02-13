import { useRef, useState } from "react"

import classes from '../../lib/tf'

const reader = new FileReader()
let image = document.createElement('img')

export default function Lang() {
    
    function getCantoneseWord(predictions) {
        return classes[predictions[0]?.class]
    }
    
    reader.addEventListener('load', predict)
    
    function readFile(input) {
        if (input.files.length < 1) {
            alert('you must choose a file first')
            return
        }
        console.log('predicting...')
        reader.readAsDataURL(input.files[0])
    }
    
    async function predict(e) {
        image.src = e.target.result
        // console.log("Image:")
        // console.dir(image)

        $img(e.target.result)
    
        // Load the model.
        const model = await cocoSsd.load()
        
        // detect objects in the image.
        const predictions = await model.detect(image)
        console.log(predictions)
    
        console.log('Predictions: ', predictions);
        let cantonese = getCantoneseWord(predictions)
        const [x, y, w, h] = predictions[0]?.bbox
        $prediction({
            english: predictions[0]?.class,
            bbox: {
                left: (x/image.naturalWidth*100)+'%',
                top: (y/image.naturalHeight*100)+'%',
                width: (w/image.naturalWidth*100)+'%',
                height: (h/image.naturalHeight*100)+'%'
            },
            cantonese
        })
    }
    // state is any data that, when changed, should automatically update the dom
    // useState returns an array of two things:
        //  1. the state
        //  2. the function for updating the state
    const DEV = false
    const testPrediction = {english: "test", cantonese: "test", bbox: {}}
    const testImg = "https://picsum.photos/800/800"
    const [prediction, $prediction] = useState(DEV ? testPrediction : null)
    const [img, $img] = useState(DEV ? testImg : null)

    const input = useRef()

    function handlePredict(e) {
        readFile(input.current)
    }

    return (
        <>
            <div>
                <input type="file" accept="image/*" ref={input} />
                <button onClick={handlePredict}>predict</button>
                <br />
                <div id="prediction-container">
                    {/* 
                        Conditional rendering, 
                        for example
                            {5 > 6 && (
                                <>

                                </>
                            )}

                            {5 < & ? (
                                <></>
                            ) : (
                                <></>
                            )}
                    */}
                    {prediction ? (
                        <div id="prediction">
                            <img src={img} />
                            <div className="prediction_text">
                                <div className="prediction_eng">
                                    English: {prediction.english}
                                </div>
                                <div className="prediction_can">
                                    Cantonese: {prediction.cantonese}
                                </div>
                            </div>
                            <div className="rect" style={{
                                position: 'absolute',
                                left: prediction.bbox.left,
                                top: prediction.bbox.top,
                                width: prediction.bbox.width,
                                height: prediction.bbox.height,
                            }}>
                            </div>
                        </div>
                    ):(
                        <>
                            Upload an image to see a translation!
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
