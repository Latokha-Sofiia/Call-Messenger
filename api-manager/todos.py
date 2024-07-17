from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = app.test_client()

todos = [
    {
        'id': 1,
        'title': 'Купить дом',
        'completed': False,
    },
    {
        'id': 2,
        'title': 'Покормить Харитона',
        'completed': True,
    },
    {
        'id': 3,
        'title': 'Купить сверчков',
        'completed': True,
    },
    {
        'id': 4,
        'title': 'Поступить в НГУ на бюджет',
        'completed': True,
    },
    {
        'id': 5,
        'title': 'Закончить ВУЗ с красным дипломом',
        'completed': False,
    },
    {
        'id': 6,
        'title': 'Пройти практику',
        'completed': False,
    },
    {
        'id': 7,
        'title': 'Купить машину',
        'completed': False,
    },
    {
        'id': 8,
        'title': 'Пройти Baldurs Gate III',
        'completed': False,
    },
    {
        'id': 9,
        'title': 'Разрисовать шкафы',
        'completed': False,
    },
    {
        'id': 10,
        'title': 'Купить гирляндочки',
        'completed': False,
    },
    {
        'id': 11,
        'title': 'Поиграть с ящерицами',
        'completed': False,
    },
    {
        'id': 12,
        'title': 'Покормить дурынд',
        'completed': False,
    },
    {
        'id': 13,
        'title': 'Прочитать книку "Чистый код"',
        'completed': False,
    },
    {
        'id': 14,
        'title': 'Прочитать книгу "Атомные привычки"',
        'completed': False,
    },
    {
        'id': 15,
        'title': 'Слетать на Мальдивы',
        'completed': False,
    },
    {
        'id': 16,
        'title': 'Побывать в Дубае',
        'completed': False,
    },
    {
        'id': 17,
        'title': 'Закончить наконец уже этот ВУЗ наконец',
        'completed': False,
    },
    {
        'id': 18,
        'title': 'Погладить кота',
        'completed': False,
    },
    {
        'id': 19,
        'title': 'Сыграть в УНО',
        'completed': False,
    },
    {
        'id': 20,
        'title': 'Нарисовать автопортрет',
        'completed': False,
    },
    {
        'id': 21,
        'title': 'Поиграть с Харитонятами',
        'completed': False,
    },
    {
        'id': 22,
        'title': 'Слетать в Алдан',
        'completed': False,
    },
    {
        'id': 23,
        'title': 'Родиться на Аляске',
        'completed': False,
    },
    {
        'id': 24,
        'title': 'Завести эублефара Black Night',
        'completed': False,
    },
    {
        'id': 25,
        'title': 'Прыгнуть с парашутом',
        'completed': False,
    },
    {
        'id': 26,
        'title': 'Покататься на мотоцикле',
        'completed': False,
    },
    {
        'id': 27,
        'title': 'Порисовать на природе',
        'completed': False,
    },
    {
        'id': 28,
        'title': 'Еще раз погладить кота',
        'completed': False,
    },
    {
        'id': 29,
        'title': 'Завести Хаски',
        'completed': False,
    },
    {
        'id': 30,
        'title': 'Иметь собственную библиотеку',
        'completed': False,
    },
    {
        'id': 31,
        'title': 'Еще раз покормить Харитонят',
        'completed': False,
    },
    {
        'id': 32,
        'title': 'Идеи для туду заканчиваются...',
        'completed': False,
    },
    {
        'id': 33,
        'title': 'Сесть зайцем в ракету, посадить розу на луне и объявить себя маленьким принцом',
        'completed': False,
    },
    {
        'id': 34,
        'title': 'Покрасить волосы в блонд',
        'completed': False,
    },
    {
        'id': 35,
        'title': 'Перекрасить волосы из блонда в розовый',
        'completed': False,
    },
    {
        'id': 36,
        'title': 'Идеи совсем закончились...',
        'completed': False,
    },
    {
        'id': 37,
        'title': 'Но пагинацию проверить надо',
        'completed': False,
    },
    {
        'id': 38,
        'title': 'Поэтому песня...',
        'completed': False,
    },
    {
        'id': 39,
        'title': 'Тёмный мрачный коридор',
        'completed': False,
    },
    {
        'id': 40,
        'title': 'Я на ципочках как вор',
        'completed': False,
    },
    {
        'id': 41,
        'title': 'Пробираюсь чуть дыша',
        'completed': False,
    },
    {
        'id': 42,
        'title': 'Чтобы не спугнуть',
        'completed': False,
    },
    {
        'id': 43,
        'title': 'Тех, кто спит уже давно',
        'completed': False,
    },
    {
        'id': 44,
        'title': 'Тех, кому не всё равно',
        'completed': False,
    },
    {
        'id': 45,
        'title': 'В чью я комнату тайком',
        'completed': False,
    },
    {
        'id': 46,
        'title': 'Желаю заглянуть',
        'completed': False,
    },
    {
        'id': 47,
        'title': 'Чтобы увидеть...',
        'completed': False,
    },
    {
        'id': 48,
        'title': 'Как бессонница в час ночной',
        'completed': False,
    },
    {
        'id': 49,
        'title': 'Меняет, нелюдимая, облик твой',
        'completed': False,
    },
    {
        'id': 50,
        'title': 'Чьих невольница ты идей?',
        'completed': False,
    },
    {
        'id': 51,
        'title': 'Зачем тебе охотиться на людей?',
        'completed': False,
    }
]


@app.route('/todos', methods=['GET'])
@cross_origin()
def get_todos():
    page_size = int(request.args.get('pageSize', 30))
    tag = request.args.get('tag')

    start_index = 0
    if tag:
        start_index = next((i for i, todo in enumerate(todos) if str(todo['id']) == tag), len(todos))

    paginated_todos = todos[start_index:start_index + page_size]
    next_tag = None
    if len(todos) > start_index + page_size:
        next_tag = str(todos[start_index + page_size]['id'])

    response = {
        'todos': paginated_todos,
        'tag': next_tag
    }
    return jsonify(response)

@app.route('/todos', methods=['POST'])
@cross_origin()
def create_todos():
    new_todo = {
        'id': str(time.time()),
        'title': request.json['title'],
        'completed': False
    }
    todos.append(new_todo)

    response = jsonify([new_todo])
    return response

@app.route('/todos', methods=['DELETE'])
@cross_origin()
def delete_todo():
    id = request.args.get('id')
    global todos
    todos = [todo for todo in todos if str(todo['id']) != id]
    return jsonify(todos)

@app.route('/todos', methods=['PATCH'])
@cross_origin()
def complete_todo():
    id = request.args.get('id')
    updated_todo = None
    for todo in todos:
        if str(todo['id']) == id:
            todo['completed'] = not todo['completed']
            updated_todo = todo
            break
    return jsonify(updated_todo)

if __name__ == '__main__':
    app.run()