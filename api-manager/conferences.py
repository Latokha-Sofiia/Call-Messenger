from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

conferences = [
    {
        'id': 1,
        'title': 'Великий квест по отлову багов',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://avatars.dzeninfra.ru/get-zen_doc/9368420/pub_645160204581986bf45fd8f0_645161aef6bdac56bebef2dd/scale_1200'
    },
    {
        'id': 2,
        'title': 'Git-арены: Сражения за лучший коммит',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://koshka-pushinka.ru/wp-content/uploads/2020/05/Cats_Kim_Haskins-40.jpg'
    },
    {
        'id': 3,
        'title': 'Веб-войны: Противостояние фреймворков',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://avatars.dzeninfra.ru/get-zen_doc/8269145/pub_645160204581986bf45fd8f0_645161c96bdf6b3113ca0290/scale_1200'
    },
    {
        'id': 4,
        'title': 'Фронтенд-фиеста: Танцы с CSS и хороводы с JavaScript',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://cs10.pikabu.ru/post_img/2019/07/15/10/1563206916182352805.jpg'
    },
    {
        'id': 5,
        'title': 'API-коллаж: Художественная мастерская интеграци',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://svistanet.com/wp-content/uploads/2020/03/xudozhnik_Kim_Haskins_02.jpg'
    },
    {
        'id': 6,
        'title': 'Docker-диско: Пляски с контейнерами',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://cdn.fishki.net/upload/post/2019/12/24/3180409/kim-haskins-16.jpg'
    },
    {
        'id': 7,
        'title': 'Кубер-кабаре: Вечеринки в облаке',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnez6sABIC7urakYLh-tovHQ8Bqu6Z2Dphea0Bzm10Wt2H85utvc1847zmjwro-98wkk&usqp=CAU'
    },
    {
        'id': 8,
        'title': 'React-ревю: Шоу компонентов и хуков',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://i.pinimg.com/originals/07/98/11/07981103739b321641ff8f2fa6133ab6.jpg'
    },
    {
        'id': 9,
        'title': 'Angular Арена: Турнир мастеров модулей',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGbUBa3sC0Z6_kLpT3bBsnRQ5pH3pXs18-w&s'
    },
    {
        'id': 10,
        'title': 'CSS-сабантуй',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://cp16.nevsepic.com.ua/post/25/702_files/kim-haskins-24.jpg'
    },
    {
        'id': 11,
        'title': 'Webpack-вечеринка',
        'date': '13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://ic.pics.livejournal.com/sarycheva_s/35611824/3513539/3513539_600.jpg'
    },
    {
        'id': 12,
        'title': 'Дейли',
        'date': '14 марта 12:30 - 14:00',
        'status': 'active',
        'organizer': 'Репьева Ксения',
        'responsible': 'Альбина',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'НГУ',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGprGzUQkEIaC6fn-Ru5vtJN6vuMTadlBzNw&s'
    },
    {
        'id': 13,
        'title': 'Код-Кофе-Брейк',
        'date': '16 марта 13:30 - 16:30',
        'status': 'active',
        'organizer': 'Инютина Олеся сергеевна',
        'responsible': 'Тальяна Сергеевна Инютина',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'Зал 3',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78f4HeuvHaQpdmkkKpwi5ej_VTAlwAjI1DB9kt7lYBIyjBEIoVTwnn9pAWMe82anPo6g&usqp=CAU'
    },
    {
        'id': 14,
        'title': 'Собесосник',
        'date': '15 марта 17:30 - 18:30',
        'status': 'active',
        'organizer': 'Лоло',
        'responsible': 'Елизаветта Максимовна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'НГУ',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://uc.lolkot.ru/picture/57188-35930-4.jpg'
    },
    {
        'id': 15,
        'title': 'React-раунд: Компонентные коллоквиумы',
        'date': 'Сегодня, 13 марта 11:30 - 12:30',
        'status': 'planned',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Ольга Смирнова', 'Дмитрий Кузнецов', 'Мария Иванова'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9l6A3JRmhIJDCOwE92Uq7SPWS1E-VxnbTbg&s'
    },
    {
        'id': 16,
        'title': 'PWA-посиделки: Оффлайн обсуждения',
        'date': '13 марта 11:30 - 12:30',
        'status': 'planned',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://cdn.fishki.net/upload/post/2019/12/24/3180409/kim-haskins-16.jpg'
    },
    {
        'id': 17,
        'title': 'TypeScript-тусовка: Типизированные разговоры',
        'date': '13 марта 11:30 - 12:30',
        'status': 'planned',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnez6sABIC7urakYLh-tovHQ8Bqu6Z2Dphea0Bzm10Wt2H85utvc1847zmjwro-98wkk&usqp=CAU'
    },
    {
        'id': 18,
        'title': 'Webpack-вайб: собираемся по сети',
        'date': '13 марта 11:30 - 12:30',
        'status': 'planned',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://i.pinimg.com/originals/07/98/11/07981103739b321641ff8f2fa6133ab6.jpg'
    },
    {
        'id': 19,
        'title': 'CSS Comedy Club',
        'date': '13 марта 11:30 - 12:30',
        'status': 'planned',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGbUBa3sC0Z6_kLpT3bBsnRQ5pH3pXs18-w&s'
    },
    {
        'id': 20,
        'title': 'Запрос документов',
        'date': 'Вторник, 12 марта 10:00 - 11:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Алексей Сидоров', 'Татьяна Васильева', 'Николай Николаев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToVjOiaHNfzigkLR8c2Ik0GeruHnIiyFe8cQ&s'
    },
    {
        'id': 21,
        'title': 'ES6 Шутка',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://cdn.fishki.net/upload/post/2019/12/24/3180409/kim-haskins-16.jpg'
    },
    {
        'id': 22,
        'title': 'Vue-тус',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnez6sABIC7urakYLh-tovHQ8Bqu6Z2Dphea0Bzm10Wt2H85utvc1847zmjwro-98wkk&usqp=CAU'
    },
    {
        'id': 23,
        'title': 'Груминг UC',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://i.pinimg.com/originals/07/98/11/07981103739b321641ff8f2fa6133ab6.jpg'
    },
    {
        'id': 24,
        'title': 'Флекс-флешмоб',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGbUBa3sC0Z6_kLpT3bBsnRQ5pH3pXs18-w&s'
    },
    {
        'id': 25,
        'title': 'Баг-фест 2024: Великий квест по отлову багов',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://cdn.fishki.net/upload/post/2019/12/24/3180409/kim-haskins-16.jpg'
    },
    {
        'id': 26,
        'title': 'Git-арены: Сражения за лучший коммит',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnez6sABIC7urakYLh-tovHQ8Bqu6Z2Dphea0Bzm10Wt2H85utvc1847zmjwro-98wkk&usqp=CAU'
    },
    {
        'id': 27,
        'title': 'Питон-пати: Танцы с питоном и не только',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://i.pinimg.com/originals/07/98/11/07981103739b321641ff8f2fa6133ab6.jpg'
    },
    {
        'id': 28,
        'title': 'Битвы в бэкенде: Эпическое противостояние серверов',
        'date': '13 марта 11:30 - 12:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGbUBa3sC0Z6_kLpT3bBsnRQ5pH3pXs18-w&s'
    }
]

