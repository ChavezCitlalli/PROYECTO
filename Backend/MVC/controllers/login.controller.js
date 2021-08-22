const LoginService = require("../services/login.services");


const loginService = new LoginService();


class LoginController {

    async login({data}) {
        const { email, pass } = data;
        try{
            const userAndToken = await loginService.login({ email, pass });
            return (userAndToken);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el aministrador'
            });
        }
    }




};

module.exports = LoginController;
