'use strict';

const crypto = require('crypto');

async function hash(value, password) {

    return hashSync(value, password);
}

function hashSync(value, password) {

    return crypto
      .createHmac('sha256', Buffer.from(password, 'base64'))
      .update(value)
      .digest("base64");
}

module.exports = {
    hash,
    hashSync
};