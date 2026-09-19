# ============================================================
# MECHANICAL (MECH / CATIA) QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "Which company is the original developer and publisher of the CATIA software suite?",
        "options": [
            "Dassault Systèmes",
            "Autodesk",
            "Siemens Digital Industries",
            "PTC"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 22,
        "question": "Which workbench in CATIA V5 is primarily used for creating 3D parametric solid features?",
        "options": [
            "Part Design",
            "Generative Shape Design",
            "Drafting",
            "DMU Kinematics"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 23,
        "question": "In CATIA Part Design, which command is used to extrude a 2D closed profile linearly into a 3D solid?",
        "options": ["Pad", "Shaft", "Pocket", "Rib"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 24,
        "question": "In CATIA Part Design, which command creates a solid of revolution by revolving a profile around a center axis?",
        "options": ["Shaft", "Pad", "Groove", "Slot"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 25,
        "question": "Which command in CATIA Part Design removes material by cutting into an existing solid with a 2D sketch profile?",
        "options": ["Pocket", "Pad", "Hole", "Multi-sections Solid"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 26,
        "question": "Which CATIA workbench is widely utilized for complex automotive and aerospace class-A surface modeling?",
        "options": [
            "Generative Shape Design (GSD)",
            "Assembly Design",
            "Structure Design",
            "Weld Design"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 27,
        "question": "What is the 3D on-screen manipulation instrument in CATIA used for dragging, orienting, and positioning parts called?",
        "options": ["Compass", "Protractor", "Cursor Axis", "Orbit Wheel"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 28,
        "question": "What is the standard native file extension for a single 3D solid part model in CATIA V5?",
        "options": [".CATPart", ".CATProduct", ".CATDrawing", ".prt"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 29,
        "question": "What is the standard native file extension for an assembly of multiple components in CATIA V5?",
        "options": [".CATProduct", ".CATPart", ".CATProcess", ".asm"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    },
    {
        "order": 30,
        "question": "In CATIA Part Design, which dress-up feature is used to slant faces at a specified angle for mold release?",
        "options": ["Draft Angle", "Chamfer", "Edge Fillet", "Shell"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH - CATIA"]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)
