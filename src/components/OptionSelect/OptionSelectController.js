import React from 'react';
import PropTypes from 'prop-types';
import OptionSelectView from './OptionSelectView';

export default class OptionSelectController extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  static propTypes = {
    list: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
    dataLoading: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  };
  static defaultProps = {
    placeholder: 'Select',
    multiple: false,
    dataLoading: false,
    title: 'Select Option',
    subtitle: '',
  };

  setOpen = (open) => {
    this.setState((prevState) => {
      return {open: !prevState.open};
    });
    if (open) {
      this?.bsRef?.open();
    } else {
      this?.bsRef?.close();
    }
  };

  render() {
    const {open} = this.state;
    const {setSelectedValue, multiple} = this.props;
    return (
      <OptionSelectView
        {...this.props}
        setSelectedValue={(selected) => {
          setSelectedValue(selected);
          if (!multiple) this.setOpen(false);
        }}
        open={open}
        setOpen={this.setOpen}
      />
    );
  }
}
