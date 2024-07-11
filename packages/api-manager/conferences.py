from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

conferences = [
    {
        'id': 5498415,
        'title': 'Груминг UC',
        'date': '13 марта 11:30 - 12:30',
        'status': 'scheduled',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'blob:https://www.figma.com/05f61fbb-d243-40a9-9520-ca5c6d9ce8d3'
    },
    {
        'id': 5498415,
        'title': 'Согласование отчетности',
        'date': 'Сегодня, 13 марта 11:30 - 12:30',
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Ольга Смирнова', 'Дмитрий Кузнецов', 'Мария Иванова'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'http://example.com/photo2.jpg'
    },
    {
        'id': 5498415,
        'title': 'Запрос документов',
        'date': 'Вторник, 12 марта 10:00 - 11:30',
        'status': 'completed',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Алексей Сидоров', 'Татьяна Васильева', 'Николай Николаев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'blob:https://www.figma.com/05f61fbb-d243-40a9-9520-ca5c6d9ce8d3'
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
