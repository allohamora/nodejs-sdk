const fetch = require("node-fetch");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const sprintf = require('sprintf-js').sprintf

const FormInitDTO = require("./dto/FormInitDTO");
const FormUpdateDTO = require("./dto/FormUpdateDTO");
const FormResignDTO = require("./dto/FormResignDTO");

/**
 * @typedef {Record<string, unknown>} RequestAttributes
 * @typedef {Record<string, unknown>} ResponseData
 */

/**
 * @see https://api-docs.solidgate.com/
 */
module.exports = class Api {
    static IV_LENGTH = 16;
    static KEY_LENGTH = 32;
    static BASE_SOLID_GATE_API_URI = 'https://pay.solidgate.com/api/v1/';

    /**
     * @param {string} publicKey
     * @param {string} secretKey
     * @param {string} [baseSolidGateUri=Api.BASE_SOLID_GATE_API_URI]
     */
    constructor(publicKey, secretKey, baseSolidGateUri = Api.BASE_SOLID_GATE_API_URI) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;
        this.baseSolidGateUri = baseSolidGateUri;
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-card-charge
     */
    charge(attributes) {
        return this._baseRequest('charge', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     */
    auth(attributes) {
        return this._baseRequest('auth', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-card-recurring
     */
    recurring(attributes) {
        return this._baseRequest('recurring', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/refund-card-order
     */
    refund(attributes) {
        return this._baseRequest('refund', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/get-status-card-order
     */
    status(attributes) {
        return this._baseRequest('status', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     */
    settle(attributes) {
        return this._baseRequest('settle', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     */
    void(attributes) {
        return this._baseRequest('void', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-card-resign
     */
    resign(attributes) {
        return this._baseRequest('resign', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/get-arn-codes
     */
    arnCode(attributes) {
        return this._baseRequest('arn-code', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-apple-pay
     */
    applePay(attributes) {
        return this._baseRequest('apple-pay', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-google-pay
     */
    googlePay(attributes) {
        return this._baseRequest('google-pay', attributes)
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {FormInitDTO}
     */
    formMerchantData(attributes) {
        let data = JSON.stringify(attributes);
        let payloadEncrypted = this._encryptPayload(data);

        return new FormInitDTO(payloadEncrypted, this.publicKey, this._generateSignature(payloadEncrypted));
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {FormUpdateDTO}
     */
    formUpdate(attributes) {
        if (attributes['order_id']) {
            console.warn('Deprecation warning: order_id update is forbidden')
        }

        let data = JSON.stringify(attributes);
        let payloadEncrypted = this._encryptPayload(data);

        return new FormUpdateDTO(payloadEncrypted, this._generateSignature(payloadEncrypted));
    }

    /**
     * @param {RequestAttributes} attributes
     * @returns {FormResignDTO}
     */
    formResign(attributes) {
        let data = JSON.stringify(attributes);
        let payloadEncrypted = this._encryptPayload(data);

        return new FormResignDTO(payloadEncrypted, this.publicKey, this._generateSignature(payloadEncrypted));
    }

    /**
     * @param {string} attributes
     * @returns {string}
     * @private
     */
    _encryptPayload(attributes) {
        let key = this.secretKey

        let iv = crypto.randomBytes(Api.IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', key.substr(0, Api.KEY_LENGTH), iv);
        let encrypted = cipher.update(attributes);

        encrypted = Buffer.concat([iv, encrypted, cipher.final()]);
        return encrypted.toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
    }

    /**
     * @param {string} path
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @private
     */
    _baseRequest(path, attributes) {
        let data = JSON.stringify(attributes);

        return new Promise(((resolve, reject) => {
            fetch(this.baseSolidGateUri + path, {
                method: 'POST',
                headers: {
                    'Merchant': this.publicKey,
                    'Signature': this._generateSignature(data),
                    'Content-Type': 'application/json'
                },
                body: data
            })
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        }));
    }

    /**
     * @param {string} attributes
     * @returns {string}
     * @private
     */
    _generateSignature(attributes) {
        var hashed = CryptoJS.HmacSHA512(this.publicKey + attributes + this.publicKey, this.secretKey);

        return Buffer.from(hashed.toString()).toString('base64')
    }
}
