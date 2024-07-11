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
        'status': 'active',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Иван Иванов', 'Анна Петрова', 'Сергей Сергеев'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://kartinki.pics/pics/uploads/posts/2022-09/1662533607_2-kartinkin-net-p-kot-prikolnii-koti-2.jpg'
    },
    {
        'id': 5498415,
        'title': 'Согласование отчетности',
        'date': 'Сегодня, 13 марта 11:30 - 12:30',
        'status': 'planned',
        'organizer': 'Петров Виктор Михайлович',
        'responsible': 'Долгушина Юлия Александровна',
        'participants': ['Ольга Смирнова', 'Дмитрий Кузнецов', 'Мария Иванова'],
        'location': 'БЦ Сенатор, Конференц зал 1',
        'description': 'Задачи на груминг: Оценка качества вызовов и конференций Добавление пользователя UC в активную конференцию Ограничение функционала в конференции для гостей Deeplink для ссылок на конференцию на Desktop (Эпик) Возможность поставить любой смайл в реакциях на сообщении',
        'photo_url': 'https://sotni.ru/wp-content/uploads/2023/08/smeshnoi-kot-10.webp'
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
        'photo_url': 'https://cdn.leroymerlin.ru/lmru/image/upload/f_auto/q_auto/dpr_1.0/c_pad/w_1000/h_1000/v1694419671/lmcode/c6aPea29KUerazs_5KLArw/91313845_01.jpg'
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
