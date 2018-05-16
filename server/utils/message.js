module.exports.generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: Date.now()
    }
};

module.exports.generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: Date.now()
    }
};
