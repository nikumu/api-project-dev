require('dotenv').config;

const fsp = require('fs/promises');
const B2 = require('backblaze-b2');

const { 
    APPLICATION_KEY_ID, 
    APPLICATION_KEY, 
    BUCKET_ID,
    BASE_URL_BACKBLAZE
} = process.env;

const b2 = new B2({
  applicationKeyId: APPLICATION_KEY_ID, 
  applicationKey: APPLICATION_KEY
});

const unlinkAsync = fsp.unlink;
class FileController {
    async upload(req, res) {
        const { filename, path } = req.file;

        try {

            const file = await fsp.readFile(`uploads/${filename}`, (err, data) => {
                if (err) {
                    throw err
                }

                return data;
            });

            await b2.authorize();

            const { data: { uploadUrl, authorizationToken } } = await b2.getUploadPartUrl({
                bucketId: BUCKET_ID
            });

            const { data } = await b2.uploadFile({
                uploadUrl: uploadUrl,
                uploadAuthToken: uploadAuthToken,
                filename: fileName,
                data: file
            });

            await unlinkAsync(path);

            return res.send({ url: `${BASE_URL_BACKBLAZE}${data.filename}` });

        } catch (error) {
            return res.status(400).send({ message: 'Failed to upload!'});
        }
        
    }
}

module.exports = new FileController();