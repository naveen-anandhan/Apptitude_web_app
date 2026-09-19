# ============================================================
# MECHANICAL (CATIA / 3D CAD) QUESTIONS (Orders 1 - 30)
# ============================================================

CATIA_DEPARTMENTS = ["MECH - CATIA"]

questions = [
    {
        "order": 1,
        "question": "Which aerospace and engineering corporation is the original developer and publisher of CATIA?",
        "options": [
            "Dassault Systèmes",
            "Autodesk",
            "Siemens Digital Industries",
            "PTC"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 2,
        "question": "In CATIA V5, what is the specialized working environment tailored for a specific engineering task (e.g., Part Design, Drafting) called?",
        "options": ["Workbench", "Dashboard", "Viewport", "Canvas"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 3,
        "question": "Which workbench in CATIA V5 is primarily utilized for creating 3D parametric mechanical solid parts?",
        "options": [
            "Part Design",
            "Generative Shape Design",
            "DMU Kinematics",
            "Drafting"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 4,
        "question": "In CATIA Sketcher, what does a GREEN color on a 2D profile indicate during geometry diagnostics?",
        "options": [
            "The geometry is fully constrained (iso-constrained)",
            "The geometry is under-constrained",
            "The geometry is over-constrained with conflicting dimensions",
            "The geometry is disconnected or unclosed"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 5,
        "question": "In CATIA Sketcher, what does a WHITE color on a line or arc indicate?",
        "options": [
            "The element is under-constrained (has remaining degrees of freedom)",
            "The element is fully fixed in space",
            "The element is in error and cannot be extruded",
            "The element is a construction reference line"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 6,
        "question": "In CATIA Sketcher, what does a PURPLE / MAGENTA or RED color on a sketch indicate?",
        "options": [
            "Over-constrained geometry (too many conflicting dimensions/constraints)",
            "Active construction geometry",
            "A profile ready for immediate Pad creation",
            "A mirrored profile"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 7,
        "question": "In CATIA Part Design, which command is used to linearly extrude a 2D closed sketch into a 3D solid body?",
        "options": ["Pad", "Shaft", "Pocket", "Rib"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 8,
        "question": "In CATIA Part Design, which command creates a solid of revolution by revolving a 2D profile around a specified axis?",
        "options": ["Shaft", "Pad", "Groove", "Slot"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 9,
        "question": "In CATIA Part Design, which command removes material by extruding a 2D profile into an existing solid feature?",
        "options": ["Pocket", "Pad", "Hole", "Multi-sections Solid"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 10,
        "question": "In CATIA Part Design, which command is the material-removal counterpart to the Shaft tool (revolving cut)?",
        "options": ["Groove", "Pocket", "Draft", "Fillet"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 11,
        "question": "What is the key advantage of using a 'Positioned Sketch' over a standard 'Sketch' in CATIA?",
        "options": [
            "Allows precise definition of the sketch origin point and orientation axes (H and V)",
            "Automatically converts lines into 3D solids without padding",
            "Reduces the file size of the 3D model by 50%",
            "Locks the sketch so no dimensions are required"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 12,
        "question": "In CATIA Part Design, which command is used to sweep a planar profile along an open or closed center curve trajectory?",
        "options": ["Rib", "Slot", "Pad", "Pocket"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 13,
        "question": "Which CATIA Part Design command removes material by sweeping a profile along a center guide curve?",
        "options": ["Slot", "Rib", "Shaft", "Chamfer"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 14,
        "question": "In CATIA Part Design, which feature creates a complex transitional solid connecting multiple cross-sectional planar sketches (similar to a Loft)?",
        "options": [
            "Multi-sections Solid",
            "Pad",
            "Shaft",
            "Stiffener"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 15,
        "question": "Which dress-up feature in CATIA Part Design is used to smooth sharp edges with a uniform circular radius?",
        "options": ["Edge Fillet", "Chamfer", "Draft", "Shell"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 16,
        "question": "In CATIA Part Design, what parameters are required when applying a 'Draft Angle' feature?",
        "options": [
            "Faces to draft, Angle, Neutral Element, and Pulling Direction",
            "Tool spindle speed and feed rate",
            "Material density and Young's modulus",
            "Coordinate origin and bounding box limits"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 17,
        "question": "Which feature in CATIA Part Design hollows out a solid component, leaving a specified default wall thickness?",
        "options": ["Shell", "Pocket", "Stiffener", "Mirror"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 18,
        "question": "Which feature in CATIA Part Design is specifically designed to create web stiffening ribs from an open 2D sketch profile?",
        "options": ["Stiffener", "Pad", "Shaft", "Rib"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 19,
        "question": "What operations are available under Boolean Operations in CATIA Part Design when combining multiple solid bodies?",
        "options": [
            "Assemble, Add, Remove, and Intersect",
            "Copy, Cut, Paste, and Delete",
            "Extrude, Revolve, Sweep, and Blend",
            "Compile, Link, Debug, and Run"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 20,
        "question": "Which workbench in CATIA V5 is universally recognized for advanced Class-A aesthetic and aerodynamic wireframe and surface modeling?",
        "options": [
            "Generative Shape Design (GSD)",
            "Part Design",
            "Sheet Metal Design",
            "Prismatic Machining"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 21,
        "question": "In CATIA Generative Shape Design (GSD), which command connects two or more adjacent surface patches into a single continuous quilt?",
        "options": ["Join", "Trim", "Split", "Extrapolate"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 22,
        "question": "What is the 3D on-screen visual manipulation widget in CATIA used for dragging, rotating, and snapping components called?",
        "options": ["The Compass", "The Protractor", "The Triad Cursor", "The Coordinate Navigator"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 23,
        "question": "In the CATIA Specification Tree, what does selecting 'Define in Work Object' on a feature do?",
        "options": [
            "Sets that feature as the active insertion point for subsequent operations in historical sequence",
            "Exports the feature as an STL file",
            "Permanently locks the feature against any future modifications",
            "Converts the feature from a solid into a surface"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 24,
        "question": "In CATIA Assembly Design, which constraint aligns the centerlines of two cylindrical holes or pins?",
        "options": ["Coincidence Constraint", "Contact Constraint", "Offset Constraint", "Angle Constraint"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 25,
        "question": "In CATIA Assembly Design, which command anchors a reference base component firmly in 3D space with zero remaining degrees of freedom?",
        "options": ["Fix Component", "Coincidence", "Contact", "Flexible Sub-Assembly"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 26,
        "question": "In CATIA Assembly Design, what analysis tool verifies whether components in the product model intersect or collide?",
        "options": [
            "Clash / Clearance / Interference Analysis",
            "Sectioning and Measure Inertia",
            "Finite Element Mesher",
            "Bill of Materials generator"
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 27,
        "question": "What is the native file format extension for a single 3D Part document in CATIA V5?",
        "options": [".CATPart", ".CATProduct", ".CATDrawing", ".CATProcess"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 28,
        "question": "What is the native file format extension for a 3D Assembly Product document in CATIA V5?",
        "options": [".CATProduct", ".CATPart", ".CATDrawing", ".CATMaterial"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 29,
        "question": "In the CATIA Drafting workbench, which view creation tool projects adjacent orthographic views from an already established base view?",
        "options": ["Projection View", "Front View", "Auxiliary View", "Detail View"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    },
    {
        "order": 30,
        "question": "Which international neutral CAD exchange standard is supported by CATIA for transmitting 3D models with assembly structure and geometric PMI?",
        "options": ["STEP (AP203 / AP214 / AP242)", "BMP", "TXT", "MP4"],
        "correctIndex": 0,
        "marks": 1,
        "departments": CATIA_DEPARTMENTS
    }
]

if __name__ == "__main__":
    from upload import upload_questions
    upload_questions(questions)
