import { useState, useEffect, useCallback } from 'react'

interface Factor {
  raw: number
  weighted: number
  weight: number
}

interface Breakdown {
  businessImpact: Factor
  executionFrequency: Factor
  testingLevel: Factor
  featureStability: Factor
  technicalComplexity: Factor
  teamCapacity: Factor
}

interface Factors {
  businessImpact: number
  executionFrequency: number
  testingLevel: number
  featureStability: number
  technicalComplexity: number
  teamCapacity: number
}

interface Recommendation {
  title: string
  subtitle: string
  cardClass: string
  recommendations: Array<{
    id: string
    text: string
  }>
}

const SCORE_THRESHOLDS = {
  AUTOMATE: 75,
  CONSIDER: 50,
  MANUAL: 25,
} as const

const SCALE_VALUES = {
  TESTING_LEVEL_MAX: 3,
  STANDARD_FACTOR_MAX: 4,
} as const

const WEIGHTS = {
  HIGH_PRIORITY: 20,
  MEDIUM_PRIORITY: 15,
} as const

const ROI_MULTIPLIERS = {
  AUTOMATION_TIME_FACTOR: 2,
  EXECUTION_SPEED_FACTOR: 0.1,
  MINIMUM_EXECUTION_TIME: 0.5,
} as const

const DEFAULT_VALUES = {
  BUSINESS_IMPACT: 3,
  EXECUTION_FREQUENCY: 3,
  TESTING_LEVEL: 2,
  FEATURE_STABILITY: 3,
  TECHNICAL_COMPLEXITY: 3,
  TEAM_CAPACITY: 3,
  MANUAL_TEST_TIME: 15,
} as const

