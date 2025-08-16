const Header = ({ name }) => {
  console.log(name)
  
  return (
    <h1>{name}</h1>
  )
}

const Part = (props) => {
  console.log("part receiving props", props);
  
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  console.log('content receiving parts', parts);
  
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

// const Total = (props) => {
//   return (
//     <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//   )
// }

const Course = ({ course }) => {
  console.log('inheriting course', course);
  
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts={course.parts} /> */}
    </div>
  )
}

export default Course