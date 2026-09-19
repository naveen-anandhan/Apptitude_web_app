# ============================================================
# SAP TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "What does SAP stand for?",
        "options": [
            "System Application and Products",
            "Systems, Applications and Products in Data Processing",
            "Software Application Program",
            "System Analysis Program"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 22,
        "question": "Which SAP module is primarily responsible for Financial Accounting?",
        "options": ["FI", "MM", "SD", "PP"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 23,
        "question": "Which SAP module manages purchasing, inventory management, and invoice verification?",
        "options": ["SD", "MM", "CO", "QM"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 24,
        "question": "Which SAP module covers customer order processing, shipping, and billing?",
        "options": ["SD", "MM", "PM", "PS"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 25,
        "question": "What is SAP HANA primarily characterized as?",
        "options": [
            "An operating system for mainframes",
            "An in-memory, column-oriented relational database management system",
            "A web design framework",
            "An email client application"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 26,
        "question": "What is the primary purpose of a Transaction Code (T-Code) in SAP GUI?",
        "options": [
            "A keyboard shortcut to navigate directly to an application screen or task",
            "A password reset code for users",
            "An encrypted database license key",
            "A barcode scanner setting"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 27,
        "question": "What programming language is predominantly used to develop business applications within the SAP environment?",
        "options": ["Python", "ABAP", "C#", "Swift"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 28,
        "question": "In SAP, what does the ERP acronym represent?",
        "options": [
            "Electronic Record Processing",
            "Enterprise Resource Planning",
            "Entity Relationship Protocol",
            "Extensible Reporting Platform"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 29,
        "question": "Which SAP module is designed for controlling internal cost and managerial reporting?",
        "options": ["FI", "CO", "HR", "SD"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["SAP"]
    },
    {
        "order": 30,
        "question": "What is the organizational level in SAP representing an independent legal accounting entity?",
        "options": ["Plant", "Company Code", "Sales Organization", "Storage Location"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["SAP"]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)