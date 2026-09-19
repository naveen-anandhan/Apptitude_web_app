# ============================================================
# JAVA FULL STACK TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "Which method serves as the standard entry point for running any Java standalone application?",
        "options": [
            "public void main()",
            "public static void main(String[] args)",
            "public abstract int start()",
            "static boolean run(String args)"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 22,
        "question": "Which Java keyword is used to inherit properties and methods from a superclass?",
        "options": ["implements", "extends", "inherits", "super"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 23,
        "question": "What is the key difference between String `==` and String `.equals()` in Java?",
        "options": [
            "`==` compares memory reference, while `.equals()` compares character contents",
            "`.equals()` compares memory reference, while `==` compares contents",
            "Both perform exact identical checks",
            "`==` is used for numbers, `.equals()` can only be used on primitives"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 24,
        "question": "How does Java automatically manage memory deallocation for objects no longer in use?",
        "options": [
            "Manual `free()` statements",
            "Garbage Collector (GC)",
            "Destructors in every class",
            "Operating system paging"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 25,
        "question": "Which Java Collection interface stores unique elements and does not permit duplicates?",
        "options": ["List", "Set", "Queue", "ArrayList"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 26,
        "question": "In Spring Boot, which annotation is typically placed at the class level to create a RESTful controller returning JSON?",
        "options": ["@Controller", "@RestController", "@Service", "@Repository"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 27,
        "question": "What does the `final` keyword indicate when applied to a Java class?",
        "options": [
            "The class cannot be instantiated",
            "The class cannot be subclassed (inherited)",
            "The class contains only static methods",
            "The class will be deleted after execution"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 28,
        "question": "What does JPA stand for in Java enterprise database persistence?",
        "options": [
            "Java Persistence API",
            "Java Process Automation",
            "Joint Protocol Adapter",
            "Java Program Application"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 29,
        "question": "Which HTTP status code signifies that a resource was successfully created on the server?",
        "options": ["200 OK", "201 Created", "204 No Content", "301 Moved"],
        "correctIndex": 1,
        "marks": 1,
        "departments": ["Java Full Stack"]
    },
    {
        "order": 30,
        "question": "Which build tool is widely used for dependency management and build automation in modern Java projects?",
        "options": ["Maven / Gradle", "Webpack", "Pip", "Composer"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["Java Full Stack"]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)