/* global fetch FormData */

import authorization from './authorization';

export async function all(){
    let data = await makeRequest('/js-hw-api/articles.php');
    return data;
}

export async function one(id){
    let data = await makeRequest(`/js-hw-api/articles.php?id=${id}`);
    return data;
}

export async function remove(id){
    let data = await makeRequest(`/js-hw-api/articles.php?id=${id}`, {
        method: 'DELETE'
    });
    if (data === true) return data;
    else throw new Error('статья не найдена');
}

export async function add(article){
    let formData = new FormData();

    for(let name in article){
        formData.append(name, article[name]);
    }

    let data = await makeRequest('/js-hw-api/articles.php', {
        method: 'POST',
        body: formData
    });

    if (data.res) return data.id;
    else throw new Error(data.errors[0]);
}

export async function edit(id, article){
    let forServer = {
        ...article,
        id
    };

    let data = await makeRequest('/js-hw-api/articles.php', {
        method: 'PUT',
        body: JSON.stringify(forServer)
    });

    if (data.res) return data.res;
    else throw new Error(data.errors);
}

function makeRequest(url, options = {}){

    Object.assign(options, authorization);

    return fetch(url, options).then((response) => {

        if(response.status !== 200){
            return response.text().then((text) => {
                throw new Error(text);
            })
        }

        return response.json();
    });
}