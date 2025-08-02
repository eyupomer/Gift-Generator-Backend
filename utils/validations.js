// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate email format
const isValidEmail = (email) => {
    return emailRegex.test(email);
};

// Validate password strength
const isValidPassword = (password) => {
    return password && password.length >= 8;
}

module.exports = {
    emailRegex,
    isValidEmail,
    isValidPassword,
}