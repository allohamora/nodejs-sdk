export = Api;
declare class Api {
    static IV_LENGTH: number;
    static KEY_LENGTH: number;
    static BASE_SOLID_GATE_API_URI: string;
    /**
     * @param {string} publicKey
     * @param {string} secretKey
     * @param {string} [baseSolidGateUri=Api.BASE_SOLID_GATE_API_URI]
     */
    constructor(publicKey: string, secretKey: string, baseSolidGateUri?: string);
    publicKey: string;
    secretKey: string;
    baseSolidGateUri: string;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-card-charge
     */
    charge(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     */
    auth(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-card-recurring
     */
    recurring(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/refund-card-order
     */
    refund(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/get-status-card-order
     */
    status(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     */
    settle(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     */
    void(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-card-resign
     */
    resign(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/get-arn-codes
     */
    arnCode(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-apple-pay
     */
    applePay(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @see https://api-docs.solidgate.com/#tag/Card-payments/operation/make-google-pay
     */
    googlePay(attributes: RequestAttributes): Promise<ResponseData>;
    /**
     * @param {RequestAttributes} attributes
     * @returns {FormInitDTO}
     */
    formMerchantData(attributes: RequestAttributes): FormInitDTO;
    /**
     * @param {RequestAttributes} attributes
     * @returns {FormUpdateDTO}
     */
    formUpdate(attributes: RequestAttributes): FormUpdateDTO;
    /**
     * @param {RequestAttributes} attributes
     * @returns {FormResignDTO}
     */
    formResign(attributes: RequestAttributes): FormResignDTO;
    /**
     * @param {string} attributes
     * @returns {string}
     * @private
     */
    private _encryptPayload;
    /**
     * @param {string} path
     * @param {RequestAttributes} attributes
     * @returns {Promise<ResponseData>}
     * @private
     */
    private _baseRequest;
    /**
     * @param {string} attributes
     * @returns {string}
     * @private
     */
    private _generateSignature;
}
declare namespace Api {
    export { RequestAttributes, ResponseData };
}
import FormInitDTO = require("./dto/FormInitDTO");
import FormUpdateDTO = require("./dto/FormUpdateDTO");
import FormResignDTO = require("./dto/FormResignDTO");
type RequestAttributes = Record<string, unknown>;
type ResponseData = Record<string, unknown>;
