import { EnableServer } from 'node-boot-core'
import * as bodyParser from "body-parser";
import { EnableMail } from 'node-boot-mail';
import connection from './src/database';

@EnableMail
@EnableServer
export class App {
    public app: any;
    public main = ({ app }) => {
        this.app = app;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.get('/', function (req, res) {
            res.send('Welcome to Node Boot Sample!');
        });
        connection.sync({
            alter: true,
            logging: false
        });
    };
    constructor() {
    }
}