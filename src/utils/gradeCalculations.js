export const calculateCategoryGrade = (assignments) => {
  if (assignments.length === 0) return null;
  const totalPoints = assignments.reduce(
    (sum, a) => sum + parseFloat(a.total),
    0,
  );
  const earnedPoints = assignments.reduce(
    (sum, a) => sum + parseFloat(a.score),
    0,
  );
  return totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
};

export const letterToGPA = (letter) => {
  const gpaMap = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
    "N/A": 0.0,
  };
  return gpaMap[letter] || 0.0;
};

export const getLetterGrade = (percentage) => {
  if (percentage === null) return { letter: "N/A", color: "text-gray-400" };
  if (percentage >= 93) return { letter: "A", color: "text-green-600" };
  if (percentage >= 90) return { letter: "A-", color: "text-green-500" };
  if (percentage >= 87) return { letter: "B+", color: "text-blue-600" };
  if (percentage >= 83) return { letter: "B", color: "text-blue-500" };
  if (percentage >= 80) return { letter: "B-", color: "text-blue-400" };
  if (percentage >= 77) return { letter: "C+", color: "text-yellow-600" };
  if (percentage >= 73) return { letter: "C", color: "text-yellow-500" };
  if (percentage >= 70) return { letter: "C-", color: "text-yellow-400" };
  if (percentage >= 67) return { letter: "D+", color: "text-orange-600" };
  if (percentage >= 63) return { letter: "D", color: "text-orange-500" };
  if (percentage >= 60) return { letter: "D-", color: "text-orange-400" };
  return { letter: "F", color: "text-red-600" };
};

export const gradeToGPA = (grade) => {
  const gradeMap = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  };
  return gradeMap[grade] || 0.0;
};
