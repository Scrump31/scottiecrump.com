import { useState, useEffect, useRef, useCallback } from 'react'

const MINUTES_IN_HOUR = 60
const PERCENTAGE_DIVISOR = 100
const PERCENTAGE_MULTIPLIER = 100
const DECIMAL_PRECISION = 0
const HOURS_DECIMAL_PRECISION = 1
const EXCELLENT_ROI_THRESHOLD = 0.5
const GOOD_ROI_THRESHOLD = 0.8

const CHART_COLORS = {
  manualTesting: {
    border: '#e74c3c',
    background: 'rgba(231, 76, 60, 0.1)',
  },
  automation: {
    border: '#3498db',
    background: 'rgba(52, 152, 219, 0.1)',
  },
  breakEven: {
    border: '#f39c12',
    width: 2,
  },
}

const CHART_DISPLAY_CONSTANTS = {
  TICK_STEPS: 10,
  CHART_TITLE: 'Cumulative Cost Comparison (Hours)',
  X_AXIS_TITLE: 'Test Runs',
  Y_AXIS_TITLE: 'Hours',
}
const CHART_TENSION = 0.1
const NUMBER_GROUP_REGEX = /\B(?=(\d{3})+(?!\d))/g
const NUMBER_GROUP_SEPARATOR = ','

// Input constraints
const MIN_MANUAL_TIME = 0.1
const MANUAL_TIME_STEP = 0.1
const MIN_NUM_TESTS = 1
const NUM_TESTS_STEP = 1
const MIN_NUM_RUNS = 1
const NUM_RUNS_STEP = 1
const MIN_HOURLY_RATE = 1
const HOURLY_RATE_STEP = 1
const MIN_FRAMEWORK_TIME = 0
const FRAMEWORK_TIME_STEP = 1
const MIN_TEST_CODING_TIME = 1
const TEST_CODING_TIME_STEP = 1
const MIN_AUTO_RUN_TIME = 0.1
const AUTO_RUN_TIME_STEP = 0.1
const MIN_FAILURE_RATE = 0
const FAILURE_RATE_STEP = 1
const MIN_MAINTENANCE_TIME = 0
const MAINTENANCE_TIME_STEP = 1

// Default initial values
const DEFAULT_MANUAL_TIME = 5
const DEFAULT_NUM_TESTS = 100
const DEFAULT_NUM_RUNS = 50
const DEFAULT_HOURLY_RATE = 100
const DEFAULT_FRAMEWORK_TIME = 80
const DEFAULT_TEST_CODING_TIME = 30
const DEFAULT_AUTO_RUN_TIME = 30
const DEFAULT_FAILURE_RATE = 5
const DEFAULT_MAINTENANCE_TIME = 15

// Scenario constants
// Small project scenario
const SMALL_SCENARIO = {
  MANUAL_TIME: 3,
  NUM_TESTS: 25,
  NUM_RUNS: 20,
  FRAMEWORK_TIME: 40,
  TEST_CODING_TIME: 20,
  AUTO_RUN_TIME: 15,
  FAILURE_RATE: 3,
  MAINTENANCE_TIME: 10,
}

// Medium project scenario
const MEDIUM_SCENARIO = {
  MANUAL_TIME: 5,
  NUM_TESTS: 100,
  NUM_RUNS: 50,
  FRAMEWORK_TIME: 80,
  TEST_CODING_TIME: 30,
  AUTO_RUN_TIME: 30,
  FAILURE_RATE: 5,
  MAINTENANCE_TIME: 15,
}

// Large project scenario
const LARGE_SCENARIO = {
  MANUAL_TIME: 8,
  NUM_TESTS: 500,
  NUM_RUNS: 100,
  FRAMEWORK_TIME: 160,
  TEST_CODING_TIME: 45,
  AUTO_RUN_TIME: 45,
  FAILURE_RATE: 8,
  MAINTENANCE_TIME: 20,
}

