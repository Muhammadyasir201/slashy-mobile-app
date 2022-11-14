import React from 'react';
import PropTypes from 'prop-types';
import QRCodeScannerView from './QRCodeScannerView';

export default class QRCodeScannerController extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      btnVisibility: false,
    };
  }

  setData = (text) => {
    this.setState({
      data: text,
      btnVisibility: true,
    });
  };

  static propTypes = {
    onImagePress: PropTypes.func,
    bottomBtnImage: PropTypes.object,
  };
  static defaultProps = {
    onImagePress: () => {},
    bottomBtnImage: {},
  };

  render() {
    const {btnVisibility, data} = this.state;
    const {onImagePress, bottomBtnImage} = this.props;
    return (
      <QRCodeScannerView
        {...this.props}
        onImagePress={onImagePress}
        bottomBtnImage={bottomBtnImage}
        data={data}
        setData={this.setData}
        btnVisibility={btnVisibility}
      />
    );
  }
}
