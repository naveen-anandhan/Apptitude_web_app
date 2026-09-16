from pathlib import Path

import firebase_admin
from firebase_admin import credentials, firestore


# ============================================================
# FIREBASE CONFIGURATION
# ============================================================

TEST_ID = "aptitude-test-01"

# serviceAccountKey.json is in the main project folder
PROJECT_FOLDER = Path(__file__).resolve().parent.parent

SERVICE_ACCOUNT_FILE = (
    PROJECT_FOLDER / "serviceAccountKey.json"
)


# ============================================================
# INITIALIZE FIREBASE
# ============================================================

if not firebase_admin._apps:

    cred = credentials.Certificate(
        str(SERVICE_ACCOUNT_FILE)
    )

    firebase_admin.initialize_app(cred)


db = firestore.client()


# ============================================================
# UPLOAD QUESTIONS
# ============================================================

def upload_questions(questions):

    questions_ref = (
        db
        .collection("tests")
        .document(TEST_ID)
        .collection("questions")
    )


    print()
    print("=" * 60)
    print("Uploading questions")
    print("=" * 60)


    # ========================================================
    # GET EXISTING QUESTIONS
    # ========================================================

    existing_docs = questions_ref.get()

    existing_questions = []


    for doc in existing_docs:

        data = doc.to_dict()

        existing_questions.append(data)


    # ========================================================
    # FIND HIGHEST ORDER FOR EACH DEPARTMENT
    # ========================================================

    department_orders = {}


    for existing in existing_questions:

        departments = existing.get(
            "departments",
            []
        )

        current_order = int(
            existing.get(
                "order",
                0
            )
        )


        for department in departments:

            current_highest = (
                department_orders.get(
                    department,
                    0
                )
            )


            if current_order > current_highest:

                department_orders[department] = (
                    current_order
                )


    # ========================================================
    # UPLOAD QUESTIONS
    # ========================================================

    uploaded = 0
    skipped = 0


    for question in questions:

        question_text = question["question"]


        # ----------------------------------------------------
        # GET DEPARTMENTS FROM QUESTION
        # ----------------------------------------------------

        departments = question.get(
            "departments",
            []
        )


        # ----------------------------------------------------
        # CHECK DEPARTMENT
        # ----------------------------------------------------

        if not departments:

            print(
                f"⚠ Skipped: {question_text}"
            )

            print(
                "  Reason: No departments specified."
            )

            skipped += 1

            continue


        # ====================================================
        # CHECK FOR DUPLICATE
        # ====================================================

        already_exists = False


        for existing in existing_questions:

            same_question = (
                existing.get("question")
                == question_text
            )


            existing_departments = (
                existing.get(
                    "departments",
                    []
                )
            )


            # Check whether the question already
            # exists for any of its departments

            same_department = any(
                department in existing_departments
                for department in departments
            )


            if (
                same_question
                and same_department
            ):

                already_exists = True

                break


        # ----------------------------------------------------
        # SKIP DUPLICATE
        # ----------------------------------------------------

        if already_exists:

            print(
                f"⏭ Skipped duplicate: "
                f"{question_text}"
            )

            skipped += 1

            continue


        # ====================================================
        # DETERMINE QUESTION ORDER
        # ====================================================

        highest_order = 0


        for department in departments:

            current_order = (
                department_orders.get(
                    department,
                    0
                )
            )


            if current_order > highest_order:

                highest_order = current_order


        highest_order += 1


        # ====================================================
        # CREATE FIRESTORE QUESTION
        # ====================================================

        question_data = {

            "question":
                question["question"],

            "options":
                question["options"],

            "correctIndex":
                question["correctIndex"],

            "marks":
                question.get(
                    "marks",
                    1
                ),

            "order":
                highest_order,

            "departments":
                departments
        }


        # ====================================================
        # UPLOAD TO FIRESTORE
        # ====================================================

        doc_ref = questions_ref.document()

        doc_ref.set(
            question_data
        )


        print(
            f"✓ Uploaded question "
            f"{highest_order}: "
            f"{question_text}"
        )


        print(
            f"  Departments: "
            f"{', '.join(departments)}"
        )


        uploaded += 1


        # ====================================================
        # ADD TO LOCAL LIST
        # ====================================================

        existing_questions.append(
            question_data
        )


        # Update order for every department
        # assigned to this question.

        for department in departments:

            department_orders[department] = (
                highest_order
            )


    # ========================================================
    # SUMMARY
    # ========================================================

    print()

    print("=" * 60)

    print(
        f"✓ Uploaded: {uploaded}"
    )

    print(
        f"⏭ Skipped:  {skipped}"
    )

    print("=" * 60)

    print(
        "Upload completed successfully!"
    )

    print()