import * as winston from 'winston';
import * as logzioWinstonTransport from 'winston-logzio';
import * as logseneWinstonTransport from 'winston-logsene';
import 'winston-loggly-bulk';
import * as literals from './literals';

const PERIOD_ERROR_MESSAGE: number = 10;
const PERIOD_MESSAGE_MS: number = 1000;

winston.add(logzioWinstonTransport, {
    token: literals.logzio.TOKEN,
    host: literals.logzio.HOST
});
winston.add(logseneWinstonTransport, {
    token: literals.logsene.TOKEN
});
winston.add(winston.transports.Loggly, {
    token: literals.loggly.TOKEN,
    subdomain: literals.loggly.SUBDOMAIN,
    tags: literals.loggly.TAGS
});

let count: number = 0;
setInterval(() => {
    if (count % PERIOD_ERROR_MESSAGE !== 0) {
        winston.info('Working', {
            someField: {
                key1: 'a',
                key2: 'b'
            }
        });
    }
    else {
        winston.error('Error!', {
            error: new Error()
        });
    }
    count++;
}, PERIOD_MESSAGE_MS);
