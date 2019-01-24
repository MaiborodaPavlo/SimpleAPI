# SimpleAPI

К каждому запросу необходимо добавить заголовок Autorization.

Описание API:

    GET articles.php -> все статьи в виде массива
	
    GET articles.php?id=int -> одна статья в виде объекта || 404
	
    DELETE articles.php?id=int  -> true || false, если статья не найдена
	
    POST articles.php -> {res: true, id: int} || {res: false, errors: [strings...]} ошибка валидации
			body-formData(title, content) 
	
    PUT articles.php -> {res: true} || {res: false, errors: [strings...]} ошибка валидации
			body-json(id, title, content)
			
Валидация предельно простая, title и content должны быть заполнены.

Для тестирования данных ситуаций, попробуйте добавить статью с пустым title или удалить его при редактировании.
