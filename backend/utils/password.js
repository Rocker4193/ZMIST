import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = (password) => {
    return new Promise((resolve) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash)
            }
        });
    });
};

const comparePassword = (password, hashedPassword) => {
    return new Promise((resolve) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
};

export {
    hashPassword,
    comparePassword,
};
