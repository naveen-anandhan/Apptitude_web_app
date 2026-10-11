from pathlib import Path
import sys
import firebase_admin
from firebase_admin import credentials, firestore

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

TEST_ID = "aptitude-test-01"
PROJECT_FOLDER = Path(__file__).resolve().parent.parent
SERVICE_ACCOUNT_FILE = PROJECT_FOLDER / "serviceAccountKey.json"

if not firebase_admin._apps:
    cred = credentials.Certificate(str(SERVICE_ACCOUNT_FILE))
    firebase_admin.initialize_app(cred)

db = firestore.client()

def upload_questions(questions, default_department=None, replace_department=None):
    questions_ref = db.collection("tests").document(TEST_ID).collection("questions")

    if replace_department:
        print()
        print("=" * 60)
        print(f"Removing old questions for department: {replace_department}...")
        print("=" * 60)
        docs = questions_ref.where("departments", "array_contains", replace_department).stream()
        deleted_count = 0
        for doc in docs:
            doc.reference.delete()
            deleted_count += 1
        print(f"Removed {deleted_count} old questions.")

    print()
    print("=" * 60)
    print("Uploading questions...")
    print("=" * 60)

    uploaded = 0
    for q in questions:
        depts = q.get("departments", [])
        if not depts and default_department:
            depts = [default_department]

        if not depts:
            print(f"Skipping '{q.get('question')}': No departments specified.")
            continue

        doc_data = {
            "question": q["question"],
            "options": q["options"],
            "correctIndex": int(q["correctIndex"]),
            "marks": int(q.get("marks", 1)),
            "order": int(q.get("order", 1)),
            "departments": depts
        }

        questions_ref.add(doc_data)
        uploaded += 1
        try:
            print(f"[{doc_data['order']:02d}] Uploaded: {q['question'][:50]}... -> {', '.join(depts)}")
        except Exception:
            safe_q = q['question'][:50].encode('ascii', errors='replace').decode('ascii')
            print(f"[{doc_data['order']:02d}] Uploaded: {safe_q}... -> {', '.join(depts)}")

    print("=" * 60)
    print(f"Successfully uploaded {uploaded} questions.")
    print("=" * 60)