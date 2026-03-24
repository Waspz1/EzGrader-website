"use client";

import { useState } from "react";
import { useGradeCalculator } from "@/hooks/useGradeCalculator";
import { useGPACalculator } from "@/hooks/useGPACalculator";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { getLetterGrade } from "@/utils/gradeCalculations";
import { Header } from "@/components/GradeCalculator/Header";
import { CategoriesSidebar } from "@/components/GradeCalculator/CategoriesSidebar";
import { AssignmentsList } from "@/components/GradeCalculator/AssignmentsList";
import { GPASummaryCards } from "@/components/GPACalculator/GPASummaryCards";
import { AddCourseForm } from "@/components/GPACalculator/AddCourseForm";
import { CoursesList } from "@/components/GPACalculator/CoursesList";

export default function GradeCalculator() {
  const [activeTab, setActiveTab] = useState("grades");

  const gradeCalculator = useGradeCalculator();
  const gpaCalculator = useGPACalculator();
  const { showInstallBanner, handleInstallClick } = useInstallPrompt();

  const overallLetterGrade = getLetterGrade(gradeCalculator.overallGrade);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        overallGrade={gradeCalculator.overallGrade}
        overallLetterGrade={overallLetterGrade}
        unweightedGPA={gradeCalculator.unweightedGPA}
        weightedGPA={gradeCalculator.weightedGPA}
        calculateUnweightedGPAFromCourses={
          gpaCalculator.calculateUnweightedGPAFromCourses
        }
        calculateWeightedGPAFromCourses={
          gpaCalculator.calculateWeightedGPAFromCourses
        }
        showInstallBanner={showInstallBanner}
        handleInstallClick={handleInstallClick}
        clearAllData={gradeCalculator.clearAllData}
        clearGPAData={gpaCalculator.clearGPAData}
      />

      {activeTab === "grades" ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <CategoriesSidebar
              categories={gradeCalculator.categories}
              selectedCategoryId={gradeCalculator.selectedCategoryId}
              setSelectedCategoryId={gradeCalculator.setSelectedCategoryId}
              editingCategory={gradeCalculator.editingCategory}
              setEditingCategory={gradeCalculator.setEditingCategory}
              newCategoryName={gradeCalculator.newCategoryName}
              setNewCategoryName={gradeCalculator.setNewCategoryName}
              newCategoryWeight={gradeCalculator.newCategoryWeight}
              setNewCategoryWeight={gradeCalculator.setNewCategoryWeight}
              totalWeight={gradeCalculator.totalWeight}
              isWeightValid={gradeCalculator.isWeightValid}
              addCategory={gradeCalculator.addCategory}
              removeCategory={gradeCalculator.removeCategory}
              updateCategoryWeight={gradeCalculator.updateCategoryWeight}
              updateCategoryType={gradeCalculator.updateCategoryType}
            />

            <AssignmentsList
              selectedCategory={gradeCalculator.selectedCategory}
              newAssignment={gradeCalculator.newAssignment}
              setNewAssignment={gradeCalculator.setNewAssignment}
              addAssignment={gradeCalculator.addAssignment}
              removeAssignment={gradeCalculator.removeAssignment}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <GPASummaryCards
            courses={gpaCalculator.courses}
            calculateUnweightedGPAFromCourses={
              gpaCalculator.calculateUnweightedGPAFromCourses
            }
            calculateWeightedGPAFromCourses={
              gpaCalculator.calculateWeightedGPAFromCourses
            }
          />

          <AddCourseForm
            newCourse={gpaCalculator.newCourse}
            setNewCourse={gpaCalculator.setNewCourse}
            addCourse={gpaCalculator.addCourse}
          />

          <CoursesList
            courses={gpaCalculator.courses}
            removeCourse={gpaCalculator.removeCourse}
            clearGPAData={gpaCalculator.clearGPAData}
          />
        </div>
      )}
    </div>
  );
}


