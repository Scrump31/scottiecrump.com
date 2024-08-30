export type Product = {
  title: string
  description: string
  imgSrc: string
  href: string
}

const productList = [
  {
    title: 'Simplify Testing with React Testing Library',
    description: `React Testing Library (RTL) is a lightweight and easy-to-use tool
     for testing the document object model (DOM) output of components. 
     This book will show you how to use this modern, user-friendly tool 
     to test React components. Using skills gained throughout the book, 
     you will learn how to reduce the risk that your application will 
     not work as expected in production.`,
    imgSrc: '/static/images/rtlBookCoverSample.png',
    href: '/blog/rtl-book',
  },
  {
    title: 'Become an ISTQB® Certified Tester Advanced Level Agile Technical Tester!',
    description: `
    If you want to improve your Agile testing knowledge and skills, this course is for you!
    The lessons are based on my years of real-life experience as an Agile tester. 
    In addition, you'll learn advanced Agile testing techniques that will help you succeed
    in today's competitive market. Even if you don't take the certification exam, you will still
    learn a lot from this course. It will help you become a better tester and increase your job prospects.
    `,
    imgSrc: '/static/images/udemy-agile-att.jpeg',
    href: '/blog/istqb-agile-technical-tester',
  },
  {
    title: 'Become an ISTQB® Certified Mobile Tester!',
    description: `
    If you're looking to become a leader in mobile application testing, 
    then this is the course for you! Earning the ISTQB mobile certification 
    is the perfect way to increase your skills and knowledge in the field.
    In this course, you'll learn business and technology drivers for mobile apps,
    how to identify and apply common test types and processes specific to mobile applications,
    and how to automate test execution. Plus, you'll get real-life scenarios from our years of
    experience testing mobile applications.
    `,
    imgSrc: '/static/images/udemy-mobile-tester.jpg',
    href: '/blog/istqb-mobile-tester',
  },
  {
    title: 'Boost Your Testing Career with Postman and WebdriverIO',
    description: `
    Are you a test engineer or an aspiring professional looking to level up your software testing skills in today's fast-paced agile environments? Look no further! In this blog post, we will introduce you to an exciting course that will empower you with the essential skills required to excel in test engineering and other roles that involve testing activities. Get ready to turbocharge your career with Postman for API testing and WebdriverIO for browser and mobile testing!
    `,
    imgSrc: '/static/images/postman-wdio-educative.png',
    href: '/blog/postman-wdio-educative-course',
  },
]

export default productList
