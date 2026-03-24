import { Calculator, GraduationCap } from "lucide-react";

export function GPASummaryCards({
  courses,
  calculateUnweightedGPAFromCourses,
  calculateWeightedGPAFromCourses,
}) {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calculator size={24} className="text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Total Credits</div>
            <div className="text-3xl font-bold text-blue-600">
              {totalCredits.toFixed(1)}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">Total course credits</div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <GraduationCap size={24} className="text-indigo-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Standard GPA</div>
            <div className="text-3xl font-bold text-indigo-600">
              {calculateUnweightedGPAFromCourses()?.toFixed(3) || "N/A"}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">Unweighted 4.0 scale</div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <GraduationCap size={24} className="text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Weighted GPA</div>
            <div className="text-3xl font-bold text-purple-600">
              {calculateWeightedGPAFromCourses()?.toFixed(3) || "N/A"}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">Honors +0.5, AP +1.0</div>
      </div>
    </div>
  );
}
