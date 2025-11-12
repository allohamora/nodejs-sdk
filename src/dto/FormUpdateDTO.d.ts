export = FormUpdateDTO;
declare class FormUpdateDTO {
    /**
     * @param {string} partialIntent
     * @param {string} signature
     */
    constructor(partialIntent: string, signature: string);
    partialIntent: string;
    signature: string;
    getSignature(): string;
    getPartialIntent(): string;
    toObject(): {
        partialIntent: string;
        signature: string;
    };
}
