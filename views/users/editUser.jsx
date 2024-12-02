// const React = require("react");

// class editUser extends React.Component {
//   render() {
//     return (
//       <div style={{ backgroundColor: "blue" }}>
//         <form action="/routes/users" method="GET">
//           Index:
//           <input type="text" name="" />
//           {/* User Name:
//           <input type="text" name="userName" /> <br />
//           Email:
//           <input type="text" name="email" /> <br />
//           <input type="submit" name="" value="Update Info" /> <br /> */}
//         </form>
//       </div>
//     );
//   }
// }
// module.exports = editUser;
const React = require("react");

class editUser extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "#6d9bc3" }}>
        <h1>Edit Users Information Here</h1>
        <form
          action={`/routes/users/${this.props.id}?_method=PUT`} // Corrected URL with job ID
          method="POST"
        >
          <div>
            <label>Index:</label>
            <input
              type="text"
              name="id"
              value={this.props.id} // Corrected value
              //disabled // The ID should not be edited by the user
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
            <input style={{ background: "brown" }} type="submit" value="Edit" />
          </div>
        </form>
      </div>
    );
  }
}

module.exports = editUser;
