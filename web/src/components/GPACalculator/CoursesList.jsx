import { Trash2, GraduationCap } from "lucide-react";
import { gradeToGPA } from "@/utils/gradeCalculations";

export function CoursesList({ courses, removeCourse, clearGPAData }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Courses ({courses.length})
        </h2>
        {courses.length > 0 && (
          <button
            onClick={clearGPAData}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Clear All Courses
          </button>
        )}
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16">
          <GraduationCap size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg mb-2">No courses added yet</p>
          <p className="text-gray-400 text-sm">
            Add a course above to start calculating your GPA
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => {
            const standardGpa = gradeToGPA(course.grade);
            let weightedGpa = standardGpa;
            if (course.type === "honors") weightedGpa += 0.5;
            if (course.type === "ap") weightedGpa += 1.0;
            weightedGpa = Math.min(weightedGpa, 5.0);

            return (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-all gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                      {course.name}
                    </h3>
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
                        course.type === "ap"
                          ? "bg-purple-100 text-purple-700"
                          : course.type === "honors"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {course.type === "regular"
                        ? "Regular"
                        : course.type === "honors"
                          ? "Honors (+0.5)"
                          : "AP (+1.0)"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Credits:</span>
                      <span>{course.credits}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Standard GPA:</span>
                      <span className="text-indigo-600 font-semibold">
                        {standardGpa.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Weighted GPA:</span>
                      <span className="text-purple-600 font-semibold">
                        {weightedGpa.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:ml-4">
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {course.grade}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                      Letter Grade
                    </div>
                  </div>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {courses.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            How GPA is Calculated
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Standard GPA:</strong> Calculated on a 4.0 scale without
              course type weighting
            </p>
            <p>
              <strong>Weighted GPA:</strong> Honors courses add 0.5 points, AP
              courses add 1.0 point (max 5.0)
            </p>
            <p className="text-xs text-gray-600 mt-2">
              GPA = (Sum of grade points × credits) ÷ Total credits
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
