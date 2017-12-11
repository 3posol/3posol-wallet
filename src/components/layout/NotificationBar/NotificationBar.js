import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { orange300, red900 } from 'material-ui/styles/colors';
import screen from 'store/wallet/screen';

const colors = {
  success: '#47B04B',
  error: red900,
  info: '#171717',
  warning: orange300,
};


class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notificationMessage) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }

  render() {
    return (
      <Snackbar
        bodyStyle={{
          backgroundColor: colors[this.props.notificationType || 'info'],
        }}
        open={this.state.open}
        message={this.props.notificationMessage || ''}
        autoHideDuration={this.props.notificationDuration || 3000}
        onRequestClose={this.props.onRequestClose}
      />
    );
  }
}


export default connect(
  (state, ownProps) => ({
    notificationMessage: state.wallet.screen.get('notificationMessage'),
    notificationDuration: state.wallet.screen.get('notificationDuration'),
    notificationType: state.wallet.screen.get('notificationType'),
  }),
  (dispatch, ownProps) => ({
    onRequestClose: () => {
      dispatch(screen.actions.closeNotification());
    },
  })
)(NotificationBar);
