import server from "./server";

export async function login(formData) {
    // let formData = new FormData();
    // formData.append('login', '9e87bdf7c479f614075de38ca044952d');
    // formData.append('password', '12345');

    let response = await server.post('auth.php', formData);

    return response.data;
}