module.exports = class FormResignDTO {
    /**
     * @param {string} resignIntent 
     * @param {string} merchant 
     * @param {string} signature 
     */
    constructor(resignIntent, merchant, signature) {
        this.resignIntent = resignIntent
        this.signature = signature
        this.merchant = merchant
    }

    getSignature() {
        return this.signature
    }

    getMerchant() {
        return this.merchant
    }

    getResignIntent() {
        return this.resignIntent
    }

    toObject() {
        return {
            'resignIntent': this.getResignIntent(),
            'merchant': this.getMerchant(),
            'signature': this.getSignature()
        }
    }
}
