const React = require("react");

class addUsers extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "blue" }}>
        <form action="/routes/users" method="POST">
          User Name:
          <input type="text" name="userName" /> <br />
          Email:
          <input type="text" name="email" /> <br />
          <input type="submit" name="" value="Add Jobs" /> <br />
        </form>
      </div>
    );
  }
}
module.exports = addUsers;