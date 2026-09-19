# ============================================================
# JAVA FULL STACK TECHNICAL QUESTIONS (10 Questions: Order 21-30)
# ============================================================

DEPARTMENT = "Java Full Stack"

questions = [
    {
        "order": 21,
        "question": "Which method serves as the standard entry point for running any Java standalone application?",
        "options": [
            "public void main()",
            "static boolean run(String args)",
            "public abstract int start()",
            "public static void main(String[] args)",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 22,
        "question": "Which Java keyword is used to inherit properties and methods from a superclass?",
        "options": [
            "implements",
            "extends",
            "inherits",
            "super",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 23,
        "question": "What is the key difference between String `==` and String `.equals()` in Java?",
        "options": [
            "`==` is used for numbers, `.equals()` can only be used on primitives",
            "`.equals()` compares memory reference, while `==` compares contents",
            "`==` compares memory reference, while `.equals()` compares character contents",
            "Both perform exact identical checks",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 24,
        "question": "How does Java automatically manage memory deallocation for objects no longer in use?",
        "options": [
            "Manual `free()` statements",
            "Destructors in every class",
            "Operating system paging",
            "Garbage Collector (GC)",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 25,
        "question": "Which Java Collection interface stores unique elements and does not permit duplicates?",
        "options": [
            "ArrayList",
            "Set",
            "List",
            "Queue",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 26,
        "question": "In Spring Boot, which annotation is typically placed at the class level to create a RESTful controller returning JSON?",
        "options": [
            "@RestController",
            "@Repository",
            "@Controller",
            "@Service",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 27,
        "question": "What does the `final` keyword indicate when applied to a Java class?",
        "options": [
            "The class cannot be instantiated",
            "The class cannot be subclassed (inherited)",
            "The class will be deleted after execution",
            "The class contains only static methods",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 28,
        "question": "What does JPA stand for in Java enterprise database persistence?",
        "options": [
            "Java Persistence API",
            "Java Program Application",
            "Joint Protocol Adapter",
            "Java Process Automation",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 29,
        "question": "Which HTTP status code signifies that a resource was successfully created on the server?",
        "options": [
            "204 No Content",
            "200 OK",
            "201 Created",
            "301 Moved",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 30,
        "question": "Which build tool is widely used for dependency management and build automation in modern Java projects?",
        "options": [
            "Maven / Gradle",
            "Pip",
            "Webpack",
            "Composer",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
]
