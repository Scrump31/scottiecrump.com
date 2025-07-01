import { useState, useEffect, useCallback, useRef } from 'react'

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

interface ROICalculation {
  estimatedAutomationTime: number
  timePerRun: number
  timeSavedPerRun: number
  breakEvenRuns: number
  complexityMultiplier: number
  levelMultiplier: number
  capacityMultiplier: number
  baseAutomationTime: number
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

const COMPLEXITY_MULTIPLIERS = {
  4: 1.0, // Simple
  3: 1.5, // Moderate
  2: 3.0, // Complex
  1: 5.0, // Very complex
} as const

const TESTING_LEVEL_MULTIPLIERS = {
  3: 1.0, // Unit/Component
  2: 2.0, // API/Integration
  1: 4.0, // UI/End-to-End
} as const

const TEAM_CAPACITY_MULTIPLIERS = {
  4: 1.0, // High capacity
  3: 1.3, // Moderate capacity
  2: 2.0, // Limited capacity
  1: 3.0, // Very limited capacity
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

const DASH_PATTERN_SEGMENTS = {
  SHORT: 5,
  LONG: 10,
}

const CHART_CONSTANTS = {
  PADDING: {
    LEFT: 55,
    RIGHT: 40,
    TOP: 40,
    BOTTOM: 40,
  },
  AXIS: {
    Y_LABEL_OFFSET_X: 30,
    Y_LABEL_OFFSET_Y: -15,
    TIME_STEPS: 5,
    LABEL_OFFSET: 5,
    TICK_OFFSET: 3,
    X_LABEL_BOTTOM_OFFSET: 5,
    X_TICK_OFFSET: 15,
  },
  LINE: {
    GRID: 1,
    AXIS: 2,
    DATA: 3,
  },
  DASH_PATTERN: {
    COST: [DASH_PATTERN_SEGMENTS.SHORT, DASH_PATTERN_SEGMENTS.SHORT],
    BREAK_EVEN: [DASH_PATTERN_SEGMENTS.LONG, DASH_PATTERN_SEGMENTS.SHORT],
  },
  CIRCLE: {
    RADIUS: 6,
  },
  LABEL_OFFSETS: {
    BREAK_EVEN: 15,
    INVESTMENT: 10,
    SAVINGS: 10,
    COST_Y: 5,
  },
  SCALE_FACTOR: 1.1,
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
  const [roiCalculation, setRoiCalculation] = useState<ROICalculation | null>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)

  const drawROIChart = (
    manualTestTime: number,
    breakEvenRuns: number,
    automationCost: number,
    timePerRun: number
  ) => {
    const canvas = chartRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width } = canvas
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate values
    const timeSavedPerRun = manualTestTime - timePerRun
    const maxRuns = Math.max(breakEvenRuns * 2, 10)

    // Chart dimensions
    const { PADDING, SCALE_FACTOR } = CHART_CONSTANTS
    const paddingLeft = PADDING.LEFT
    const paddingRight = PADDING.RIGHT
    const paddingTop = PADDING.TOP
    const paddingBottom = PADDING.BOTTOM
    const chartWidth = width - paddingLeft - paddingRight
    const chartHeight = height - paddingTop - paddingBottom

    // Calculate max value for y-axis
    const maxSavings = timeSavedPerRun * maxRuns
    const maxValue = Math.max(automationCost, maxSavings) * SCALE_FACTOR

    // Draw grid lines and labels
    ctx.strokeStyle = '#e9ecef'
    ctx.lineWidth = 1

    // Horizontal grid lines with time labels
    const { AXIS } = CHART_CONSTANTS
    const timeSteps = AXIS.TIME_STEPS
    for (let i = 0; i <= timeSteps; i++) {
      const y = paddingTop + (chartHeight * i) / timeSteps
      const timeValue = Math.round(maxValue * (1 - i / timeSteps))

      ctx.beginPath()
      ctx.moveTo(paddingLeft, y)
      ctx.lineTo(width - paddingRight, y)
      ctx.stroke()

      // Add time labels on Y-axis
      ctx.fillStyle = '#666'
      ctx.font = '10px Segoe UI'
      ctx.textAlign = 'right'
      ctx.fillText(timeValue + 'm', paddingLeft - AXIS.LABEL_OFFSET, y + AXIS.TICK_OFFSET)
    }

    // Vertical grid lines with run count labels
    const runSteps = Math.min(10, maxRuns)
    const runInterval = Math.ceil(maxRuns / runSteps)

    for (let i = 0; i <= runSteps; i++) {
      const runValue = i * runInterval
      const x = paddingLeft + (runValue / maxRuns) * chartWidth

      if (x <= width - paddingRight) {
        ctx.strokeStyle = '#e9ecef'
        ctx.beginPath()
        ctx.moveTo(x, paddingTop)
        ctx.lineTo(x, height - paddingBottom)
        ctx.stroke()

        // Add run count labels on X-axis
        ctx.fillStyle = '#666'
        ctx.font = '10px Segoe UI'
        ctx.textAlign = 'center'
        ctx.fillText(
          runValue.toString(),
          x,
          height - paddingBottom + CHART_CONSTANTS.AXIS.X_TICK_OFFSET
        )
      }
    }

    // Draw axes
    ctx.strokeStyle = '#2c3e50'
    ctx.lineWidth = CHART_CONSTANTS.LINE.AXIS
    ctx.beginPath()
    ctx.moveTo(paddingLeft, height - paddingBottom)
    ctx.lineTo(width - paddingRight, height - paddingBottom)
    ctx.moveTo(paddingLeft, paddingTop)
    ctx.lineTo(paddingLeft, height - paddingBottom)
    ctx.stroke()

    // Draw investment cost line (horizontal)
    const costY = height - paddingBottom - (automationCost / maxValue) * chartHeight
    ctx.strokeStyle = '#e74c3c'
    ctx.lineWidth = CHART_CONSTANTS.LINE.DATA
    ctx.setLineDash(CHART_CONSTANTS.DASH_PATTERN.COST)
    ctx.beginPath()
    ctx.moveTo(paddingLeft, costY)
    ctx.lineTo(width - paddingRight, costY)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw cumulative savings line
    ctx.strokeStyle = '#27ae60'
    ctx.lineWidth = CHART_CONSTANTS.LINE.DATA
    ctx.beginPath()

    for (let run = 0; run <= maxRuns; run++) {
      const x = paddingLeft + (run / maxRuns) * chartWidth
      const cumulativeSavings = run * timeSavedPerRun
      const y = height - paddingBottom - (cumulativeSavings / maxValue) * chartHeight

      if (run === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw break-even point with label
    const breakEvenX = paddingLeft + (breakEvenRuns / maxRuns) * chartWidth
    ctx.strokeStyle = '#f39c12'
    ctx.lineWidth = CHART_CONSTANTS.LINE.DATA
    ctx.setLineDash(CHART_CONSTANTS.DASH_PATTERN.BREAK_EVEN)
    ctx.beginPath()
    ctx.moveTo(breakEvenX, paddingTop)
    ctx.lineTo(breakEvenX, height - paddingBottom)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw break-even circle
    const breakEvenSavings = breakEvenRuns * timeSavedPerRun
    const breakEvenY = height - paddingBottom - (breakEvenSavings / maxValue) * chartHeight
    ctx.fillStyle = '#f39c12'
    ctx.beginPath()
    ctx.arc(breakEvenX, breakEvenY, CHART_CONSTANTS.CIRCLE.RADIUS, 0, 2 * Math.PI)
    ctx.fill()

    // Add break-even label
    ctx.fillStyle = '#f39c12'
    ctx.font = 'bold 11px Segoe UI'
    ctx.textAlign = 'center'
    ctx.fillText(
      `${breakEvenRuns} runs`,
      breakEvenX,
      breakEvenY - CHART_CONSTANTS.LABEL_OFFSETS.BREAK_EVEN
    )

    // Add investment cost label
    ctx.fillStyle = '#e74c3c'
    ctx.font = '11px Segoe UI'
    ctx.textAlign = 'left'
    ctx.fillText(
      `Investment: ${automationCost}m`,
      paddingLeft + CHART_CONSTANTS.LABEL_OFFSETS.INVESTMENT,
      costY - CHART_CONSTANTS.LABEL_OFFSETS.COST_Y
    )

    // Add final savings label
    const finalSavings = maxRuns * timeSavedPerRun
    const finalY = height - paddingBottom - (finalSavings / maxValue) * chartHeight
    ctx.fillStyle = '#27ae60'
    ctx.textAlign = 'right'
    ctx.fillText(
      `Total savings: ${Math.round(finalSavings)}m`,
      width - paddingRight - CHART_CONSTANTS.LABEL_OFFSETS.SAVINGS,
      finalY - CHART_CONSTANTS.LABEL_OFFSETS.COST_Y
    )

    // Add axis titles
    ctx.fillStyle = '#2c3e50'
    ctx.font = '12px Segoe UI'
    ctx.textAlign = 'center'

    // X-axis title
    ctx.fillText(
      'Number of Test Runs',
      width / 2,
      height - CHART_CONSTANTS.AXIS.X_LABEL_BOTTOM_OFFSET
    )

    // Y-axis title
    ctx.save()
    ctx.translate(CHART_CONSTANTS.AXIS.Y_LABEL_OFFSET_X, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('Time (minutes)', 0, CHART_CONSTANTS.AXIS.Y_LABEL_OFFSET_Y)
    ctx.restore()
  }

  const calculateROI = useCallback(() => {
    // Get multipliers based on factor values
    const complexityMultiplier =
      COMPLEXITY_MULTIPLIERS[factors.technicalComplexity as keyof typeof COMPLEXITY_MULTIPLIERS]
    const levelMultiplier =
      TESTING_LEVEL_MULTIPLIERS[factors.testingLevel as keyof typeof TESTING_LEVEL_MULTIPLIERS]
    const capacityMultiplier =
      TEAM_CAPACITY_MULTIPLIERS[factors.teamCapacity as keyof typeof TEAM_CAPACITY_MULTIPLIERS]

    // Base automation time (in minutes)
    const baseAutomationTime = manualTestTime * ROI_MULTIPLIERS.AUTOMATION_TIME_FACTOR

    // Calculate estimated automation time with all multipliers
    const estimatedAutomationTime = Math.round(
      baseAutomationTime * complexityMultiplier * levelMultiplier * capacityMultiplier
    )

    // Calculate time per automated run (also affected by testing level)
    const baseTimePerRun = Math.max(
      ROI_MULTIPLIERS.MINIMUM_EXECUTION_TIME,
      manualTestTime * ROI_MULTIPLIERS.EXECUTION_SPEED_FACTOR
    )
    const runTimeMultiplier =
      TESTING_LEVEL_MULTIPLIERS[factors.testingLevel as keyof typeof TESTING_LEVEL_MULTIPLIERS] *
      0.5
    const timePerRun = Math.round(baseTimePerRun * runTimeMultiplier * 10) / 10 // Round to 1 decimal

    // Calculate time saved per run and break-even point
    const timeSavedPerRun = manualTestTime - timePerRun
    const breakEven = Math.ceil(estimatedAutomationTime / timeSavedPerRun)

    // Update state
    setBreakEvenRuns(breakEven)
    setRoiCalculation({
      estimatedAutomationTime,
      timePerRun,
      timeSavedPerRun,
      breakEvenRuns: breakEven,
      complexityMultiplier,
      levelMultiplier,
      capacityMultiplier,
      baseAutomationTime,
    })

    // Draw ROI chart after state update
    setTimeout(() => {
      if (chartRef.current) {
        drawROIChart(manualTestTime, breakEven, estimatedAutomationTime, timePerRun)
      }
    }, 0)
  }, [factors, manualTestTime])

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
        cardClass: 'consider',
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
      case 'consider':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600'
      case 'manual':
        return 'bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600'
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
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-800 dark:text-gray-100 text-xl">📈 ROI Timeline</h4>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Break-even: {breakEvenRuns} runs
              </span>
            </div>
            <div className="relative w-full h-[200px] bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <canvas ref={chartRef} width="400" height="200" className="w-full h-full"></canvas>
            </div>
            <div className="flex justify-center gap-5 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <span className="text-gray-700 dark:text-gray-300">Investment Cost</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-gray-700 dark:text-gray-300">Cumulative Savings</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span className="text-gray-700 dark:text-gray-300">Break-even Point</span>
              </div>
            </div>
          </div>

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
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-300">Estimated Break-even Point</span>
                <span className="font-bold py-1 px-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                  {breakEvenRuns} runs
                </span>
              </div>

              {roiCalculation && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                  <strong className="block mb-1 text-center">ROI Factors Applied:</strong>
                  <div className="text-center">
                    Base effort: {roiCalculation.baseAutomationTime} min × Complexity (
                    {roiCalculation.complexityMultiplier}x) × Level (
                    {roiCalculation.levelMultiplier}x) × Capacity (
                    {roiCalculation.capacityMultiplier}x)
                  </div>
                  <div className="mt-1 text-center">
                    = <strong>{roiCalculation.estimatedAutomationTime} min investment</strong> →
                    {/* */}
                    <strong> {roiCalculation.timeSavedPerRun.toFixed(1)} min saved/run</strong> →
                    {/* */}
                    <strong> {roiCalculation.breakEvenRuns} runs to break-even</strong>
                  </div>
                </div>
              )}
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
