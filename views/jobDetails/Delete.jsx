const React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <form
        action={`/routes/jobDetails/${this.props.id}?_method=PUT`}
        method="POST"
      >
        Enter Index to Delete:
        <input type="text" name="title" /> <br />
        <input type="submit" name="" value="Delete" /> <br />
      </form>
    );
  }
}
module.exports = Delete;
