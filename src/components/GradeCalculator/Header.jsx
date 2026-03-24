import { Calculator, GraduationCap } from "lucide-react";

export function Header({
  activeTab,
  setActiveTab,
  overallGrade,
  overallLetterGrade,
  unweightedGPA,
  weightedGPA,
  calculateUnweightedGPAFromCourses,
  calculateWeightedGPAFromCourses,
  showInstallBanner,
  handleInstallClick,
  clearAllData,
  clearGPAData,
}) {
  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ezgrade</h1>
              <p className="text-sm text-gray-500 mt-1">
                Track your assignments and calculate your GPA
              </p>
            </div>

            <div className="flex items-center gap-4">
              {activeTab === "grades" ? (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">
                    Overall Grade
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-4xl font-bold ${overallLetterGrade.color}`}
                    >
                      {overallLetterGrade.letter}
                    </span>
                    {overallGrade !== null && (
                      <span className="text-xl text-gray-600">
                        {overallGrade.toFixed(2)}%
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">GPA</div>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-xs text-gray-500">Unweighted</div>
                      <div className="text-3xl font-bold text-indigo-600">
                        {calculateUnweightedGPAFromCourses() !== null
                          ? calculateUnweightedGPAFromCourses().toFixed(3)
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Weighted</div>
                      <div className="text-3xl font-bold text-purple-600">
                        {calculateWeightedGPAFromCourses() !== null
                          ? calculateWeightedGPAFromCourses().toFixed(3)
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {showInstallBanner && (
                  <button
                    onClick={handleInstallClick}
                    className="px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    📥 Install App
                  </button>
                )}
                <button
                  onClick={activeTab === "grades" ? clearAllData : clearGPAData}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("grades")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "grades"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Calculator size={18} />
              Grade Calculator
            </button>
            <button
              onClick={() => setActiveTab("gpa")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "gpa"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <GraduationCap size={18} />
              GPA Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
