import { useState, useEffect, useMemo } from "react";
import {
  calculateCategoryGrade,
  letterToGPA,
  getLetterGrade,
} from "@/utils/gradeCalculations";

export function useGradeCalculator() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Tests",
      weight: 40,
      assignments: [],
      courseType: "regular",
    },
    {
      id: 2,
      name: "Homework",
      weight: 30,
      assignments: [],
      courseType: "regular",
    },
    {
      id: 3,
      name: "Projects",
      weight: 20,
      assignments: [],
      courseType: "regular",
    },
    {
      id: 4,
      name: "Participation",
      weight: 10,
      assignments: [],
      courseType: "regular",
    },
  ]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    score: "",
    total: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryWeight, setNewCategoryWeight] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gradeCalculatorData");
    if (saved) {
      const data = JSON.parse(saved);
      setCategories(data.categories || categories);
      setSelectedCategoryId(data.selectedCategoryId || 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "gradeCalculatorData",
      JSON.stringify({
        categories,
        selectedCategoryId,
      }),
    );
  }, [categories, selectedCategoryId]);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  const unweightedGPA = useMemo(() => {
    const categoriesWithGrades = categories.filter((cat) => {
      const grade = calculateCategoryGrade(cat.assignments);
      return grade !== null;
    });

    if (categoriesWithGrades.length === 0) return null;

    const totalGPA = categoriesWithGrades.reduce((sum, cat) => {
      const percentage = calculateCategoryGrade(cat.assignments);
      const letter = getLetterGrade(percentage).letter;
      return sum + letterToGPA(letter);
    }, 0);

    return totalGPA / categoriesWithGrades.length;
  }, [categories]);

  const weightedGPA = useMemo(() => {
    const categoriesWithGrades = categories.filter((cat) => {
      const grade = calculateCategoryGrade(cat.assignments);
      return grade !== null;
    });

    if (categoriesWithGrades.length === 0) return null;

    const totalGPA = categoriesWithGrades.reduce((sum, cat) => {
      const percentage = calculateCategoryGrade(cat.assignments);
      const letter = getLetterGrade(percentage).letter;
      let gpa = letterToGPA(letter);

      if (cat.courseType === "honors") gpa += 0.5;
      if (cat.courseType === "ap") gpa += 1.0;
      gpa = Math.min(gpa, 5.0);

      return sum + gpa;
    }, 0);

    return totalGPA / categoriesWithGrades.length;
  }, [categories]);

  const overallGrade = useMemo(() => {
    const totalWeight = categories.reduce((sum, cat) => sum + cat.weight, 0);
    if (totalWeight === 0) return null;

    let weightedSum = 0;
    let usedWeight = 0;

    categories.forEach((cat) => {
      const catGrade = calculateCategoryGrade(cat.assignments);
      if (catGrade !== null) {
        weightedSum += catGrade * (cat.weight / 100);
        usedWeight += cat.weight;
      }
    });

    return usedWeight > 0 ? (weightedSum / usedWeight) * 100 : null;
  }, [categories]);

  const addAssignment = () => {
    if (!newAssignment.name || !newAssignment.score || !newAssignment.total)
      return;

    const score = parseFloat(newAssignment.score);
    const total = parseFloat(newAssignment.total);

    if (isNaN(score) || isNaN(total) || total <= 0 || score < 0) return;

    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategoryId
          ? {
              ...cat,
              assignments: [
                ...cat.assignments,
                {
                  id: Date.now(),
                  name: newAssignment.name,
                  score,
                  total,
                },
              ],
            }
          : cat,
      ),
    );

    setNewAssignment({ name: "", score: "", total: "" });
  };

  const removeAssignment = (assignmentId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategoryId
          ? {
              ...cat,
              assignments: cat.assignments.filter((a) => a.id !== assignmentId),
            }
          : cat,
      ),
    );
  };

  const addCategory = () => {
    if (!newCategoryName || !newCategoryWeight) return;
    const weight = parseFloat(newCategoryWeight);
    if (isNaN(weight) || weight <= 0) return;

    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: newCategoryName,
        weight,
        assignments: [],
        courseType: "regular",
      },
    ]);

    setNewCategoryName("");
    setNewCategoryWeight("");
  };

  const removeCategory = (categoryId) => {
    if (categories.length <= 1) return;
    setCategories(categories.filter((c) => c.id !== categoryId));
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(categories.find((c) => c.id !== categoryId).id);
    }
  };

  const updateCategoryWeight = (categoryId, newWeight) => {
    const weight = parseFloat(newWeight);
    if (isNaN(weight) || weight < 0) return;

    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, weight } : cat,
      ),
    );
    setEditingCategory(null);
  };

  const updateCategoryType = (categoryId, courseType) => {
    setCategories(
      categories.map((c) => (c.id === categoryId ? { ...c, courseType } : c)),
    );
  };

  const clearAllData = () => {
    if (
      confirm("Are you sure you want to clear all data? This cannot be undone.")
    ) {
      setCategories([
        {
          id: Date.now(),
          name: "Category 1",
          weight: 100,
          assignments: [],
          courseType: "regular",
        },
      ]);
      setSelectedCategoryId(Date.now());
    }
  };

  const totalWeight = categories.reduce((sum, cat) => sum + cat.weight, 0);
  const isWeightValid = Math.abs(totalWeight - 100) < 0.01;

  return {
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedCategory,
    newAssignment,
    setNewAssignment,
    editingCategory,
    setEditingCategory,
    newCategoryName,
    setNewCategoryName,
    newCategoryWeight,
    setNewCategoryWeight,
    unweightedGPA,
    weightedGPA,
    overallGrade,
    addAssignment,
    removeAssignment,
    addCategory,
    removeCategory,
    updateCategoryWeight,
    updateCategoryType,
    clearAllData,
    totalWeight,
    isWeightValid,
  };
}
