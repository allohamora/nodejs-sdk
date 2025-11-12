export = FormInitDTO;
declare class FormInitDTO {
    /**
     * @param {string} paymentIntent
     * @param {string} merchant
     * @param {string} signature
     */
    constructor(paymentIntent: string, merchant: string, signature: string);
    paymentIntent: string;
    signature: string;
    merchant: string;
    getSignature(): string;
    getMerchant(): string;
    getPaymentIntent(): string;
    toObject(): {
        paymentIntent: string;
        merchant: string;
        signature: string;
    };
}
