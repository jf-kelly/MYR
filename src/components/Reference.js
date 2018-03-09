import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class Reference extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 'a',
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
    };
    this.tableData = [
      {
        name: 'box()',
        parameters: '',
        returnValue: 'representation of the Box primitive',
        description: "Renders a box using current Myr state"
      },
    ];
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleChange = (value) => {
    if (value == 'x') {
      value = this.state.value;
    }
    this.setState({
      value: value,
    });
  };

  

  TableEx = () => {
    const styles = {
      general: {
        fontSize: 24,
      }
    };
    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}>
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
          style={styles.general}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Parameters</TableHeaderColumn>
            <TableHeaderColumn>Return Value</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          displayRowCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
          style={styles.general}>
          {this.tableData.map( (row, index) => (
            <TableRow key={index}>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.parameters}</TableRowColumn>
              <TableRowColumn>{row.returnValue}</TableRowColumn>
              <TableRowColumn>{row.description}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  };

  render() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      buttonSpan: {
        margin: 2,
      },
      tabStyle: {
        margin: 20,
      }
    };
    return (
      <span style={styles.buttonSpan}>
        <RaisedButton
          label="Myr.js Reference"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open} width={'80%'}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}>
            <Tab 
              icon={<FontIcon className="material-icons">change_history</FontIcon>}
              label="PRIMITIVES"
              value='a'
              >
              <div style={styles.tabStyle}>
                <h2 style={styles.headline}>Tab One</h2>
                {this.TableEx()}
              </div>
            </Tab>
            <Tab 
              icon={<FontIcon className="material-icons">build</FontIcon>}
              label="HELPERS"
              value='b'>
              <div>
                <h2 style={styles.headline}>Tab Two</h2>
                <p>
                  This is another example tab.
                </p>
              </div>
            </Tab>
            <Tab 
              icon={<FontIcon className="material-icons">close</FontIcon>}
              label="CLOSE"
              value='x'
              onActive={this.handleToggle}>
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                </p>
              </div>
            </Tab>
          </Tabs>
        </Drawer>
      </span>
    );
  }
}