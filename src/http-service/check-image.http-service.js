const axios = require('axios');
require('dotenv').config();
const URL_BASE = process.env.API_URL_BASE;
const PERMIT_SEXY_CONTENT = process.env.PERMIT_SEXY_CONTENT ? process.env.PERMIT_SEXY_CONTENT : '';

let timeTried = 0;

async function checkImageContent(image) {
    let result = { urlImage: '', isNsfwContent: true };
    await axios.post(`${URL_BASE}/v1/image-content/check`, {
        urlImage: `${image}`,
    }).then(async response => {
        result.urlImage = await response.data.urlImage;
        result.isNsfwContent = await isNsfwContent(response.data.predictions);
    }, error => {
        while (timeTried < 3) { result = tryAgain(image); }
    });
    console.log(result);
    return result
}

const tryAgain = async (image) => {
    timeTried++;
    return await checkImageContent(image);
}

const isNsfwContent = (predictions) => {
    const predictProbability = getPredicts(predictions);
    console.log(predictProbability);
    if (predictProbability.neutral > 0.90) return false;
    else if (predictProbability.drawing > 0.90) return false;
    else if ((predictProbability.drawing + predictProbability.hentai) > 0.90) return true;
    else if ((predictProbability.neutral + predictProbability.drawing) > 0.85) return false;
    else if (predictProbability.sexy > 0.90) return PERMIT_SEXY_CONTENT === 'true' ? false : true;
    else if (predictProbability.porn > 0.90) return true;
    else if ((predictProbability.porn + predictProbability.sexy) > 0.85) return true;
    else if (predictProbability.hentai > 0.90) return true;
    else if ((predictProbability.porn + predictProbability.hentai + predictProbability.sexy) > 0.70) return true;
    return true;
}

const getPredicts = (predictions) => {
    let predictProbability = { neutral: 0.0, drawing: 0.0, sexy: 0.0, porn: 0.0, hentai: 0.0, }
    for (let predictionIndex = 0; predictionIndex < predictions.length; predictionIndex++) {
        if (predictions[predictionIndex].length > 3) {
            frameLength = predictions[predictionIndex].length;
            for (let frameIndex = 0; frameIndex < predictions[predictionIndex].length; frameIndex++) {
                switch (predictions[predictionIndex][frameIndex].className) {
                    case 'Neutral':
                        let neutralProbability = predictions[predictionIndex][frameIndex].probability;
                        predictProbability.neutral = getHighestValue(neutralProbability, predictProbability.neutral);
                        break;
                    case 'Drawing':
                        let drawingProbability = predictions[predictionIndex][frameIndex].probability;
                        predictProbability.drawing = getHighestValue(drawingProbability, predictProbability.drawing);
                        break;
                    case 'Sexy':
                        let sexyProbability = predictions[predictionIndex][frameIndex].probability;
                        predictProbability.sexy = getHighestValue(sexyProbability, predictProbability.sexy);
                        break;
                    case 'Porn':
                        let pornProbability = predictions[predictionIndex][frameIndex].probability;
                        predictProbability.porn = getHighestValue(pornProbability, predictProbability.porn);
                        break;
                    case 'Hentai':
                        let hentaiProbability = predictions[predictionIndex][frameIndex].probability;
                        predictProbability.hentai = getHighestValue(hentaiProbability, predictProbability.hentai);
                        break;
                }
            }
        } else {
            switch (predictions[predictionIndex].className) {
                case 'Neutral':
                    predictProbability.neutral = predictions[predictionIndex].probability;
                    break;
                case 'Drawing':
                    predictProbability.drawing = predictions[predictionIndex].probability;
                    break;
                case 'Sexy':
                    predictProbability.sexy = predictions[predictionIndex].probability;
                    break;
                case 'Porn':
                    predictProbability.porn = predictions[predictionIndex].probability;
                    break;
                case 'Hentai':
                    predictProbability.hentai = predictions[predictionIndex].probability;
                    break;
            }
        }
    }
    return predictProbability;
}

const getHighestValue = (firstValue, secondValue) => {
    return firstValue > secondValue ? firstValue : secondValue;
}

module.exports = exports = checkImageContent;