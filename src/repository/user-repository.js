const { User } = require('../models/index');

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at the repo level");
            throw error;
        }
    }

    async destroy(userId){
        try {
            await user.destroy({
                where:{
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong at the repo level");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id'] //this will help us fetch only these two values not the whole object
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;