const React = require("react");

class News extends React.Component {
  render() {
    return (
      <form action="/routes/jobDetails" method="POST">
        Title:
        <input type="text" name="title" /> <br />
        Description:
        <input type="text" name="description" /> <br />
        <input type="submit" name="" value="Add Jobs" /> <br />
      </form>
    );
  }
}
module.exports = News;
