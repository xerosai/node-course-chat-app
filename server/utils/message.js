module.exports.generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: Date.now()
    }
};
