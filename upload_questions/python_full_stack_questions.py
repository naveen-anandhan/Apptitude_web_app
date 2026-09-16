questions = [

    {
        "question": "Which keyword is used to define a function in Python?",
        "options": [
            "function",
            "def",
            "fun",
            "define"
        ],
        "correctIndex": 1
    },

    {
        "question": "Which of the following is a Python data type?",
        "options": [
            "list",
            "integer",
            "float",
            "All of the above"
        ],
        "correctIndex": 3
    },

    {
        "question": "What is the output of print(2 + 3)?",
        "options": [
            "2",
            "3",
            "5",
            "6"
        ],
        "correctIndex": 2
    },

    {
        "question": "Which symbol is used to create a comment in Python?",
        "options": [
            "//",
            "#",
            "/*",
            "--"
        ],
        "correctIndex": 1
    },

    {
        "question": "Which function is used to display output in Python?",
        "options": [
            "display()",
            "output()",
            "print()",
            "show()"
        ],
        "correctIndex": 2
    }

]


# Upload these questions to Firestore
from upload import upload_questions

upload_questions(
    questions,
    "Python Full Stack"
)