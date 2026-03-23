import { Plus } from "lucide-react";

export function AddCourseForm({ newCourse, setNewCourse, addCourse }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Plus size={24} className="text-indigo-600" />
        Add Course
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Name
          </label>
          <input
            type="text"
            placeholder="e.g., AP Calculus BC"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && addCourse()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Letter Grade
          </label>
          <select
            value={newCourse.grade}
            onChange={(e) =>
              setNewCourse({ ...newCourse, grade: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Grade</option>
            <option value="A+">A+ (4.0)</option>
            <option value="A">A (4.0)</option>
            <option value="A-">A- (3.7)</option>
            <option value="B+">B+ (3.3)</option>
            <option value="B">B (3.0)</option>
            <option value="B-">B- (2.7)</option>
            <option value="C+">C+ (2.3)</option>
            <option value="C">C (2.0)</option>
            <option value="C-">C- (1.7)</option>
            <option value="D+">D+ (1.3)</option>
            <option value="D">D (1.0)</option>
            <option value="D-">D- (0.7)</option>
            <option value="F">F (0.0)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Credits
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            placeholder="e.g., 1.0"
            value={newCourse.credits}
            onChange={(e) =>
              setNewCourse({ ...newCourse, credits: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && addCourse()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Type
          </label>
          <div className="flex gap-3">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="courseType"
                value="regular"
                checked={newCourse.type === "regular"}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, type: e.target.value })
                }
                className="peer hidden"
              />
              <div className="px-4 py-3 border-2 border-gray-300 rounded-lg text-center transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:border-gray-400">
                <div className="font-medium">Regular</div>
                <div className="text-xs text-gray-500">No weight</div>
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="courseType"
                value="honors"
                checked={newCourse.type === "honors"}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, type: e.target.value })
                }
                className="peer hidden"
              />
              <div className="px-4 py-3 border-2 border-gray-300 rounded-lg text-center transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:border-gray-400">
                <div className="font-medium">Honors</div>
                <div className="text-xs text-gray-500">+0.5 weight</div>
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="courseType"
                value="ap"
                checked={newCourse.type === "ap"}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, type: e.target.value })
                }
                className="peer hidden"
              />
              <div className="px-4 py-3 border-2 border-gray-300 rounded-lg text-center transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:border-gray-400">
                <div className="font-medium">AP</div>
                <div className="text-xs text-gray-500">+1.0 weight</div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={addCourse}
            disabled={!newCourse.name || !newCourse.grade || !newCourse.credits}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}