@app.route('/conferences', methods=['GET'])
def get_conferences():
    page_size = int(request.args.get('pageSize', 10))
    tag = request.args.get('tag')

    start_index = 0
    if tag:
        start_index = next((i for i, conference in enumerate(conferences) if str(conference['id']) == tag), len(conferences))

    paginated_conferences = conferences[start_index:start_index + page_size]
    next_tag = None
    if len(conferences) > start_index + page_size:
        next_tag = str(conferences[start_index + page_size]['id'])

    response = {
        'conferences': paginated_conferences,
        'tag': next_tag
    }
    return jsonify(response)

@app.route('/conferences', methods=['POST'])
@cross_origin()
def create_conference():
    new_conference = {
        'id': str(int(time.time())),
        'title': request.json['title'],
        'date': time.strftime("%d %B %Y %H:%M", time.localtime()),
        'status': 'active',
        'organizer': request.json['organizer'],
        'responsible': request.json['responsible'],
        'participants': request.json['participants'],
        'location': request.json['location'],
        'description': request.json['description'],
        'photo_url': request.json['photo_url']
    }
    conferences.append(new_conference)

    response = jsonify(new_conference)
    return response

@app.route('/conferences', methods=['DELETE'])
@cross_origin()
def delete_conference():
    id = request.args.get('id')
    global conferences
    conferences = [conference for conference in conferences if str(conference['id']) != id]
    return jsonify(conferences)


@app.route('/conferences', methods=['PATCH'])
@cross_origin()
def update_conference():
    id = request.args.get('id')
    updated_conference = None
    for conference in conferences:
        if str(conference['id']) == id:
            for key in request.json:
                conference[key] = request.json[key]
            updated_conference = conference
            break
    return jsonify(updated_conference)


if __name__ == '__main__':
    app.run()