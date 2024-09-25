import http from 'k6/http'
import { sleep, check, group } from 'k6'

function getRandomUserAgent() {
  const items = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  ]

  return items[Math.floor(Math.random() * items.length)]
}

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const options = {
  scenarios: {
    constant_load: {
      executor: 'constant-vus',
      vus: 10,
      duration: '3m',
    },
  },
}

export default function testBlogPerf() {
  const BLOG_URL = __ENV.PLAYWRIGHT_BASE_URL

  const userAgent = getRandomUserAgent()

  const params = {
    headers: {
      'User-Agent': userAgent,
    },
  }

  let response
  group('Visit Home page', function () {
    response = http.get(BLOG_URL, params)
    check(response, {
      'Homepage loaded': (r) => r.status === 200,
      'Homepage loads within 3 seconds': (r) => r.timings.duration < 3000,
    })
    sleep(randomIntBetween(5, 10))
  })

  group('Visit About page', function () {
    response = http.get(`${BLOG_URL}/about`, params)
    check(response, {
      'About page loaded': (r) => r.status === 200,
      'About page loads within 3 seconds': (r) => r.timings.duration < 3000,
    })
    sleep(randomIntBetween(15, 30))
  })

  group('Visit a Blog post', function () {
    response = http.get(`${BLOG_URL}/blog/how-to-learn-make-it-stick`, params)
    check(response, {
      'Blog post loaded': (r) => r.status === 200,
      'Blog post loads within 3 seconds': (r) => r.timings.duration < 3000,
    })
    sleep(randomIntBetween(30, 90))
  })
}
