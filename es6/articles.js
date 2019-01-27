import server from './server';

export async function all(){

    let response = await server.get('articles.php');

    return response.data;
}

export async function remove(id){

    let response = await server.delete(`/articles.php`, {
        id
    });

    return response.data;
}