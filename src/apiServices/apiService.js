import Utils from "../Utils/Utils";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

class Apiservices {

    static async getUserData() {
        return Utils.handleRequest(async () =>
            Utils.instance.get(`${BACKEND_URI}/user/profile`)
        );
    }
    static async registerUser(id, data) {
        return Utils.handleRequest(async () =>
            Utils.instance.post(`${BACKEND_URI}/user/register`, data)
        );
    }

}

export default Apiservices;