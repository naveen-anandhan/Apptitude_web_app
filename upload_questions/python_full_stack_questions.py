# ============================================================
# PYTHON FULL STACK TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
            "fun",
            "define",
            "def",
            "function"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 22,
        "question": "Which of the following data structures in Python is immutable?",
        "options": [
            "Set",
            "Tuple",
            "Dictionary",
            "List"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 23,
        "question": "What will be the output of `[x * 2 for x in [1, 2, 3]]`?",
        "options": [
            "[2, 4, 6]",
            "[1, 2, 3, 1, 2, 3]",
            "Error",
            "[1, 4, 9]"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 24,
        "question": "What is the primary role of the `self` parameter in a Python class method?",
        "options": [
            "Import global variables",
            "Creates a static method variable",
            "Refers to the current instance of the class",
            "Refers to the parent class"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 25,
        "question": "Which keywords are used in Python for structured exception handling?",
        "options": [
            "test / fail",
            "try / except",
            "do / rescue",
            "try / catch"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 26,
        "question": "Which widely used Python web framework follows the 'Batteries Included' philosophy with built-in ORM and Admin UI?",
        "options": [
            "Django",
            "Flask",
            "Bottle",
            "FastAPI"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 27,
        "question": "What is the average time complexity for key lookup in a standard Python dictionary?",
        "options": [
            "O(n^2)",
            "O(n)",
            "O(log n)",
            "O(1)"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 28,
        "question": "In a Full Stack web application, which HTTP method is typically used to update an existing resource idempotently?",
        "options": [
            "GET",
            "PUT",
            "DELETE",
            "POST"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 29,
        "question": "What is the purpose of Python's `virtualenv` / `venv` module?",
        "options": [
            "To run virtual machines for Windows inside Linux",
            "To encrypt source code files",
            "To compile Python into WebAssembly",
            "To isolate project-specific Python dependencies and packages"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    },
    {
        "order": 30,
        "question": "In JavaScript frontend development, which method allows selecting a DOM element using a CSS selector?",
        "options": [
            "document.querySelector()",
            "document.getElementByIdOnly()",
            "window.findSelector()",
            "browser.getDOM()"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Python Full Stack"
        ]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)
