# ============================================================
# JAVA FULL STACK TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "Which method serves as the standard entry point for running any Java standalone application?",
        "options": [
            "public void main()",
            "static boolean run(String args)",
            "public static void main(String[] args)",
            "public abstract int start()"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 22,
        "question": "Which Java keyword is used to inherit properties and methods from a superclass?",
        "options": [
            "inherits",
            "super",
            "implements",
            "extends"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 23,
        "question": "What is the key difference between String `==` and String `.equals()` in Java?",
        "options": [
            "Both perform exact identical checks",
            "`==` is used for numbers, `.equals()` can only be used on primitives",
            "`.equals()` compares memory reference, while `==` compares contents",
            "`==` compares memory reference, while `.equals()` compares character contents"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 24,
        "question": "How does Java automatically manage memory deallocation for objects no longer in use?",
        "options": [
            "Operating system paging",
            "Garbage Collector (GC)",
            "Destructors in every class",
            "Manual `free()` statements"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 25,
        "question": "Which Java Collection interface stores unique elements and does not permit duplicates?",
        "options": [
            "Set",
            "ArrayList",
            "List",
            "Queue"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 26,
        "question": "In Spring Boot, which annotation is typically placed at the class level to create a RESTful controller returning JSON?",
        "options": [
            "@Repository",
            "@Service",
            "@RestController",
            "@Controller"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 27,
        "question": "What does the `final` keyword indicate when applied to a Java class?",
        "options": [
            "The class cannot be subclassed (inherited)",
            "The class will be deleted after execution",
            "The class contains only static methods",
            "The class cannot be instantiated"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 28,
        "question": "What does JPA stand for in Java enterprise database persistence?",
        "options": [
            "Joint Protocol Adapter",
            "Java Persistence API",
            "Java Program Application",
            "Java Process Automation"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 29,
        "question": "Which HTTP status code signifies that a resource was successfully created on the server?",
        "options": [
            "201 Created",
            "301 Moved",
            "204 No Content",
            "200 OK"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    },
    {
        "order": 30,
        "question": "Which build tool is widely used for dependency management and build automation in modern Java projects?",
        "options": [
            "Pip",
            "Maven / Gradle",
            "Webpack",
            "Composer"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Java Full Stack"
        ]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)
