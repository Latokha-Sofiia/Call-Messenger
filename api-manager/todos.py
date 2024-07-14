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
        'completed': True,
    },
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