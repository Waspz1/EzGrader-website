import { useState, useEffect } from "react";
import { gradeToGPA } from "@/utils/gradeCalculations";

export function useGPACalculator() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    grade: "",
    credits: "",
    type: "regular",
  });

  useEffect(() => {
    const savedCourses = localStorage.getItem("gpaCoursesData");
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gpaCoursesData", JSON.stringify(courses));
  }, [courses]);

  const addCourse = () => {
    if (!newCourse.name || !newCourse.grade || !newCourse.credits) return;

    const credits = parseFloat(newCourse.credits);
    if (isNaN(credits) || credits <= 0) return;

    setCourses([
      ...courses,
      {
        id: Date.now(),
        name: newCourse.name,
        grade: newCourse.grade,
        credits,
        type: newCourse.type,
      },
    ]);

    setNewCourse({ name: "", grade: "", credits: "", type: "regular" });
  };

  const removeCourse = (courseId) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const calculateUnweightedGPAFromCourses = () => {
    if (courses.length === 0) return null;

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const gpa = gradeToGPA(course.grade);
      totalPoints += gpa * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : null;
  };

  const calculateWeightedGPAFromCourses = () => {
    if (courses.length === 0) return null;

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      let gpa = gradeToGPA(course.grade);

      if (course.type === "honors") gpa += 0.5;
      if (course.type === "ap") gpa += 1.0;

      gpa = Math.min(gpa, 5.0);

      totalPoints += gpa * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : null;
  };

  const clearGPAData = () => {
    if (
      confirm(
        "Are you sure you want to clear all GPA data? This cannot be undone.",
      )
    ) {
      setCourses([]);
    }
  };

  return {
    courses,
    newCourse,
    setNewCourse,
    addCourse,
    removeCourse,
    calculateUnweightedGPAFromCourses,
    calculateWeightedGPAFromCourses,
    clearGPAData,
  };
}
