const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
  
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  // console.log('totalling parts', parts)
  
  return (
    <p>
      <b>
        total of {parts.reduce((a, c) => a + c.exercises, 0)} exercises
      </b>
    </p>
  )
}

const Course = ({ course }) => {
  // console.log('inheriting course', course);
  
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course