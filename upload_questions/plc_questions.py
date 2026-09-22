# ============================================================
# PLC & INDUSTRIAL AUTOMATION TECHNICAL QUESTIONS
# 30 Dedicated Technical MCQs
# ============================================================

DEPARTMENTS = ["PLC / Automation", "PLC", "Automation"]

questions = [
    {
        "order": 1,
        "question": "The main advantage of PLCs over relay logic is:",
        "options": [
            "Cheaper wiring only",
            "Flexibility and easy reprogramming",
            "No need for electricity",
            "Higher power rating",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 2,
        "question": "A PLC is primarily designed to replace:",
        "options": [
            "Microprocessors in computers",
            "Digital voltmeters",
            "Relays and timers in control circuits",
            "Analog meters",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 3,
        "question": "The CPU of a PLC consists of:",
        "options": [
            "Processor, memory, and power supply",
            "Input/output cards only",
            "Memory and I/O modules",
            "Keyboard and display",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 4,
        "question": "Which of the following is NOT an output device for PLCs?",
        "options": [
            "Alarm buzzer",
            "Thermocouple",
            "Solenoid valve",
            "Motor starter",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 5,
        "question": "A PLC timer instruction is used to:",
        "options": [
            "Store data in memory",
            "Count pulses",
            "Measure temperature",
            "Delay operations for a set time",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 6,
        "question": "The difference between an on-delay and off-delay timer in PLC is:",
        "options": [
            "No difference",
            "On-delay waits before turning OFF",
            "On-delay waits before turning ON; off-delay waits before turning OFF",
            "Off-delay resets immediately",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 7,
        "question": "A PLC counter instruction is mainly used for:",
        "options": [
            "Counting events, pulses, or objects",
            "Time delay",
            "Arithmetic operations",
            "Generating alarms only",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 8,
        "question": "Which PLC instruction is used to hold a coil output active until reset?",
        "options": [
            "Toggle",
            "Latch (SET)",
            "Pulse",
            "Reset (RST)",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 9,
        "question": "Which PLC function is used to compare two values?",
        "options": [
            "Counter",
            "Timer",
            "Comparator instruction (e.g., LES, GRT, EQU)",
            "Scan watchdog",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 10,
        "question": "Which PLC instruction is used for mathematical operations?",
        "options": [
            "MOV",
            "ADD, SUB, MUL, DIV",
            "OUT",
            "CMP",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 11,
        "question": "In ladder logic, a coil instruction represents:",
        "options": [
            "An output device",
            "A timer",
            "A memory register",
            "An input contact",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 12,
        "question": "Which PLC communication port is most commonly used for programming?",
        "options": [
            "Ethernet only",
            "HDMI",
            "CAN bus",
            "USB or RS-232/RS-485",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 13,
        "question": "Which PLC instruction is used to move a value from one register to another?",
        "options": [
            "RET",
            "CMP",
            "MOV",
            "ADD",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 14,
        "question": "Which of the following is NOT a PLC programming language as per IEC 61131-3?",
        "options": [
            "Ladder Diagram (LD)",
            "Assembly Language (ASM)",
            "Function Block Diagram (FBD)",
            "Structured Text (ST)",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 15,
        "question": "The RET instruction in a PLC program is used to:",
        "options": [
            "Restart CPU scan",
            "Reset outputs",
            "Re-enable timers",
            "Return from subroutine",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 16,
        "question": "Which PLC instruction allows branching of program execution?",
        "options": [
            "MOV (move)",
            "JMP (jump)",
            "CNT (counter)",
            "TON (on-delay timer)",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 17,
        "question": "Which PLC instruction performs bitwise logical operations?",
        "options": [
            "AND, OR, XOR",
            "MOV",
            "ADD, SUB, DIV",
            "RET",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 18,
        "question": "Which part of the PLC provides electrical power to the CPU and modules?",
        "options": [
            "Relay contacts",
            "Power supply module",
            "Communication port",
            "Analog input module",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 19,
        "question": "In ladder logic, normally closed contacts are represented by:",
        "options": [
            "Broken line contacts",
            "Parallel lines",
            "\u201cExamine OFF\u201d instruction",
            "Memory registers",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 20,
        "question": "Which PLC function is used to shift data bits?",
        "options": [
            "MOVE",
            "SHIFT REGISTER (SHL/SHR)",
            "RET",
            "XOR",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 21,
        "question": "What is a standard PLC Scan Cycle sequence composed of?",
        "options": [
            "Read memory -> Display graphics -> Print ladder diagram -> Idle",
            "Compile code -> Install firmware -> Power off -> Reset",
            "Analog conversion -> Digital modulation -> RF transmission -> Reception",
            "Read Inputs -> Execute Logic Program -> Write/Update Outputs -> Housekeeping",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 22,
        "question": "What is the standard industrial analog current signal range used by PLC analog input modules?",
        "options": [
            "4 to 20 mA",
            "10 to 50 A",
            "0 to 5 mA",
            "100 to 240 mA",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 23,
        "question": "What is the primary purpose of an optical isolator (optocoupler) in a PLC input module?",
        "options": [
            "To boost sensor voltage up to 440V",
            "To convert digital signals directly into hydraulic pressure",
            "To isolate high-voltage field signals from sensitive low-voltage CPU circuitry",
            "To illuminate the control panel cabinet",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 24,
        "question": "In PLC systems, what is the primary purpose of a 'Watchdog Timer' (WDT)?",
        "options": [
            "To detect CPU faults or infinite loops and safely shutdown if a scan exceeds its time limit",
            "To measure ambient cabinet operating temperature",
            "To prevent unauthorized technician login attempts",
            "To track total machine running hours for billing",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 25,
        "question": "Which industrial fieldbus communication protocol is widely utilized for connecting PLCs to distributed remote I/O and drives?",
        "options": [
            "SMTP / IMAP",
            "Bluetooth Audio",
            "HTTP / HTML",
            "Modbus / Profibus / Profinet",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 26,
        "question": "What is the main role of an HMI (Human-Machine Interface) connected to a PLC?",
        "options": [
            "To execute PLC ladder scan routines directly",
            "To regulate 24V DC auxiliary power distribution",
            "To provide a graphical visual display for operators to monitor and interact with the process",
            "To act as the main high-voltage circuit breaker for the facility",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 27,
        "question": "In discrete DC I/O wiring, what does a 'Sinking' (NPN) PLC input module indicate?",
        "options": [
            "The module must be completely submerged in insulating oil",
            "The sensor connects directly to high-voltage AC utility mains",
            "The input module only accepts high-temperature thermocouple probes",
            "The input module provides (sources) positive voltage and the sensor sinks current to 0V ground",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 28,
        "question": "In industrial automation architectures, what does the acronym SCADA stand for?",
        "options": [
            "Supervisory Control and Data Acquisition",
            "Sequential Control and Distributed Architecture",
            "Standard Communication and Device Access",
            "Synchronous Circuit and Digital Automation",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 29,
        "question": "Which type of memory in a PLC retains user program logic and configuration during complete AC power outage?",
        "options": [
            "Dynamic RAM (DRAM) without battery backup",
            "Volatile CPU cache memory",
            "Virtual memory swap paging file",
            "Non-volatile memory (Flash / EEPROM / Battery-backed RAM)",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": DEPARTMENTS
    },
    {
        "order": 30,
        "question": "What is the primary function of an Emergency Stop (E-Stop) circuit in an automated PLC system?",
        "options": [
            "A hardwired safety circuit that immediately cuts power to field actuators regardless of PLC state",
            "To place the PLC into online programming upload mode",
            "To log an advisory event on the HMI screen while maintaining actuator motion",
            "To reset all internal math registers and timers to zero",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": DEPARTMENTS
    },
]
