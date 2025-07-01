import { useState, useEffect } from 'react'

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
  recommendations: string[]
}

const TestAutomationCalculator = () => {
  const [factors, setFactors] = useState<Factors>({
    businessImpact: 3,
    executionFrequency: 3,
    testingLevel: 2,
    featureStability: 3,
    technicalComplexity: 3,
    teamCapacity: 3,
  })
  const [manualTestTime, setManualTestTime] = useState<number>(15)
  const [totalScore, setTotalScore] = useState<number>(0)
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [breakEvenRuns, setBreakEvenRuns] = useState<number>(0)

  useEffect(() => {
    calculateAutomationScore()
  }, [factors, manualTestTime])

  const calculateAutomationScore = () => {
    const weights = {
      businessImpact: 20,
      executionFrequency: 20,
      testingLevel: 15,
      featureStability: 15,
      technicalComplexity: 15,
      teamCapacity: 15,
    }

    let totalScore = 0
    const breakdown: any = {}

    for (const [factor, value] of Object.entries(factors)) {
      let weighted
      if (factor === 'testingLevel') {
        // 3-point scale: 3=Unit, 2=API, 1=UI
        weighted = (value / 3) * weights[factor as keyof typeof weights]
      } else {
        // 4-point scale for other factors
        weighted = (value / 4) * weights[factor as keyof typeof weights]
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
  }

  const calculateROI = () => {
    const estimatedAutomationTime = manualTestTime * 2 // 2x manual time to automate
    const timePerRun = Math.max(0.5, manualTestTime * 0.1) // Automated runs much faster
    const breakEven = Math.ceil(estimatedAutomationTime / (manualTestTime - timePerRun))
    setBreakEvenRuns(breakEven)
  }

  const updateRecommendation = (score: number) => {
    let recommendation: Recommendation

    if (score >= 75) {
      recommendation = {
        title: '🎯 Automate This',
        subtitle: 'High Priority Candidate',
        cardClass: 'automate',
        recommendations: [
          'Prioritize this for automation in current sprint',
          'Start with the lowest appropriate testing level',
          'Include automation tasks in Definition of Done',
          'Consider pair programming with developers',
          'Set up CI/CD integration immediately',
        ],
      }
    } else if (score >= 50) {
      recommendation = {
        title: '🤔 Consider Automation',
        subtitle: 'Moderate Priority',
        cardClass: 'manual',
        recommendations: [
          'Evaluate after higher priority automation is complete',
          'Consider automating only critical happy paths',
          'Monitor execution frequency - automate if it increases',
          'Look for opportunities to improve testing level',
          'Assess if manual testing provides better ROI currently',
        ],
      }
    } else if (score >= 25) {
      recommendation = {
        title: '✋ Manual Testing',
        subtitle: 'Low Automation Priority',
        cardClass: 'manual',
        recommendations: [
          'Keep as manual testing for now',
          'Focus automation efforts on higher-value areas',
          'Consider exploratory testing approach',
          'Re-evaluate if feature becomes more stable',
          'Document manual test procedures thoroughly',
        ],
      }
    } else {
      recommendation = {
        title: '🚫 Avoid Automation',
        subtitle: 'Not Recommended',
        cardClass: 'avoid',
        recommendations: [
          'Do not automate - poor ROI expected',
          'Stick to manual testing or consider not testing',
          'Address underlying issues (stability, complexity) first',
          "Focus team's automation capacity elsewhere",
          'Re-assess if fundamental factors change',
        ],
      }
    }

    setRecommendation(recommendation)
  }

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

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-blue-500 text-white p-8 text-center">
        <h1 className="text-4xl mb-2 font-light">🤖 Test Automation Decision Calculator</h1>
        <p className="text-lg opacity-90">
          Make data-driven decisions about what to automate based on risk, ROI, and team capacity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[70vh]">
        <div className="p-10 bg-gray-50 border-r border-gray-200">
          <h2 className="text-2xl mb-8 text-gray-800 border-b-3 border-blue-500 pb-2">
            Assessment Criteria
          </h2>

          <div className="mb-6">
            <label htmlFor="businessImpact" className="block mb-2 font-semibold text-gray-700">
              Business Impact if Feature Breaks
            </label>
            <select
              id="businessImpact"
              value={factors.businessImpact}
              onChange={(e) => handleFactorChange('businessImpact', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="1">Low - Minor inconvenience</option>
              <option value="2">Medium - Some user frustration</option>
              <option value="3">High - Revenue/reputation impact</option>
              <option value="4">Critical - Major financial loss</option>
            </select>
            <div className="text-sm text-gray-600 mt-1 italic">
              Consider financial loss, user experience, and compliance risks
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="executionFrequency" className="block mb-2 font-semibold text-gray-700">
              Expected Test Execution Frequency
            </label>
            <select
              id="executionFrequency"
              value={factors.executionFrequency}
              onChange={(e) => handleFactorChange('executionFrequency', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="1">Rarely (&lt; 5 times)</option>
              <option value="2">Occasionally (5-20 times)</option>
              <option value="3">Regularly (20-50 times)</option>
              <option value="4">Very frequently (50+ times)</option>
            </select>
            <div className="text-sm text-gray-600 mt-1 italic">
              How often will this test run? Consider CI/CD frequency and regression needs
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="testingLevel" className="block mb-2 font-semibold text-gray-700">
              Most Appropriate Testing Level
            </label>
            <select
              id="testingLevel"
              value={factors.testingLevel}
              onChange={(e) => handleFactorChange('testingLevel', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="3">Unit/Component Level</option>
              <option value="2">API/Integration Level</option>
              <option value="1">UI/End-to-End Level</option>
            </select>
            <div className="text-sm text-gray-600 mt-1 italic">
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
            <label htmlFor="featureStability" className="block mb-2 font-semibold text-gray-700">
              Feature Stability
            </label>
            <select
              id="featureStability"
              value={factors.featureStability}
              onChange={(e) => handleFactorChange('featureStability', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="1">Highly volatile - frequent changes</option>
              <option value="2">Moderate - some changes expected</option>
              <option value="3">Stable - minimal changes</option>
              <option value="4">Very stable - rare changes</option>
            </select>
            <div className="text-sm text-gray-600 mt-1 italic">
              Volatile features require more test maintenance
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="technicalComplexity" className="block mb-2 font-semibold text-gray-700">
              Technical Complexity to Automate
            </label>
            <select
              id="technicalComplexity"
              value={factors.technicalComplexity}
              onChange={(e) => handleFactorChange('technicalComplexity', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="4">Simple - straightforward automation</option>
              <option value="3">Moderate - some challenges</option>
              <option value="2">Complex - significant effort required</option>
              <option value="1">Very complex - major technical hurdles</option>
            </select>
            <div className="text-sm text-gray-600 mt-1 italic">
              Consider test data setup, environment dependencies, and technical constraints
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="teamCapacity" className="block mb-2 font-semibold text-gray-700">
              Team Automation Capacity
            </label>
            <select
              id="teamCapacity"
              value={factors.teamCapacity}
              onChange={(e) => handleFactorChange('teamCapacity', parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500"
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
            <div className="text-sm text-gray-600 mt-1 italic">
              Team's current availability and bandwidth for taking on automation work
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="manualTestTime" className="block mb-2 font-semibold text-gray-700">
              Manual Test Execution Time (minutes)
            </label>
            <input
              type="number"
              id="manualTestTime"
              value={manualTestTime}
              min="1"
              max="1440"
              onChange={(e) => handleManualTimeChange(parseInt(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500"
            />
            <div className="text-sm text-gray-600 mt-1 italic">
              Time to execute this test manually, including setup
            </div>
          </div>
        </div>

        <div className="p-10 bg-white flex flex-col justify-center">
          {recommendation && (
            <div
              className={`${
                recommendation.cardClass === 'automate'
                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                  : recommendation.cardClass === 'manual'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  : recommendation.cardClass === 'avoid'
                  ? 'bg-gradient-to-r from-pink-400 to-pink-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
              } text-white p-8 rounded-2xl text-center mb-8 shadow-lg`}
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

          <div className="bg-gray-50 p-5 rounded-xl mb-5">
            <h4 className="text-gray-800 mb-4 text-xl">📊 Score Breakdown</h4>
            <div>
              {breakdown &&
                Object.entries(breakdown).map(([factor, data]) => (
                  <div
                    className="flex justify-between items-center py-2 border-b border-gray-200"
                    key={factor}
                  >
                    <span>{factorNames[factor as keyof typeof factorNames]}</span>
                    <span className="font-bold py-1 px-2 rounded bg-gray-200 text-gray-800">
                      {Math.round(data.weighted)}/{data.weight}
                    </span>
                  </div>
                ))}
              <div className="flex justify-between items-center py-2">
                <span>Estimated Break-even Point</span>
                <span className="font-bold py-1 px-2 rounded bg-gray-200 text-gray-800">
                  {breakEvenRuns} runs
                </span>
              </div>
            </div>
          </div>

          {recommendation && (
            <div className="bg-gray-50 p-5 rounded-xl">
              <h4 className="text-gray-800 mb-4 text-xl">💡 Recommendations</h4>
              <ul className="list-none p-0">
                {recommendation.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 last:border-b-0 pl-6 relative"
                  >
                    <span className="absolute left-0 text-green-500 font-bold">✓</span>
                    {rec}
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
