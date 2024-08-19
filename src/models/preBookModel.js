class PreBook {
    constructor({ googleBookId }) {
        this.googleBookId = googleBookId || null;
    }

    static fromRequest(req) {
        const googleBookId = req.query.id;
        return new PreBook({ googleBookId });
    }
}

module.exports = PreBook;