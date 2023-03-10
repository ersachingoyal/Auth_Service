const jwt = require('jsonwebtoken')
const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt')

const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong at the service level");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'}); //jwt key is the secret key it requires, and expiresin is the time after which the token will expire
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step 2-> compare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            if(error.name == 'AttributeNotFound'){
                throw error;
            }
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = await this.verifyToken(token); //this will give an object having user details if everyhting goes well
            if(!response){
                throw {error: "Invalid Token"};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error : "No user with the corresponding token exists"}; //user might have deleted the account after token creation but the token is still valid
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    // on sigin we user will send plain password, but we are storing the encrypted password in our db , so we need decrypt that
    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }
}

module.exports = UserService;