const ROI_DISPLAY = {
  POOR_THRESHOLD: 2, // When break-even is more than twice the number of runs
}

const TestAutomationROICalculator = () => {
  // State for input values
  const [manualTime, setManualTime] = useState<number>(DEFAULT_MANUAL_TIME)
  const [numTests, setNumTests] = useState<number>(DEFAULT_NUM_TESTS)
  const [numRuns, setNumRuns] = useState<number>(DEFAULT_NUM_RUNS)
  const [hourlyRate, setHourlyRate] = useState<number>(DEFAULT_HOURLY_RATE)
  const [frameworkTime, setFrameworkTime] = useState<number>(DEFAULT_FRAMEWORK_TIME)
  const [testCodingTime, setTestCodingTime] = useState<number>(DEFAULT_TEST_CODING_TIME)
  const [autoRunTime, setAutoRunTime] = useState<number>(DEFAULT_AUTO_RUN_TIME)
  const [failureRate, setFailureRate] = useState<number>(DEFAULT_FAILURE_RATE)
  const [maintenanceTime, setMaintenanceTime] = useState<number>(DEFAULT_MAINTENANCE_TIME)

  // State for calculated results
  const [breakEven, setBreakEven] = useState<number | null>(null)
  const [finalROI, setFinalROI] = useState<number>(0)
  const [totalSavings, setTotalSavings] = useState<number>(0)
  const [automationTimeHours, setAutomationTimeHours] = useState<number>(0)
  const [interpretation, setInterpretation] = useState<string>('')

  // Ref for chart
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<any>(null)

  // Calculate ROI and related metrics
  const calculate = useCallback(() => {
    // Calculate savings and investment for each run
    const manualCosts: number[] = []
    const automationCosts: number[] = []
    const roiValues: number[] = []
    let breakEvenRun: number | null = null

    for (let run = 1; run <= numRuns; run++) {
      // Manual cost calculation
      const manualCost = manualTime * numTests * run
      manualCosts.push(manualCost)

      // Automation cost calculation
      const savings = (manualTime - autoRunTime / MINUTES_IN_HOUR) * numTests * run
      const maintenanceCost = maintenanceTime * (failureRate / PERCENTAGE_DIVISOR) * numTests * run
      const investment =
        frameworkTime * MINUTES_IN_HOUR + testCodingTime * numTests + maintenanceCost
      automationCosts.push(investment)

      // ROI calculation
      const roi = investment > 0 ? (savings - investment) / investment : -1
      roiValues.push(roi)

      // Find break-even point
      if (breakEvenRun === null && roi >= 0) {
        breakEvenRun = run
      }
    }

    // Update results
    const calculatedFinalROI = roiValues[numRuns - 1]
    const calculatedTotalSavings =
      ((manualCosts[numRuns - 1] - automationCosts[numRuns - 1]) / MINUTES_IN_HOUR) * hourlyRate
    const calculatedAutomationTimeHours =
      (frameworkTime * MINUTES_IN_HOUR + testCodingTime * numTests) / MINUTES_IN_HOUR

    setBreakEven(breakEvenRun)
    setFinalROI(calculatedFinalROI)
    setTotalSavings(calculatedTotalSavings)
    setAutomationTimeHours(calculatedAutomationTimeHours)

    // Update interpretation
    let newInterpretation: string
    if (breakEvenRun && breakEvenRun < numRuns * EXCELLENT_ROI_THRESHOLD) {
      newInterpretation = `Excellent ROI! You'll break even after just ${breakEvenRun} test runs. `
      newInterpretation += `By run ${numRuns}, you'll have saved $${calculatedTotalSavings
        .toFixed(DECIMAL_PRECISION)
        .replace(NUMBER_GROUP_REGEX, NUMBER_GROUP_SEPARATOR)} compared to manual testing. `
      newInterpretation += 'This is a strong candidate for automation.'
    } else if (breakEvenRun && breakEvenRun < numRuns * GOOD_ROI_THRESHOLD) {
      newInterpretation = `Good ROI potential. Break-even occurs at ${breakEvenRun} runs. `
      newInterpretation +=
        'Consider automating if these tests will be run frequently over the project lifecycle.'
    } else if (breakEvenRun) {
      newInterpretation = `Marginal ROI. Break-even doesn't occur until run ${breakEvenRun}. `
      newInterpretation +=
        'Consider focusing on the most critical tests or improving automation efficiency.'
    } else {
      newInterpretation = 'No break-even point reached within the specified runs. '
      newInterpretation += 'Consider reducing automation scope or continuing manual testing.'
    }
    setInterpretation(newInterpretation)

    // Update chart
    updateChart(numRuns, manualCosts, automationCosts, breakEvenRun)
  }, [
    manualTime,
    numTests,
    numRuns,
    hourlyRate,
    frameworkTime,
    testCodingTime,
    autoRunTime,
    failureRate,
    maintenanceTime,
  ])

  // Update chart with new data
  const updateChart = (
    numRuns: number,
    manualCosts: number[],
    automationCosts: number[],
    breakEvenRun: number | null
  ) => {
    if (typeof window === 'undefined' || !chartRef.current) return

    // Dynamically import Chart.js
    import('chart.js/auto').then(async (ChartModule) => {
      if (!chartRef.current) return
      const { default: Chart } = ChartModule

      // Import annotation plugin
      const annotationPlugin = await import('chartjs-plugin-annotation').then(
        (module) => module.default
      )
      Chart.register(annotationPlugin)

      // Convert minutes to hours for display
      const manualHours = manualCosts.map((cost) => cost / MINUTES_IN_HOUR)
      const automationHours = automationCosts.map((cost) => cost / MINUTES_IN_HOUR)

      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }

      const ctx = chartRef.current.getContext('2d')
      if (!ctx) return

      // Create actual labels for the x-axis to ensure proper positioning
      const labels = Array.from({ length: numRuns }, (_, i) => i + 1)

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Manual Testing Cost',
            data: manualHours,
            borderColor: CHART_COLORS.manualTesting.border,
            backgroundColor: CHART_COLORS.manualTesting.background,
            tension: CHART_TENSION,
          },
          {
            label: 'Automation Cost',
            data: automationHours,
            borderColor: CHART_COLORS.automation.border,
            backgroundColor: CHART_COLORS.automation.background,
            tension: CHART_TENSION,
          },
        ],
      }

      // Create annotation for break-even point if it exists
      const annotations = breakEvenRun
        ? {
            breakEvenLine: {
              type: 'line' as const,
              xMin: breakEvenRun,
              xMax: breakEvenRun,
              yMin: 0,
              yMax: 'max',
              borderColor: CHART_COLORS.breakEven.border,
              borderWidth: CHART_COLORS.breakEven.width,
              label: {
                display: false, // Hide label for better readability
              },
            },
          }
        : {}

      chartInstance.current = new Chart(ctx, {
        type: 'line' as const, // Use 'as const' to tell TypeScript this is a specific literal type
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: CHART_DISPLAY_CONSTANTS.CHART_TITLE,
            },
            annotation: {
              annotations,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: CHART_DISPLAY_CONSTANTS.Y_AXIS_TITLE,
              },
            },
            x: {
              type: 'linear',
              min: 1,
              max: numRuns,
              title: {
                display: true,
                text: CHART_DISPLAY_CONSTANTS.X_AXIS_TITLE,
              },
              ticks: {
                stepSize: Math.max(1, Math.floor(numRuns / CHART_DISPLAY_CONSTANTS.TICK_STEPS)),
                callback: (value: string | number) => Math.round(Number(value)),
              },
            },
          },
        },
      })
    })
  }

  // Load scenario data
  const loadScenario = (scenario: string) => {
    const scenarios = {
      small: {
        manualTime: SMALL_SCENARIO.MANUAL_TIME,
        numTests: SMALL_SCENARIO.NUM_TESTS,
        numRuns: SMALL_SCENARIO.NUM_RUNS,
        frameworkTime: SMALL_SCENARIO.FRAMEWORK_TIME,
        testCodingTime: SMALL_SCENARIO.TEST_CODING_TIME,
        autoRunTime: SMALL_SCENARIO.AUTO_RUN_TIME,
        failureRate: SMALL_SCENARIO.FAILURE_RATE,
        maintenanceTime: SMALL_SCENARIO.MAINTENANCE_TIME,
      },
      medium: {
        manualTime: MEDIUM_SCENARIO.MANUAL_TIME,
        numTests: MEDIUM_SCENARIO.NUM_TESTS,
        numRuns: MEDIUM_SCENARIO.NUM_RUNS,
        frameworkTime: MEDIUM_SCENARIO.FRAMEWORK_TIME,
        testCodingTime: MEDIUM_SCENARIO.TEST_CODING_TIME,
        autoRunTime: MEDIUM_SCENARIO.AUTO_RUN_TIME,
        failureRate: MEDIUM_SCENARIO.FAILURE_RATE,
        maintenanceTime: MEDIUM_SCENARIO.MAINTENANCE_TIME,
      },
      large: {
        manualTime: LARGE_SCENARIO.MANUAL_TIME,
        numTests: LARGE_SCENARIO.NUM_TESTS,
        numRuns: LARGE_SCENARIO.NUM_RUNS,
        frameworkTime: LARGE_SCENARIO.FRAMEWORK_TIME,
        testCodingTime: LARGE_SCENARIO.TEST_CODING_TIME,
        autoRunTime: LARGE_SCENARIO.AUTO_RUN_TIME,
        failureRate: LARGE_SCENARIO.FAILURE_RATE,
        maintenanceTime: LARGE_SCENARIO.MAINTENANCE_TIME,
      },
    }

    const s = scenarios[scenario as keyof typeof scenarios]
    setManualTime(s.manualTime)
    setNumTests(s.numTests)
    setNumRuns(s.numRuns)
    setFrameworkTime(s.frameworkTime)
    setTestCodingTime(s.testCodingTime)
    setAutoRunTime(s.autoRunTime)
    setFailureRate(s.failureRate)
    setMaintenanceTime(s.maintenanceTime)
  }

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculate()
  }, [
    calculate,
    manualTime,
    numTests,
    numRuns,
    hourlyRate,
    frameworkTime,
    testCodingTime,
    autoRunTime,
    failureRate,
    maintenanceTime,
  ])

  // Clean up chart instance when component unmounts
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h1 className="text-4xl mb-2 font-light text-gray-900 dark:text-white">
          Test Automation ROI Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Make data-driven decisions about test automation investments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl mb-4 font-semibold text-gray-800 dark:text-gray-100">
              Manual Testing Parameters
            </h2>

            <div className="mb-4">
              <label
                htmlFor="manualTime"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Average time per manual test (minutes)
              </label>
              <input
                type="number"
                id="manualTime"
                value={manualTime}
                min={MIN_MANUAL_TIME}
                step={MANUAL_TIME_STEP}
                onChange={(e) => setManualTime(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                How long does it take to execute one test case manually?
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="numTests"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Number of test cases
              </label>
              <input
                type="number"
                id="numTests"
                value={numTests}
                min={MIN_NUM_TESTS}
                step={NUM_TESTS_STEP}
                onChange={(e) => setNumTests(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Average number of tests in your regression suite
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="numRuns"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Number of test runs
              </label>
              <input
                type="number"
                id="numRuns"
                value={numRuns}
                min={MIN_NUM_RUNS}
                step={NUM_RUNS_STEP}
                onChange={(e) => setNumRuns(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                How many times will these tests be executed?
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="hourlyRate"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Team hourly rate ($)
              </label>
              <input
                type="number"
                id="hourlyRate"
                value={hourlyRate}
                min={MIN_HOURLY_RATE}
                step={HOURLY_RATE_STEP}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Average hourly rate for team members (for $ conversion)
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl mb-4 font-semibold text-gray-800 dark:text-gray-100">
              Automation Parameters
            </h2>

            <div className="mb-4">
              <label
                htmlFor="frameworkTime"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Framework setup time (hours)
              </label>
              <input
                type="number"
                id="frameworkTime"
                value={frameworkTime}
                min={MIN_FRAMEWORK_TIME}
                step={FRAMEWORK_TIME_STEP}
                onChange={(e) => setFrameworkTime(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                One-time setup for test automation framework
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="testCodingTime"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Time to code one test (minutes)
              </label>
              <input
                type="number"
                id="testCodingTime"
                value={testCodingTime}
                min={MIN_TEST_CODING_TIME}
                step={TEST_CODING_TIME_STEP}
                onChange={(e) => setTestCodingTime(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Average time to automate a single test case
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="autoRunTime"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Automated test run time (minutes)
              </label>
              <input
                type="number"
                id="autoRunTime"
                value={autoRunTime}
                min={MIN_AUTO_RUN_TIME}
                step={AUTO_RUN_TIME_STEP}
                onChange={(e) => setAutoRunTime(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Time to run the whole test suite automatically
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="failureRate"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Test failure & maintenance rate (%)
              </label>
              <input
                type="number"
                id="failureRate"
                value={failureRate}
                min={MIN_FAILURE_RATE}
                step={FAILURE_RATE_STEP}
                onChange={(e) => setFailureRate(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Percentage of tests that might fail and need maintenance
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="maintenanceTime"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Maintenance time per failed test (minutes)
              </label>
              <input
                type="number"
                id="maintenanceTime"
                value={maintenanceTime}
                min={MIN_MAINTENANCE_TIME}
                step={MAINTENANCE_TIME_STEP}
                onChange={(e) => setMaintenanceTime(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Time to investigate and fix a failed automated test
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl mb-4 font-semibold text-gray-800 dark:text-gray-100">
            Load Common Scenarios
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => loadScenario('small')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Small Project
            </button>
            <button
              onClick={() => loadScenario('medium')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Medium Project
            </button>
            <button
              onClick={() => loadScenario('large')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Large Project
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
          <h2 className="text-3xl mb-4 font-semibold text-gray-800 dark:text-gray-100">
            Results & Interpretation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-lg text-gray-600 dark:text-gray-400">Break-even Point</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {(() => {
                  let breakEvenText
                  if (!breakEven) {
                    breakEvenText = 'N/A'
                  } else if (breakEven > numRuns * ROI_DISPLAY.POOR_THRESHOLD) {
                    breakEvenText = 'Not reached'
                  } else {
                    breakEvenText = `${breakEven} runs`
                  }
                  return breakEvenText
                })()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-lg text-gray-600 dark:text-gray-400">Final ROI</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {(finalROI * PERCENTAGE_MULTIPLIER).toFixed(DECIMAL_PRECISION)}%
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-lg text-gray-600 dark:text-gray-400">Total Savings</p>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                $
                {totalSavings
                  .toFixed(DECIMAL_PRECISION)
                  .replace(NUMBER_GROUP_REGEX, NUMBER_GROUP_SEPARATOR)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-lg text-gray-600 dark:text-gray-400">Initial Investment</p>
              <p className="text-4xl font-bold text-red-600 dark:text-red-400">
                {automationTimeHours.toFixed(HOURS_DECIMAL_PRECISION)} hours
              </p>
            </div>
          </div>
          <div className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            <p>{interpretation}</p>
          </div>
        </div>

        <div className="h-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  )
}

export default TestAutomationROICalculator
