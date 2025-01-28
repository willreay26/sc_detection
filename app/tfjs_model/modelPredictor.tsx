import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';

const ModelPredictor = () => {
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    useEffect(() => {
        const loadModel = async () => {
            const modelPath = '/tfjs_model/model.json'; // Path relative to the public directory
            const loadedModel = await tf.loadLayersModel(modelPath);
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    return (
        <div>
            <h1>Skin Lesion Predictor</h1>
            {model ? <p>Model loaded successfully!</p> : <p>Loading model...</p>}
        </div>
    );
};

export default ModelPredictor;
