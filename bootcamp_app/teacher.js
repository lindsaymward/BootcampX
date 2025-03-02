const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = [process.argv[2] || 'JUL02'];
const teachersQuery = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohorts
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

pool.query(teachersQuery, cohortName)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohorts}: ${teacher.teacher}`);
  })
})
.catch(err => {
  console.error('query error', err.stack);
});

