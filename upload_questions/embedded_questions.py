# ============================================================
# EMBEDDED TECHNICAL QUESTIONS (10 Questions: Order 21-30)
# ============================================================

DEPARTMENT = "Embedded"

questions = [
    {
        "order": 21,
        "question": "What is the primary architectural difference between a Microcontroller (MCU) and a Microprocessor (MPU)?",
        "options": [
            "An MPU can only execute Python code",
            "An MCU does not require clock oscillators",
            "An MCU integrates CPU, RAM, ROM, and I/O peripherals onto a single chip",
            "An MPU cannot perform arithmetic calculations",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 22,
        "question": "Which programming language is predominantly used for low-level firmware and embedded microcontroller development?",
        "options": [
            "Ruby",
            "JavaScript",
            "PHP",
            "C / Embedded C",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 23,
        "question": "What is the primary purpose of an ADC (Analog-to-Digital Converter) in an embedded system?",
        "options": [
            "Translates machine code into assembly",
            "Converts DC power into AC power",
            "Converts continuous sensor signals into digital discrete values",
            "Amplifies audio sound output",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 24,
        "question": "What is the role of a Watchdog Timer (WDT) in a microcontroller?",
        "options": [
            "Automatically reset the system if software hangs or enters an infinite loop",
            "Control fan temperature",
            "Speed up memory reading",
            "Display the current wall clock time on an LCD",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 25,
        "question": "Which synchronous serial communication protocol uses MOSI, MISO, SCK, and CS/SS lines?",
        "options": [
            "I2C",
            "RS-232",
            "UART",
            "SPI",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 26,
        "question": "How many signal lines does the I2C bus protocol fundamentally require for communication?",
        "options": [
            "1 (Single wire only)",
            "2 (SDA and SCL)",
            "4 (MOSI, MISO, SCK, CS)",
            "8 (Data byte bus)",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 27,
        "question": "What does ISR stand for in embedded event handling?",
        "options": [
            "Input Signal Router",
            "Internal System Register",
            "Instruction Set Reader",
            "Interrupt Service Routine",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 28,
        "question": "What does PWM stand for, and what is its common application in embedded control?",
        "options": [
            "Pulse Width Modulation; used for controlling motor speeds and LED brightness",
            "Program Word Memory; used for flashing bootloaders",
            "Periodic Wave Multiplier; used for clock division",
            "Power Wave Monitor; used to check battery voltage",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 29,
        "question": "What is the key characteristic of a Real-Time Operating System (RTOS)?",
        "options": [
            "Requirement of at least 8 GB of RAM",
            "Predictable and deterministic task execution within strict deadlines",
            "A visually appealing graphical desktop interface",
            "Unlimited background process multitasking without priorities",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 30,
        "question": "What does GPIO stand for on a development board or microcontroller?",
        "options": [
            "General Purpose Input/Output",
            "Global Protocol Input Operation",
            "Graphics Processing Interface Output",
            "Generic Port Interconnect Option",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
]
