const fsp = require('fs/promises');
const B2 = require('backblaze-b2');

const b2 = new B2({
  applicationKeyId: 'f8fd5a3c36a1', 
  applicationKey: '005fb012decf3584b742d35007de48b1253fab9718' 
});

class FileController {
    async upload(req, res) {
        const { filename } = req.file;

        try {

            const file = await fsp.readFile(`uploads/${filename}`, (err, data) => {
                if (err) {
                    throw err
                }

                return data;
            });

            await b2.authorize();

            const { data: { uploadUrl, authorizationToken } } = await b2.getUploadPartUrl({
                bucketId: "5fb88f5de51ad35c93360a11"
            });

            const { data } = await b2.uploadFile({
                uploadUrl: uploadUrl,
                uploadAuthToken: uploadAuthToken,
                filename: fileName,
                data: file
            });

            return res.send({ url: `https://f005.backblazeb2.com/file/projectdev/${data.filename}` });

        } catch (error) {
            return res.status(400).send({ message: 'Failed to upload!'});
        }
        
    }
}

module.exports = new FileController();