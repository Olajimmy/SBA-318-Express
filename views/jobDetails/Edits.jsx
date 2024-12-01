// const React = require("react");

// class Edits extends React.Component {
//   render() {
//     return (
//       <form
//         action={`/routes/jobDetails/${this.props.id}?_method=PUT`}
//         method="POST"
//       >
//         Index:
//         <input type="text" name="id" Value={this.props.ID} />
//         <br />
//         title:
//         <input type="text" name="title" Value={this.props.title} />
//         <br />
//         description:
//         <input type="text" name="description" Value={this.props.description} />
//         <br />
//         <input type="submit" name="" value="Edit" /> <br />
//       </form>
//     );
//   }
// }
// module.exports = Edits;

const React = require("react");

class Edits extends React.Component {
  render() {
    return (
      <form
        action={`/routes/jobDetails/${this.props.id}?_method=PUT`} // Corrected URL with job ID
        method="POST"
      >
        <div>
          <label>Index:</label>
          <input
            type="text"
            name="id"
            value={this.props.id} // Corrected value
            disabled // The ID should not be edited by the user
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.props.title} // Set value from props
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={this.props.description} // Set value from props
          />
        </div>
        <div>
          <input type="submit" value="Edit" />
        </div>
      </form>
    );
  }
}

module.exports = Edits;
