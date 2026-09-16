export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function getStudent() {
  try {
    return JSON.parse(
      sessionStorage.getItem("student") || "null"
    );
  } catch {
    return null;
  }
}

export function setStudent(student) {
  sessionStorage.setItem(
    "student",
    JSON.stringify(student)
  );
}

export function saveStudent(student) {
  sessionStorage.setItem(
    "student",
    JSON.stringify(student)
  );
}

export function formatDate(timestamp) {
  if (!timestamp) return "";

  const date = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);

  return date.toLocaleString();
}