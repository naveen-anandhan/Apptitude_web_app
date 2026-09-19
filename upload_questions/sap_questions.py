# ============================================================
# SAP TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "What does SAP stand for?",
        "options": [
            "Systems, Applications and Products in Data Processing",
            "System Analysis Program",
            "System Application and Products",
            "Software Application Program"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 22,
        "question": "Which SAP module is primarily responsible for Financial Accounting?",
        "options": [
            "FI",
            "PP",
            "SD",
            "MM"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 23,
        "question": "Which SAP module manages purchasing, inventory management, and invoice verification?",
        "options": [
            "SD",
            "CO",
            "QM",
            "MM"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 24,
        "question": "Which SAP module covers customer order processing, shipping, and billing?",
        "options": [
            "PM",
            "PS",
            "MM",
            "SD"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 25,
        "question": "What is SAP HANA primarily characterized as?",
        "options": [
            "An operating system for mainframes",
            "An in-memory, column-oriented relational database management system",
            "An email client application",
            "A web design framework"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 26,
        "question": "What is the primary purpose of a Transaction Code (T-Code) in SAP GUI?",
        "options": [
            "A keyboard shortcut to navigate directly to an application screen or task",
            "A password reset code for users",
            "A barcode scanner setting",
            "An encrypted database license key"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 27,
        "question": "What programming language is predominantly used to develop business applications within the SAP environment?",
        "options": [
            "Python",
            "C#",
            "ABAP",
            "Swift"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 28,
        "question": "In SAP, what does the ERP acronym represent?",
        "options": [
            "Extensible Reporting Platform",
            "Enterprise Resource Planning",
            "Electronic Record Processing",
            "Entity Relationship Protocol"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 29,
        "question": "Which SAP module is designed for controlling internal cost and managerial reporting?",
        "options": [
            "SD",
            "CO",
            "FI",
            "HR"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    },
    {
        "order": 30,
        "question": "What is the organizational level in SAP representing an independent legal accounting entity?",
        "options": [
            "Plant",
            "Storage Location",
            "Company Code",
            "Sales Organization"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "SAP"
        ]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)
