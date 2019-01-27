/* global FormData localStorage document*/

import * as ArticlesModel from './articles';
import * as Outh from './authorization';

window.addEventListener('load', function() {

   let authFormBtn = document.querySelector('.authForm__btn');
   let loginForm = document.querySelector('.authForm');
   let errorsDiv = document.querySelector('.errors');
   let articleBtn = document.querySelector('.getAll');

   if(localStorage.getItem('token') !== null) showHello();

    authFormBtn.addEventListener('click', async () => {
        let formData = new FormData(loginForm);
        let response = await Outh.login(formData);

        if (response.res) {

            window.localStorage.setItem('token', response.token);
            window.localStorage.setItem('name', response.name);
            showHello();

        }
        else {
            errorsDiv.innerHTML = response.errors[0];
        }
    });

    articleBtn.addEventListener('click', async () => {

        let response = await ArticlesModel.all();

        if (response) {
            response.forEach((item) => {
                let newDiv = document.createElement('p');
                newDiv.innerHTML = item.title;
                document.querySelector('.list').appendChild(newDiv);

                newDiv.addEventListener('dblclick', async () => {

                    let id = item.id_article;
                    let response = await ArticlesModel.remove(id);

                    console.log(response);

                    if(response.res) {
                        newDiv.parentNode.removeChild(newDiv);
                    }
                    else {
                        errorsDiv.innerHTML = response.errors[0];
                    }
                });
            });
        }
        else {
            errorsDiv.innerHTML = response.errors[0];
        }
    });

    function showHello() {
        loginForm.innerHTML = `Hi, ${localStorage.getItem('name')}`;
    }
})





