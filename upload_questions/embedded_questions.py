# ============================================================
# EMBEDDED SYSTEMS TECHNICAL QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "What is the primary architectural difference between a Microcontroller (MCU) and a Microprocessor (MPU)?",
        "options": [
            "An MCU integrates CPU, RAM, ROM, and I/O peripherals onto a single chip",
            "An MPU can only execute Python code",
            "An MPU cannot perform arithmetic calculations",
            "An MCU does not require clock oscillators"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 22,
        "question": "Which programming language is predominantly used for low-level firmware and embedded microcontroller development?",
        "options": [
            "Ruby",
            "C / Embedded C",
            "JavaScript",
            "PHP"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 23,
        "question": "What is the primary purpose of an ADC (Analog-to-Digital Converter) in an embedded system?",
        "options": [
            "Translates machine code into assembly",
            "Converts DC power into AC power",
            "Amplifies audio sound output",
            "Converts continuous sensor signals into digital discrete values"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 24,
        "question": "What is the role of a Watchdog Timer (WDT) in a microcontroller?",
        "options": [
            "Display the current wall clock time on an LCD",
            "Control fan temperature",
            "Automatically reset the system if software hangs or enters an infinite loop",
            "Speed up memory reading"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 25,
        "question": "Which synchronous serial communication protocol uses MOSI, MISO, SCK, and CS/SS lines?",
        "options": [
            "I2C",
            "RS-232",
            "UART",
            "SPI"
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 26,
        "question": "How many signal lines does the I2C bus protocol fundamentally require for communication?",
        "options": [
            "8 (Data byte bus)",
            "2 (SDA and SCL)",
            "4 (MOSI, MISO, SCK, CS)",
            "1 (Single wire only)"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 27,
        "question": "What does ISR stand for in embedded event handling?",
        "options": [
            "Instruction Set Reader",
            "Internal System Register",
            "Interrupt Service Routine",
            "Input Signal Router"
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 28,
        "question": "What does PWM stand for, and what is its common application in embedded control?",
        "options": [
            "Program Word Memory; used for flashing bootloaders",
            "Pulse Width Modulation; used for controlling motor speeds and LED brightness",
            "Periodic Wave Multiplier; used for clock division",
            "Power Wave Monitor; used to check battery voltage"
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 29,
        "question": "What is the key characteristic of a Real-Time Operating System (RTOS)?",
        "options": [
            "Predictable and deterministic task execution within strict deadlines",
            "Unlimited background process multitasking without priorities",
            "Requirement of at least 8 GB of RAM",
            "A visually appealing graphical desktop interface"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    },
    {
        "order": 30,
        "question": "What does GPIO stand for on a development board or microcontroller?",
        "options": [
            "General Purpose Input/Output",
            "Generic Port Interconnect Option",
            "Graphics Processing Interface Output",
            "Global Protocol Input Operation"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [
            "Embedded"
        ]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)
