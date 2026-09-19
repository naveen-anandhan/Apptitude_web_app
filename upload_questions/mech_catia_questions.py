# ============================================================
# MECHANICAL ENGINEERING - CATIA (Dassault Systemes V5)
# 30 Dedicated CAD & Mechanical Aptitude Questions (Pure CATIA)
# ============================================================

DEPARTMENTS = ["MECH", "MECH - CATIA"]

questions = [
    {
        "order": 1,
        "question": "Which aerospace and engineering corporation is the original developer and publisher of CATIA?",
        "options": [
            "Dassault Syst\u00e8mes",
            "Siemens Digital Industries",
            "PTC",
            "Autodesk",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 2,
        "question": "In CATIA V5, what is the specialized working environment tailored for a specific engineering task (e.g., Part Design, Drafting) called?",
        "options": [
            "Dashboard",
            "Canvas",
            "Viewport",
            "Workbench",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 3,
        "question": "Which workbench in CATIA V5 is primarily utilized for creating 3D parametric mechanical solid parts?",
        "options": [
            "Drafting",
            "Generative Shape Design",
            "Part Design",
            "DMU Kinematics",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 4,
        "question": "In CATIA Sketcher, what does a GREEN color on a 2D profile indicate during geometry diagnostics?",
        "options": [
            "The geometry is under-constrained",
            "The geometry is fully constrained (iso-constrained)",
            "The geometry is over-constrained with conflicting dimensions",
            "The geometry is disconnected or unclosed",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 5,
        "question": "In CATIA Sketcher, what does a WHITE color on a line or arc indicate?",
        "options": [
            "The element is under-constrained (has remaining degrees of freedom)",
            "The element is in error and cannot be extruded",
            "The element is fully fixed in space",
            "The element is a construction reference line",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 6,
        "question": "In CATIA Sketcher, what does a PURPLE / MAGENTA or RED color on a sketch indicate?",
        "options": [
            "A mirrored profile",
            "Over-constrained geometry (too many conflicting dimensions/constraints)",
            "Active construction geometry",
            "A profile ready for immediate Pad creation",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 7,
        "question": "In CATIA Part Design, which command is used to linearly extrude a 2D closed sketch into a 3D solid body?",
        "options": [
            "Pad",
            "Shaft",
            "Pocket",
            "Rib",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 8,
        "question": "In CATIA Part Design, which command creates a solid of revolution by revolving a 2D profile around a specified axis?",
        "options": [
            "Slot",
            "Shaft",
            "Groove",
            "Pad",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 9,
        "question": "In CATIA Part Design, which command removes material by extruding a 2D profile into an existing solid feature?",
        "options": [
            "Pocket",
            "Hole",
            "Multi-sections Solid",
            "Pad",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 10,
        "question": "In CATIA Part Design, which command is the material-removal counterpart to the Shaft tool (revolving cut)?",
        "options": [
            "Fillet",
            "Pocket",
            "Groove",
            "Draft",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 11,
        "question": "What is the key advantage of using a 'Positioned Sketch' over a standard 'Sketch' in CATIA?",
        "options": [
            "Reduces the file size of the 3D model by 50%",
            "Locks the sketch so no dimensions are required",
            "Automatically converts lines into 3D solids without padding",
            "Allows precise definition of the sketch origin point and orientation axes (H and V)",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 12,
        "question": "In CATIA Part Design, which command is used to sweep a planar profile along an open or closed center curve trajectory?",
        "options": [
            "Pad",
            "Rib",
            "Pocket",
            "Slot",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 13,
        "question": "Which CATIA Part Design command removes material by sweeping a profile along a center guide curve?",
        "options": [
            "Shaft",
            "Rib",
            "Slot",
            "Chamfer",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 14,
        "question": "In CATIA Part Design, which feature creates a complex transitional solid connecting multiple cross-sectional planar sketches (similar to a Loft)?",
        "options": [
            "Shaft",
            "Pad",
            "Stiffener",
            "Multi-sections Solid",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 15,
        "question": "Which dress-up feature in CATIA Part Design is used to smooth sharp edges with a uniform circular radius?",
        "options": [
            "Shell",
            "Chamfer",
            "Edge Fillet",
            "Draft",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 16,
        "question": "In CATIA Part Design, what parameters are required when applying a 'Draft Angle' feature?",
        "options": [
            "Faces to draft, Angle, Neutral Element, and Pulling Direction",
            "Material density and Young's modulus",
            "Coordinate origin and bounding box limits",
            "Tool spindle speed and feed rate",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 17,
        "question": "Which feature in CATIA Part Design hollows out a solid component, leaving a specified default wall thickness?",
        "options": [
            "Pocket",
            "Shell",
            "Mirror",
            "Stiffener",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 18,
        "question": "Which feature in CATIA Part Design is specifically designed to create web stiffening ribs from an open 2D sketch profile?",
        "options": [
            "Rib",
            "Shaft",
            "Stiffener",
            "Pad",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 19,
        "question": "What operations are available under Boolean Operations in CATIA Part Design when combining multiple solid bodies?",
        "options": [
            "Assemble, Add, Remove, and Intersect",
            "Compile, Link, Debug, and Run",
            "Copy, Cut, Paste, and Delete",
            "Extrude, Revolve, Sweep, and Blend",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 20,
        "question": "Which workbench in CATIA V5 is universally recognized for advanced Class-A aesthetic and aerodynamic wireframe and surface modeling?",
        "options": [
            "Part Design",
            "Sheet Metal Design",
            "Generative Shape Design (GSD)",
            "Prismatic Machining",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 21,
        "question": "In CATIA Generative Shape Design (GSD), which command connects two or more adjacent surface patches into a single continuous quilt?",
        "options": [
            "Extrapolate",
            "Split",
            "Trim",
            "Join",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 22,
        "question": "What is the 3D on-screen visual manipulation widget in CATIA used for dragging, rotating, and snapping components called?",
        "options": [
            "The Coordinate Navigator",
            "The Protractor",
            "The Compass",
            "The Triad Cursor",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 23,
        "question": "In the CATIA Specification Tree, what does selecting 'Define in Work Object' on a feature do?",
        "options": [
            "Converts the feature from a solid into a surface",
            "Permanently locks the feature against any future modifications",
            "Exports the feature as an STL file",
            "Sets that feature as the active insertion point for subsequent operations in historical sequence",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 24,
        "question": "In CATIA Assembly Design, which constraint aligns the centerlines of two cylindrical holes or pins?",
        "options": [
            "Angle Constraint",
            "Contact Constraint",
            "Coincidence Constraint",
            "Offset Constraint",
        ],
        "correctIndex": 2,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 25,
        "question": "In CATIA Assembly Design, which command anchors a reference base component firmly in 3D space with zero remaining degrees of freedom?",
        "options": [
            "Fix Component",
            "Flexible Sub-Assembly",
            "Contact",
            "Coincidence",
        ],
        "correctIndex": 0,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 26,
        "question": "In CATIA Assembly Design, what analysis tool verifies whether components in the product model intersect or collide?",
        "options": [
            "Sectioning and Measure Inertia",
            "Clash / Clearance / Interference Analysis",
            "Finite Element Mesher",
            "Bill of Materials generator",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 27,
        "question": "What is the native file format extension for a single 3D Part document in CATIA V5?",
        "options": [
            ".CATProduct",
            ".CATDrawing",
            ".CATProcess",
            ".CATPart",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 28,
        "question": "What is the native file format extension for a 3D Assembly Product document in CATIA V5?",
        "options": [
            ".CATMaterial",
            ".CATProduct",
            ".CATDrawing",
            ".CATPart",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 29,
        "question": "In the CATIA Drafting workbench, which view creation tool projects adjacent orthographic views from an already established base view?",
        "options": [
            "Front View",
            "Detail View",
            "Auxiliary View",
            "Projection View",
        ],
        "correctIndex": 3,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
    {
        "order": 30,
        "question": "Which international neutral CAD exchange standard is supported by CATIA for transmitting 3D models with assembly structure and geometric PMI?",
        "options": [
            "BMP",
            "STEP (AP203 / AP214 / AP242)",
            "TXT",
            "MP4",
        ],
        "correctIndex": 1,
        "marks": 1,
        "departments": [DEPARTMENT]
    },
]
