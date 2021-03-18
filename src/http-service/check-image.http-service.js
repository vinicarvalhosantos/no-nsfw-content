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
    let predictProbability = { neutral: 0.0, drawing: 0.0, sexy: 0.0, porn: 0.0, hentai: 0.0, }
    for (let i = 0; i < predictions.length; i++) {
        switch (predictions[i].className) {
            case 'Neutral':
                predictProbability.neutral = predictions[i].probability;
                break;
            case 'Drawing':
                predictProbability.drawing = predictions[i].probability;
                break;
            case 'Sexy':
                predictProbability.sexy = predictions[i].probability;
                break;
            case 'Porn':
                predictProbability.porn = predictions[i].probability;
                break;
            case 'Hentai':
                predictProbability.hentai = predictions[i].probability;
                break;
        }
    }
    console.log(predictProbability);
    if (predictProbability.neutral > 0.90) return false;
    else if (predictProbability.drawing > 0.90) return false;
    else if ((predictProbability.neutral + predictProbability.drawing) > 0.85) return false;
    else if (predictProbability.sexy > 0.90) return PERMIT_SEXY_CONTENT === 'true' ? false : true;
    else if (predictProbability.porn > 0.90) return true;
    else if ((predictProbability.porn + predictProbability.sexy) > 0.85) return true;
    else if (predictProbability.hentai > 0.90) return true;
    else if ((predictProbability.porn + predictProbability.hentai + predictProbability.sexy) > 0.70) return true;
    return true;
}
module.exports = exports = checkImageContent;