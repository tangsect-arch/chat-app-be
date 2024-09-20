const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
        return "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.";
    }
    return null; 
};
  

export default validatePassword;
