# ============================================================
# MECHANICAL (MECH / CREO / CAD) QUESTIONS (Orders 21 - 30)
# ============================================================

questions = [
    {
        "order": 21,
        "question": "What is PTC Creo primarily used for in engineering industries?",
        "options": [
            "3D CAD parametric modeling, simulation, and design",
            "Relational database management",
            "Website frontend coding",
            "Sound editing and audio mastering"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 22,
        "question": "In 3D CAD modeling, which tool is used to create a 3D solid by projecting a 2D sketch perpendicular to the sketch plane?",
        "options": ["Extrude", "Revolve", "Sweep", "Blend"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 23,
        "question": "Which CAD feature creates a rotational symmetrical solid by rotating a 2D cross-section around a center axis?",
        "options": ["Revolve", "Chamfer", "Shell", "Pattern"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 24,
        "question": "What is a 'Datum' in Creo (such as a Datum Plane, Datum Axis, or Datum Point)?",
        "options": [
            "A reference geometry used to construct sketches, features, and assemblies",
            "A measurement of material cost",
            "A file compression format",
            "The physical weight of the finished part"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 25,
        "question": "What is the primary engineering purpose of adding a 'Fillet' (Round) to internal corners of a mechanical part?",
        "options": [
            "Reduce stress concentration and eliminate sharp corners",
            "Increase the overall weight of the part",
            "Make the part easier to paint",
            "Speed up 3D file saving"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 26,
        "question": "In a tensile test of mild steel, what is the point on the stress-strain curve beyond which permanent plastic deformation occurs?",
        "options": ["Yield Point", "Proportional Limit", "Breaking Point", "Ultimate Tensile Strength"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 27,
        "question": "What does GD&T stand for in mechanical engineering drafting and manufacturing?",
        "options": [
            "Geometric Dimensioning and Tolerancing",
            "General Drafting and Testing",
            "Global Design and Tooling",
            "Graphical Dimensioning Technique"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 28,
        "question": "What is the primary function of Finite Element Analysis (FEA) software in mechanical design?",
        "options": [
            "Simulating structural stresses, deformations, and thermal behaviors under load",
            "Generating barcodes for inventory boxes",
            "Writing CNC machine operator pay slips",
            "Checking spelling in drafting notes"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 29,
        "question": "Which CAD feature is used to hollow out a solid model leaving walls of specified uniform thickness?",
        "options": ["Shell", "Draft", "Rib", "Hole"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    },
    {
        "order": 30,
        "question": "Which casting defect is caused by trapped gas bubbles inside the molten metal during solidification?",
        "options": ["Blowhole / Porosity", "Hot Tear", "Cold Shut", "Mismatch"],
        "correctIndex": 0,
        "marks": 1,
        "departments": ["MECH"]
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)