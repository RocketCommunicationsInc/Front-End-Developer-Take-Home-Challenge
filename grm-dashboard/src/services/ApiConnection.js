import data from "../../../data.json";
class ApiConnection {
    async getContacts() {
        //here we simulate some network delay of 1s
        return new Promise((resolve) => {
            setTimeout(() => {
                const responseData = {
                    data: data
                };
                resolve(responseData);
            }, 1000)
        })

    }

    updateAlert(alert) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });

    }

}

export default ApiConnection;