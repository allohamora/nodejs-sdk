export = FormResignDTO;
declare class FormResignDTO {
    /**
     * @param {string} resignIntent
     * @param {string} merchant
     * @param {string} signature
     */
    constructor(resignIntent: string, merchant: string, signature: string);
    resignIntent: string;
    signature: string;
    merchant: string;
    getSignature(): string;
    getMerchant(): string;
    getResignIntent(): string;
    toObject(): {
        resignIntent: string;
        merchant: string;
        signature: string;
    };
}
