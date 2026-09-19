# ============================================================
# PYTHON FULL STACK TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "Which keyword is used to define a function in Python?",
        "options": ["function", "def", "fun", "define"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 22,
        "question": "Which of the following data structures in Python is immutable?",
        "options": ["List", "Dictionary", "Tuple", "Set"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 23,
        "question": "What will be the output of `[x * 2 for x in [1, 2, 3]]`?",
        "options": ["[1, 2, 3, 1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "Error"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 24,
        "question": "What is the primary role of the `self` parameter in a Python class method?",
        "options": [
            "Refers to the current instance of the class",
            "Refers to the parent class",
            "Creates a static method variable",
            "Import global variables"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 25,
        "question": "Which keywords are used in Python for structured exception handling?",
        "options": ["try / catch", "try / except", "do / rescue", "test / fail"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 26,
        "question": "Which widely used Python web framework follows the 'Batteries Included' philosophy with built-in ORM and Admin UI?",
        "options": ["Flask", "Django", "FastAPI", "Bottle"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 27,
        "question": "What is the average time complexity for key lookup in a standard Python dictionary?",
        "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 28,
        "question": "In a Full Stack web application, which HTTP method is typically used to update an existing resource idempotently?",
        "options": ["GET", "POST", "PUT", "DELETE"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 29,
        "question": "What is the purpose of Python's `virtualenv` / `venv` module?",
        "options": [
            "To run virtual machines for Windows inside Linux",
            "To isolate project-specific Python dependencies and packages",
            "To compile Python into WebAssembly",
            "To encrypt source code files"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Python Full Stack"]
    },
    {
        "order": 30,
        "question": "In JavaScript frontend development, which method allows selecting a DOM element using a CSS selector?",
        "options": [
            "document.getElementByIdOnly()",
            "document.querySelector()",
            "window.findSelector()",
            "browser.getDOM()"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Python Full Stack"]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)