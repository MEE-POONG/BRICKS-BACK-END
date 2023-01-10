import nc from "next-connect";
import multer from "multer";
import FormData from 'form-data'
import fs from 'fs';
import axios from "axios";

export const config = {
    api: {
        bodyParser: false,
    },
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `pages/api/upload/`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
const upload = multer({ storage: storage })

const handler = nc()
    .use(upload.single('file'))
    .post(async (req, res) => {

        let data = new FormData();
        data.append('file', fs.createReadStream(req.file.path), req.file.filename);
        let config = {
            method: 'POST',
            url: 'https://api.cloudflare.com/client/v4/accounts/39aa4ea3c7a7d766adc4428933324787/images/v1',
            headers: {
                ...data.getHeaders(),
                'Authorization': 'Bearer LpMNSFUw7gmxpn4ZZ7P2ZAcReF6Q-HlbIWqthbO0',
                'Content-Type': 'multipart/form-data;',
                'X-Auth-Email': ''
            },
            data: data
        };
        axios(config)
            .then((response) => {
                res.status(200).send(response.data)
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error.message)
            });
    })
    .delete(async (req, res) => {
        let config = {
            method: 'delete',
            url: 'https://api.cloudflare.com/client/v4/accounts/39aa4ea3c7a7d766adc4428933324787/images/v1/' + req.query.name,
            headers: {
                'Authorization': 'Bearer HQZYfq40lbkXw2hB8Z4u_wR14ZpPl2x_uscraOf0',
                'Cookie': '__cflb=0H28vgHxwvgAQtjUGU56Rb8iNWZVUvXhuyj7m55XcT7; __cfruid=4c35142cb99efcfd2d3fdce931b159e50159777a-1668795990'
            }
        };
        axios(config)
            .then((response) => {
                res.status(200).send(response.data)
            })
            .catch((error) => {
                res.status(400).send(error.message)
            });
    })


export default handler;