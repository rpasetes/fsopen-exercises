const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = (props) => {
  // console.log("part receiving props", props);
  
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  //console.log('content receiving parts', parts);
  
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  console.log('total parts', parts)
  // const total = parts.reduce(
  //   // currentValue accesses the field to be reduced
  //   (accumulator, currentValue) => accumulator + currentValue.exercises,
  //   // supplying an initialValue of 0 to accumulator
  //   0,
  // )

  // const total = parts.reduce((a, c) => {
  //   // FOR DEBUGGING PURPOSES:
  //   // make sure you return a value in the arrow
  //   // function body or values get dropped
  //   // and accumulator prints to 'undefined'
  //   // (lost 30 minutes to this shizz...)
  //   console.log('what is happening', a, c)
  //   return a + c.exercises
  //   },
  //   0,
  // )

  // console.log('parts total', total)

  return (
    <p>
      <b>
        total of {parts.reduce((a, c) => a + c.exercises, 0)} exercises
      </b>
    </p>
    // <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Course = ({ course }) => {
  console.log('inheriting course', course);
  
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course