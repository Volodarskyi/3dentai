import { generateRes, sendErrorLog } from '../utils/api.js';

async function uploadPhoto(req,res){
    try {

        res.json(generateRes({ data: "pong-ai" }));
    } catch (err) {
        sendErrorLog({
            res,
            url: 'POST:api/photo/upload',
            err,
        });
    }
}


export default {
    uploadPhoto
};
