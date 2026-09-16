questions = [

    {
        "question": "Which method is used to remove and return the last element from a list?",
        "options": [
            "remove()",
            "delete()",
            "pop()",
            "discard()"
        ],
        "correctIndex": 2,
        "departments": [
            "Python Full Stack",
            "DA/DS/BA"
        ]
    },

    {
        "question": "What is self in Python?",
        "options": [
            "Class name",
            "Reference to the current object",
            "Parent class",
            "Constructor"
        ],
        "correctIndex": 1,
        "departments": [
            "Python Full Stack",
            "DA/DS/BA"
        ]
    },

    {
        "question": "What is method overriding?",
        "options": [
            "Creating multiple classes",
            "Child class providing its own implementation of a parent method",
            "Creating multiple objects",
            "Hiding variables"
        ],
        "correctIndex": 1,
        "departments": [
            "Python Full Stack",
            "DA/DS/BA"
        ]
    }

]


from upload import upload_questions

upload_questions(questions)