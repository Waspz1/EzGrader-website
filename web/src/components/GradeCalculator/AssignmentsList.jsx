import { Plus, Trash2 } from "lucide-react";
import {
  calculateCategoryGrade,
  getLetterGrade,
} from "@/utils/gradeCalculations";

export function AssignmentsList({
  selectedCategory,
  newAssignment,
  setNewAssignment,
  addAssignment,
  removeAssignment,
}) {
  if (!selectedCategory) return null;

  return (
    <div className="flex-1">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {selectedCategory.name} Assignments
        </h2>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-3">
            Add Assignment
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Assignment name"
              value={newAssignment.name}
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  name: e.target.value,
                })
              }
              onKeyDown={(e) => e.key === "Enter" && addAssignment()}
              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Score"
              value={newAssignment.score}
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  score: e.target.value,
                })
              }
              onKeyDown={(e) => e.key === "Enter" && addAssignment()}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Total"
              value={newAssignment.total}
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  total: e.target.value,
                })
              }
              onKeyDown={(e) => e.key === "Enter" && addAssignment()}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={addAssignment}
            className="mt-3 w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Assignment
          </button>
        </div>

        {selectedCategory.assignments.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No assignments yet. Add one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedCategory.assignments.map((assignment) => {
              const percentage = (assignment.score / assignment.total) * 100;
              const letterGrade = getLetterGrade(percentage);

              return (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {assignment.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {assignment.score} / {assignment.total} points
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${letterGrade.color}`}
                      >
                        {letterGrade.letter}
                      </div>
                      <div className="text-sm text-gray-600">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                    <button
                      onClick={() => removeAssignment(assignment.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedCategory.assignments.length > 0 && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                Category Average
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">
                  {calculateCategoryGrade(selectedCategory.assignments).toFixed(
                    2,
                  )}
                  %
                </span>
                <span
                  className={`text-2xl font-bold ${getLetterGrade(calculateCategoryGrade(selectedCategory.assignments)).color}`}
                >
                  {
                    getLetterGrade(
                      calculateCategoryGrade(selectedCategory.assignments),
                    ).letter
                  }
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
