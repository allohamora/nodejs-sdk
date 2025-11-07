module.exports = class FormUpdateDTO {
    /**
     * @param {string} partialIntent 
     * @param {string} signature
     */
    constructor(partialIntent, signature) {
        this.partialIntent = partialIntent
        this.signature = signature
    }

    getSignature() {
        return this.signature
    }

    getPartialIntent() {
        return this.partialIntent
    }

    toObject() {
        return {
            'partialIntent': this.getPartialIntent(),
            'signature': this.getSignature()
        }
    }
}
