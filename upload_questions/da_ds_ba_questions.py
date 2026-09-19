# ============================================================
# DA / DS / BA TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "Which SQL clause is used to aggregate data and summarize groups of rows?",
        "options": ["ORDER BY", "GROUP BY", "WHERE", "DISTINCT"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 22,
        "question": "Which SQL join returns all rows from the left table, and matched rows from the right table?",
        "options": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 23,
        "question": "Which Python library is the core standard for tabular data manipulation and DataFrame operations?",
        "options": ["Pandas", "Matplotlib", "Flask", "Scrapy"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 24,
        "question": "Which Python library provides fundamental support for large, multi-dimensional arrays and mathematical functions?",
        "options": ["NumPy", "Django", "BeautifulSoup", "PyPDF"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 25,
        "question": "Which measure of central tendency is least sensitive to extreme outliers in a skewed dataset?",
        "options": ["Mean", "Median", "Standard Deviation", "Variance"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 26,
        "question": "Which of the following is an example of a Supervised Machine Learning problem?",
        "options": [
            "Customer churn prediction with labeled historical data",
            "Customer market basket clustering without labels",
            "Dimensionality reduction with PCA",
            "Anomaly detection on unlabelled transactions"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 27,
        "question": "In classification model evaluation, what does a Confusion Matrix display?",
        "options": [
            "True Positives, False Positives, True Negatives, and False Negatives",
            "The memory usage of each database query",
            "The training execution speed per epoch",
            "The distribution of primary keys"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 28,
        "question": "In Business Analytics, what does the term KPI represent?",
        "options": [
            "Knowledge Programming Interface",
            "Key Performance Indicator",
            "Kernel Protocol Index",
            "Key Pricing Increment"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 29,
        "question": "Which chart type is best suited for showing the distribution and spread of continuous numerical data using quartiles?",
        "options": ["Pie chart", "Box plot (Box and Whisker)", "Donut chart", "Radar chart"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    },
    {
        "order": 30,
        "question": "Which of the following tools is an industry-standard Business Intelligence (BI) tool for interactive dashboards?",
        "options": ["Power BI / Tableau", "Git Bash", "Postman", "Notepad++"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["DA/DS/BA"]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)