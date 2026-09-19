# ============================================================
# GENERAL APTITUDE QUESTIONS (20 Shared + 10 General-only)
# ============================================================

ALL_DEPARTMENTS = [
    "General",
    "SAP",
    "Python Full Stack",
    "Java Full Stack",
    "DA/DS/BA",
    "Embedded"
]

questions = [
    # --- 20 COMMON GENERAL APTITUDE QUESTIONS (Orders 1 - 20) ---
    {
        "order": 1,
        "question": "What is 15% of 200?",
        "options": ["20", "25", "30", "35"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 2,
        "question": "If a train travels at 60 km/h, how far will it travel in 2.5 hours?",
        "options": ["120 km", "140 km", "150 km", "160 km"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 3,
        "question": "If A can complete a work in 10 days and B in 15 days, how many days will they take working together?",
        "options": ["5 days", "6 days", "7.5 days", "8 days"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 4,
        "question": "A shopkeeper buys an item for ₹400 and sells it for ₹500. What is the profit percentage?",
        "options": ["20%", "25%", "30%", "15%"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 5,
        "question": "The ratio of two numbers is 3:5 and their sum is 80. What is the smaller number?",
        "options": ["24", "30", "32", "36"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 6,
        "question": "Find the simple interest on ₹5,000 at 6% per annum for 2 years.",
        "options": ["₹500", "₹550", "₹600", "₹650"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 7,
        "question": "The average of five numbers is 20. If one number is removed, the average becomes 18. What was the removed number?",
        "options": ["24", "26", "28", "30"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 8,
        "question": "Find the next number in the sequence: 3, 6, 12, 24, 48, ?",
        "options": ["72", "84", "96", "108"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 9,
        "question": "Find the next number in the sequence: 2, 5, 10, 17, 26, ?",
        "options": ["35", "37", "39", "41"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 10,
        "question": "If 'LIGHT' is coded as 'MTHIU', how is 'PLANT' coded following the same pattern?",
        "options": ["QMBOU", "QMBNU", "QNCPO", "QMANS"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 11,
        "question": "Pointing to a photograph, a man said: 'She is the daughter of my father's only son.' How is the girl related to the man?",
        "options": ["Sister", "Mother", "Daughter", "Niece"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 12,
        "question": "A person walks 10 meters North, turns right and walks 10 meters, then turns right and walks 10 meters. In which direction is he from the starting point?",
        "options": ["North", "East", "West", "South"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 13,
        "question": "Which word does NOT belong with the others?",
        "options": ["Inch", "Ounce", "Centimeter", "Yard"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 14,
        "question": "Choose the correct synonym for 'CANDID':",
        "options": ["Secretive", "Frank and honest", "Dishonest", "Fearful"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 15,
        "question": "Choose the correctly spelled word:",
        "options": ["Occurence", "Occurrence", "Occurrance", "Ocurrence"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 16,
        "question": "What is the primary function of RAM in a computer?",
        "options": [
            "Permanent data storage",
            "Temporary volatile storage for active processes",
            "Cooling the motherboard",
            "Power regulation"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 17,
        "question": "Which of the following is an Operating System?",
        "options": ["Linux", "Google Chrome", "Adobe Acrobat", "Oracle SQL"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 18,
        "question": "What does HTTP stand for?",
        "options": [
            "HyperText Transfer Protocol",
            "HighText Transmission Program",
            "HyperTransfer Terminal Protocol",
            "HomeText Translation Process"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 19,
        "question": "How many bits are there in 1 Byte?",
        "options": ["4", "8", "16", "32"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },
    {
        "order": 20,
        "question": "In a flowchart, which geometric symbol is used to represent a decision/condition?",
        "options": ["Rectangle", "Diamond", "Oval", "Parallelogram"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ALL_DEPARTMENTS
    },

    # --- 10 GENERAL DEPARTMENT SPECIFIC QUESTIONS (Orders 21 - 30) ---
    {
        "order": 21,
        "question": "Which planet is commonly known as the Red Planet?",
        "options": ["Venus", "Mars", "Jupiter", "Saturn"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 22,
        "question": "In how many ways can the letters of the word 'LEAD' be arranged?",
        "options": ["12", "16", "24", "48"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 23,
        "question": "What is the probability of getting an even number when rolling a standard six-sided die?",
        "options": ["1/6", "1/3", "1/2", "2/3"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 24,
        "question": "A clock shows 3:00. What is the angle between the hour hand and the minute hand?",
        "options": ["60 degrees", "75 degrees", "90 degrees", "120 degrees"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 25,
        "question": "Complete the analogy: Doctor : Hospital :: Teacher : ?",
        "options": ["Book", "School", "Student", "Pen"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 26,
        "question": "Which gas is most abundant in the Earth's atmosphere?",
        "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 27,
        "question": "Select the antonym for 'EXPAND':",
        "options": ["Enlarge", "Shrink", "Stretch", "Extend"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 28,
        "question": "Which of the following is a cybersecurity practice to prevent unauthorized access?",
        "options": [
            "Using simple birthdays as passwords",
            "Enabling Two-Factor Authentication (2FA)",
            "Disabling system firewalls",
            "Clicking unknown links in emails"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 29,
        "question": "If 12 pens cost ₹180, what is the cost of 7 pens?",
        "options": ["₹95", "₹100", "₹105", "₹110"],
        "correctIndex": 2,
        "marks": 1,
        "departments": ["General"]
    },
    {
        "order": 30,
        "question": "What is the primary unit of heredity in living organisms?",
        "options": ["Cell", "Gene", "Protein", "Tissue"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["General"]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)