import {InfluxDBClient, Point} from '@influxdata/influxdb3-client'
import 'dotenv/config'

import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config({ path: path.resolve('.env.local') })

const host = process.env.INFLUX_HOST ?? ""
const token = process.env.INFLUX_TOKEN ?? ""
const database = process.env.INFLUX_DATABASE ?? ""

const client = new InfluxDBClient({host, token, database})



function parseVitestResults() {
  const vitestResultsPath = path.resolve('vitest-results.json');
  const vitestData = JSON.parse(fs.readFileSync(vitestResultsPath, 'utf-8'));

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  let executionTime = vitestData.testResults.reduce((total, currentResult) => total + currentResult.assertionResults[0].duration, 0); // in milliseconds

  vitestData.testResults.forEach((suite) => {
    suite.assertionResults.forEach((test) => {
      totalTests += 1;
      if (test.status === 'passed') {
        passedTests += 1;
      } else if (test.status === 'failed') {
        failedTests += 1;
      }
    });
  });

  return {
    totalTests,
    passedTests,
    failedTests,
    executionTime,
  };
}

function parsePlaywrightResults() {
  const playwrightResultsPath = path.resolve('playwright-results.json');
  const playwrightData = JSON.parse(fs.readFileSync(playwrightResultsPath, 'utf-8'));

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  let executionTime = playwrightData.stats.duration;

  playwrightData.suites.forEach((suite) => {
    suite.specs.forEach((spec) => {
      spec.tests.forEach((test) => {
        totalTests += 1;
        if (test.results[0].status === 'passed') {
          passedTests += 1;
        } else if (test.status === 'failed') {
          failedTests += 1;
        }
      });
    });
  });

  return {
    totalTests,
    passedTests,
    failedTests,
    executionTime,
  };
}

async function sendMetrics() {
  const vitestMetrics = parseVitestResults();
  const playwrightMetrics = parsePlaywrightResults();

  const vitestPoint = new Point()
    .setMeasurement("vitest_results")
    .setTag('test_type', 'unit')
    // .setTag('commit', gitCommit)
    // .setTag('branch', gitBranch)
    .setFloatField('total_tests', vitestMetrics.totalTests)
    .setFloatField('passed_tests', vitestMetrics.passedTests)
    .setFloatField('failed_tests', vitestMetrics.failedTests)
    .setFloatField('execution_time_ms', vitestMetrics.executionTime);

  const playwrightPoint = new Point()
    .setMeasurement("playwright_results")
    .setTag('test_type', 'ui')
    // .setTag('commit', gitCommit)
    // .setTag('branch', gitBranch)
    .setFloatField('total_tests', playwrightMetrics.totalTests)
    .setFloatField('passed_tests', playwrightMetrics.passedTests)
    .setFloatField('failed_tests', playwrightMetrics.failedTests)
    .setFloatField('execution_time_ms', playwrightMetrics.executionTime);

  try {
    await client.write([vitestPoint, playwrightPoint], database);
    console.log('Metrics sent successfully to InfluxDB');
  } catch (error) {
    console.error('Error sending metrics to InfluxDB:', error);
    process.exit(1);
  }

  await client.close()
}

await sendMetrics()