const TestAutomationCalculator = () => {
  const [factors, setFactors] = useState<Factors>({
    businessImpact: DEFAULT_VALUES.BUSINESS_IMPACT,
    executionFrequency: DEFAULT_VALUES.EXECUTION_FREQUENCY,
    testingLevel: DEFAULT_VALUES.TESTING_LEVEL,
    featureStability: DEFAULT_VALUES.FEATURE_STABILITY,
    technicalComplexity: DEFAULT_VALUES.TECHNICAL_COMPLEXITY,
    teamCapacity: DEFAULT_VALUES.TEAM_CAPACITY,
  })
  const [manualTestTime, setManualTestTime] = useState<number>(DEFAULT_VALUES.MANUAL_TEST_TIME)
  const [totalScore, setTotalScore] = useState<number>(0)
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [breakEvenRuns, setBreakEvenRuns] = useState<number>(0)

  const calculateROI = useCallback(() => {
    const estimatedAutomationTime = manualTestTime * ROI_MULTIPLIERS.AUTOMATION_TIME_FACTOR
    const timePerRun = Math.max(
      ROI_MULTIPLIERS.MINIMUM_EXECUTION_TIME,
      manualTestTime * ROI_MULTIPLIERS.EXECUTION_SPEED_FACTOR
    )
    const breakEven = Math.ceil(estimatedAutomationTime / (manualTestTime - timePerRun))
    setBreakEvenRuns(breakEven)
  }, [manualTestTime])

  const updateRecommendation = useCallback((score: number) => {
    let recommendation: Recommendation

    if (score >= SCORE_THRESHOLDS.AUTOMATE) {
      recommendation = {
        title: '🎯 Automate This',
        subtitle: 'High Priority Candidate',
        cardClass: 'automate',
        recommendations: [
          { id: 'auto-1', text: 'Prioritize this for automation in current sprint' },
          { id: 'auto-2', text: 'Start with the lowest appropriate testing level' },
          { id: 'auto-3', text: 'Include automation tasks in Definition of Done' },
          { id: 'auto-4', text: 'Consider pair programming with developers' },
          { id: 'auto-5', text: 'Set up CI/CD integration immediately' },
        ],
      }
    } else if (score >= SCORE_THRESHOLDS.CONSIDER) {
      recommendation = {
        title: '🤔 Consider Automation',
        subtitle: 'Moderate Priority',
        cardClass: 'manual',
        recommendations: [
          { id: 'consider-1', text: 'Evaluate after higher priority automation is complete' },
          { id: 'consider-2', text: 'Consider automating only critical happy paths' },
          { id: 'consider-3', text: 'Monitor execution frequency - automate if it increases' },
          { id: 'consider-4', text: 'Look for opportunities to improve testing level' },
          { id: 'consider-5', text: 'Assess if manual testing provides better ROI currently' },
        ],
      }
    } else if (score >= SCORE_THRESHOLDS.MANUAL) {
      recommendation = {
        title: '✋ Manual Testing',
        subtitle: 'Low Automation Priority',
        cardClass: 'manual',
        recommendations: [
          { id: 'manual-1', text: 'Keep as manual testing for now' },
          { id: 'manual-2', text: 'Focus automation efforts on higher-value areas' },
          { id: 'manual-3', text: 'Consider exploratory testing approach' },
          { id: 'manual-4', text: 'Re-evaluate if feature becomes more stable' },
          { id: 'manual-5', text: 'Document manual test procedures thoroughly' },
        ],
      }
    } else {
      recommendation = {
        title: '🚫 Avoid Automation',
        subtitle: 'Not Recommended',
        cardClass: 'avoid',
        recommendations: [
          { id: 'avoid-1', text: 'Do not automate - poor ROI expected' },
          { id: 'avoid-2', text: 'Stick to manual testing or consider not testing' },
          { id: 'avoid-3', text: 'Address underlying issues (stability, complexity) first' },
          { id: 'avoid-4', text: "Focus team's automation capacity elsewhere" },
          { id: 'avoid-5', text: 'Re-assess if fundamental factors change' },
        ],
      }
    }

    setRecommendation(recommendation)
  }, [])

  const calculateAutomationScore = useCallback(() => {
    const weights = {
      businessImpact: WEIGHTS.HIGH_PRIORITY,
      executionFrequency: WEIGHTS.HIGH_PRIORITY,
      testingLevel: WEIGHTS.MEDIUM_PRIORITY,
      featureStability: WEIGHTS.MEDIUM_PRIORITY,
      technicalComplexity: WEIGHTS.MEDIUM_PRIORITY,
      teamCapacity: WEIGHTS.MEDIUM_PRIORITY,
    }

    let totalScore = 0
    const breakdown: any = {}

    for (const [factor, value] of Object.entries(factors)) {
      let weighted
      if (factor === 'testingLevel') {
        weighted =
          (value / SCALE_VALUES.TESTING_LEVEL_MAX) * weights[factor as keyof typeof weights]
      } else {
        weighted =
          (value / SCALE_VALUES.STANDARD_FACTOR_MAX) * weights[factor as keyof typeof weights]
      }
      totalScore += weighted
      breakdown[factor] = {
        raw: value,
        weighted: weighted,
        weight: weights[factor as keyof typeof weights],
      }
    }

    setTotalScore(Math.round(totalScore))
    setBreakdown(breakdown)
    updateRecommendation(Math.round(totalScore))
    calculateROI()
  }, [calculateROI, factors, updateRecommendation])

  const handleFactorChange = (factor: keyof Factors, value: number) => {
    setFactors((prev) => ({
      ...prev,
      [factor]: value,
    }))
  }

  const handleManualTimeChange = (value: number) => {
    setManualTestTime(value)
  }

  const factorNames = {
    businessImpact: 'Business Impact',
    executionFrequency: 'Execution Frequency',
    testingLevel: 'Testing Level',
    featureStability: 'Feature Stability',
    technicalComplexity: 'Technical Complexity',
    teamCapacity: 'Team Capacity',
  }

  const getCardGradientClass = (cardClass: string): string => {
    switch (cardClass) {
      case 'automate':
        return 'bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700'
      case 'manual':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600'
      case 'avoid':
        return 'bg-gradient-to-r from-pink-400 to-pink-600 dark:from-pink-500 dark:to-pink-700'
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700'
    }
  }

  useEffect(() => {
    calculateAutomationScore()
  }, [calculateAutomationScore])

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-blue-500 dark:from-gray-900 dark:to-blue-600 text-white p-8 text-center">
        <h1 className="text-4xl mb-2 font-light">🤖 Test Automation Decision Calculator</h1>
        <p className="text-lg opacity-90">
          Make data-driven decisions about what to automate based on risk, ROI, and team capacity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[70vh]">
        <div className="p-10 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl mb-8 text-gray-800 dark:text-gray-100 border-b-3 border-blue-500 pb-2">
            Assessment Criteria
          </h2>

          <div className="mb-6">
            <label
              htmlFor="businessImpact"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Business Impact if Feature Breaks
            </label>
            <select
              id="businessImpact"
              value={factors.businessImpact}
              onChange={(e) => handleFactorChange('businessImpact', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="1">Low - Minor inconvenience</option>
              <option value="2">Medium - Some user frustration</option>
              <option value="3">High - Revenue/reputation impact</option>
              <option value="4">Critical - Major financial loss</option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              Consider financial loss, user experience, and compliance risks
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="executionFrequency"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Expected Test Execution Frequency
            </label>
            <select
              id="executionFrequency"
              value={factors.executionFrequency}
              onChange={(e) => handleFactorChange('executionFrequency', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="1">Rarely (&lt; 5 times)</option>
              <option value="2">Occasionally (5-20 times)</option>
              <option value="3">Regularly (20-50 times)</option>
              <option value="4">Very frequently (50+ times)</option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              How often will this test run? Consider CI/CD frequency and regression needs
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="testingLevel"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Most Appropriate Testing Level
            </label>
            <select
              id="testingLevel"
              value={factors.testingLevel}
              onChange={(e) => handleFactorChange('testingLevel', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="3">Unit/Component Level</option>
              <option value="2">API/Integration Level</option>
              <option value="1">UI/End-to-End Level</option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              <strong>Unit:</strong> Individual functions/components in isolation
              <br />
              <strong>API/Integration:</strong> Individual endpoints, single integrations & business
              workflows through API calls
              <br />
              <strong>UI/End-to-End:</strong> User workflows through the interface (slowest, most
              brittle)
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="featureStability"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Feature Stability
            </label>
            <select
              id="featureStability"
              value={factors.featureStability}
              onChange={(e) => handleFactorChange('featureStability', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="1">Highly volatile - frequent changes</option>
              <option value="2">Moderate - some changes expected</option>
              <option value="3">Stable - minimal changes</option>
              <option value="4">Very stable - rare changes</option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              Volatile features require more test maintenance
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="technicalComplexity"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Technical Complexity to Automate
            </label>
            <select
              id="technicalComplexity"
              value={factors.technicalComplexity}
              onChange={(e) => handleFactorChange('technicalComplexity', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="4">Simple - straightforward automation</option>
              <option value="3">Moderate - some challenges</option>
              <option value="2">Complex - significant effort required</option>
              <option value="1">Very complex - major technical hurdles</option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              Consider test data setup, environment dependencies, and technical constraints
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="teamCapacity"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Team Automation Capacity
            </label>
            <select
              id="teamCapacity"
              value={factors.teamCapacity}
              onChange={(e) => handleFactorChange('teamCapacity', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="1">Very Limited - Team is fully committed to other priorities</option>
              <option value="2">
                Limited - Minor automation work possible, major backlog exists
              </option>
              <option value="3">
                Moderate - Some dedicated time available for automation work
              </option>
              <option value="4">
                High - Significant capacity available for automation initiatives
              </option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              Team's current availability and bandwidth for taking on automation work
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="manualTestTime"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Manual Test Execution Time (minutes)
            </label>
            <input
              type="number"
              id="manualTestTime"
              value={manualTestTime}
              min="1"
              max="1440"
              onChange={(e) => handleManualTimeChange(parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
              Time to execute this test manually, including setup
            </div>
          </div>
        </div>

        <div className="p-10 bg-white dark:bg-gray-800 flex flex-col justify-center">
          {recommendation && (
            <div
              className={`${getCardGradientClass(
                recommendation.cardClass
              )} text-white p-8 rounded-2xl text-center mb-8 shadow-lg`}
            >
              <div className="text-3xl font-bold mb-2">{recommendation.title}</div>
              <div className="text-xl opacity-90 mb-5">{recommendation.subtitle}</div>
              <div className="bg-white bg-opacity-20 p-4 rounded-xl mb-5">
                <div>Automation Score</div>
                <div className="text-5xl font-bold my-1">{totalScore}</div>
                <div>out of 100</div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl mb-5">
            <h4 className="text-gray-800 dark:text-gray-100 mb-4 text-xl">📊 Score Breakdown</h4>
            <div>
              {breakdown &&
                Object.entries(breakdown).map(([factor, data]) => (
                  <div
                    className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600"
                    key={factor}
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {factorNames[factor as keyof typeof factorNames]}
                    </span>
                    <span className="font-bold py-1 px-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                      {Math.round(data.weighted)}/{data.weight}
                    </span>
                  </div>
                ))}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 dark:text-gray-300">Estimated Break-even Point</span>
                <span className="font-bold py-1 px-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                  {breakEvenRuns} runs
                </span>
              </div>
            </div>
          </div>

          {recommendation && (
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl">
              <h4 className="text-gray-800 dark:text-gray-100 mb-4 text-xl">💡 Recommendations</h4>
              <ul className="list-none p-0">
                {recommendation.recommendations.map((rec) => (
                  <li
                    key={rec.id}
                    className="py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 pl-6 relative text-gray-700 dark:text-gray-300"
                  >
                    <span className="absolute left-0 text-green-500 dark:text-green-400 font-bold">
                      ✓
                    </span>
                    {rec.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestAutomationCalculator
