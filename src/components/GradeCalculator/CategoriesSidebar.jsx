import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import {
  calculateCategoryGrade,
  getLetterGrade,
} from "@/utils/gradeCalculations";

export function CategoriesSidebar({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  editingCategory,
  setEditingCategory,
  newCategoryName,
  setNewCategoryName,
  newCategoryWeight,
  setNewCategoryWeight,
  totalWeight,
  isWeightValid,
  addCategory,
  removeCategory,
  updateCategoryWeight,
  updateCategoryType,
}) {
  return (
    <div className="lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <div
            className={`text-sm font-medium ${isWeightValid ? "text-green-600" : "text-red-600"}`}
          >
            {totalWeight.toFixed(0)}%
          </div>
        </div>

        {!isWeightValid && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-700">⚠️ Weights must total 100%</p>
          </div>
        )}

        <div className="space-y-2 mb-4">
          {categories.map((cat) => {
            const catGrade = calculateCategoryGrade(cat.assignments);
            const letterGrade = getLetterGrade(catGrade);

            return (
              <div
                key={cat.id}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => setSelectedCategoryId(cat.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{cat.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {editingCategory === cat.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                            defaultValue={cat.weight}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateCategoryWeight(cat.id, e.target.value);
                              } else if (e.key === "Escape") {
                                setEditingCategory(null);
                              }
                            }}
                            autoFocus
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const input =
                                e.target.parentElement.querySelector("input");
                              updateCategoryWeight(cat.id, input.value);
                            }}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCategory(null);
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm text-gray-600">
                            {cat.weight}%
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCategory(cat.id);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                          >
                            <Edit2 size={12} />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={cat.courseType || "regular"}
                        onChange={(e) => {
                          updateCategoryType(cat.id, e.target.value);
                        }}
                        className="text-xs px-2 py-1 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="regular">Regular</option>
                        <option value="honors">Honors (+0.5)</option>
                        <option value="ap">AP (+1.0)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${letterGrade.color}`}>
                      {letterGrade.letter}
                    </span>
                    {categories.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCategory(cat.id);
                        }}
                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
                {catGrade !== null && (
                  <div className="text-xs text-gray-500">
                    {catGrade.toFixed(2)}% • {cat.assignments.length} assignment
                    {cat.assignments.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Add Category
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Weight %"
                value={newCategoryWeight}
                onChange={(e) => setNewCategoryWeight(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={addCategory}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
