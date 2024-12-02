// const React = require("react");

// class Delete extends React.Component {
//   render() {
//     return (
//       <form
//         action={`/routes/jobDetails/${this.props.id}?_method=PUT`}
//         method="POST"
//       >
//         Enter Index to Delete:
//         <input type="text" name="title" /> <br />
//         <input type="submit" name="" value="Delete" /> <br />
//       </form>
//     );
//   }
// }
// module.exports = Delete;

const React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <form
        action={`/routes/jobDetails/${this.props.id}?_method=DELETE`} // Use DELETE method with job ID
        method="POST"
      >
        <label>Enter Index to Delete:</label>
        <input
          type="text"
          name="id"
          value={this.props.id} // Set the value of the ID (from props)
        />
        <br />
        <input type="submit" value="Delete" />
      </form>
    );
  }
}

module.exports = Delete;
