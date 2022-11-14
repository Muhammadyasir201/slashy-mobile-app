import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RegisterView from './RegisterView';
import BottomSheet from 'react-native-bottomsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {getRolesRequest, uploadSingleImage} from '../../actions/GeneralActions';
import {otpRequest} from '../../actions/UserActions';
import {IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {Platform} from 'react-native';
import {ERROR_SOMETHING_WENT_WRONG} from '../../config/WebService';

function isPhoneNumberValid(number) {
  return /^(?:\+971|00971|0)(?:2|3|4|6|7|9|50|51|52|55|56)[0-9]{7}$/.test(
    number,
  );
}

class RegisterController extends React.Component {
  constructor() {
    super();
    this.state = {
      idDocLoading: false,
      cvDocLoading: false,
      profilePicLoading: false,
      isLoading: false,
      rolesLoading: true,
      roles: [],
      selectedRoles: [],
      rolesError: '',
      profilePic: {
        url: '',
      },
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      email: '',
      emailError: '',
      phone: '',
      phoneFormatted: '',
      phoneError: '',
      gender: {},
      genderError: '',
      idDocuments: [],
      idDocumentsError: '',
      cvDocuments: [],
      cvDocumentsError: '',
    };
  }

  componentDidMount() {
    this.props.getRolesRequest((status, data) => {
      if (status) {
        let roles = [];
        data.forEach((element) => {
          roles.push({
            key: element.id,
            selected: false,
            value: element.display_name,
          });
        });
        this.setState({roles, rolesLoading: false});
      } else {
        util.topAlertError('Something went wrong, please try again later');
        Actions.pop();
      }
    });
  }

  //imageupload

  imageUpload = (image, name, callback) => {
    const imagePath = image.path;
    const imageFormData = new FormData();
    const photo = {
      uri: imagePath,
      type: 'image/jpeg',
      name: name,
    };
    imageFormData.append('tags', 'mobile_upload'); // Optional - add tag for image admin in Cloudinary
    imageFormData.append('upload_preset', 'slashy_admin');
    imageFormData.append('file', photo);
    this.props.uploadSingleImage(imageFormData, (status, newImage = {}) => {
      console.log({statusImageUpload: status});

      if (status) {
        const image = {
          public_id: newImage.public_id,
          version: newImage.version,
          height: newImage.height,
          width: newImage.width,
          format: newImage.format,
          bytes: newImage.bytes,
          url: newImage.url,
          secure_url: newImage.secure_url,
          isLocal: false,
        };
        callback(image);
      }
    });
  };

  //on profile pic press
  showBottomSheet = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: ['Camera', 'Photos', 'Close'],
        title: 'Upload Image',
        dark: true,
        cancelButtonIndex: 2,
      },
      (value) => {
        if (value === 0) {
          ImagePicker.openCamera({
            width: IMAGE_MAX_WIDTH,
            height: IMAGE_MAX_HEIGHT,
            cropping: true,
            useFrontCamera: true,
            compressImageQuality: 0.7,
          })
            .then((image) => {
              this.setState({profilePicLoading: true});
              this.imageUpload(image, 'profilePic', (responseImage) => {
                this.setState({
                  profilePic: responseImage,
                  profilePicLoading: false,
                });
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (value === 1) {
          ImagePicker.openPicker({
            width: IMAGE_MAX_WIDTH,
            height: IMAGE_MAX_HEIGHT,
            cropping: true,
            compressImageQuality: 0.7,
          })
            .then((image) => {
              this.setState({profilePicLoading: true});
              this.imageUpload(image, 'profilePic', (responseImage) => {
                this.setState({
                  profilePic: responseImage,
                  profilePicLoading: false,
                });
              });
            })
            .catch((e) => {
              console.log({e});
            });
        }
      },
    );
  };

  // get value from field and save into states
  setValue = (key) => {
    this.setState(key);
  };
  //  focus on fields
  lastNameFocus = () => {
    this.lastNameRef.focus();
  };
  emailFocus = () => {
    this.emailRef.focus();
  };
  phoneFocus = () => {
    this.phoneRef.focus();
  };
  setGenderSelectedValue = (gender) => {
    this.setState({gender});
  };
  setSelectedRoles = (role) => {
    const currentRolesList = _.cloneDeep(this.state.selectedRoles);
    const ind = _.findIndex(currentRolesList, {
      key: role.key,
    });
    if (ind != -1) {
      currentRolesList.splice(ind, 1);
    } else {
      currentRolesList.push(role);
    }

    this.setState({selectedRoles: currentRolesList});
  };

  documentSelect = (type) => {
    const isCv = type === 'cv';
    if (isCv) {
      if (this.state.cvDocLoading) {
        util.topAlertError('Please wait...');
        return false;
      }
      if (this.state.cvDocuments.length === 5) {
        util.topAlertError('More than 5 documents are not allowed');
        return false;
      }
    } else {
      if (this.state.idDocLoading) {
        util.topAlertError('Please wait...');
        return false;
      }
      if (this.state.idDocuments.length === 5) {
        util.topAlertError('More than 5 documents are not allowed');
        return false;
      }
    }
    BottomSheet.showBottomSheetWithOptions(
      {
        options: ['Camera', 'Photos', 'Documents', 'Close'],
        title: 'Upload Document',
        dark: true,
        cancelButtonIndex: 3,
      },
      (value) => {
        if (value === 0) {
          ImagePicker.openCamera({
            cropping: true,
            compressImageQuality: 0.7,
          })
            .then((image) => {
              const loadingData = isCv
                ? {cvDocLoading: true}
                : {idDocLoading: true};
              this.setState(loadingData);
              this.imageUpload(image, 'idDoc', (responseImage) => {
                const tempArray = isCv
                  ? this.state.cvDocuments
                  : this.state.idDocuments;
                tempArray.push(responseImage);
                const updateData = {};
                if (isCv) {
                  updateData.cvDocuments = tempArray;
                  updateData.cvDocLoading = false;
                } else {
                  updateData.idDocuments = tempArray;
                  updateData.idDocLoading = false;
                }
                this.setState(updateData);
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (value === 1) {
          ImagePicker.openPicker({
            cropping: true,
            compressImageQuality: 0.7,
          })
            .then((image) => {
              console.log({image});

              if (image.size > 5242880) {
                util.topAlertError('Image should not be greater than 5mb');
                return false;
              }
              const loadingData = isCv
                ? {cvDocLoading: true}
                : {idDocLoading: true};
              this.setState(loadingData);
              this.imageUpload(image, 'idDoc', (responseImage) => {
                const tempArray = isCv
                  ? this.state.cvDocuments
                  : this.state.idDocuments;
                tempArray.push(responseImage);
                const updateData = {};
                if (isCv) {
                  updateData.cvDocuments = tempArray;
                  updateData.cvDocLoading = false;
                } else {
                  updateData.idDocuments = tempArray;
                  updateData.idDocLoading = false;
                }
                this.setState(updateData);
              });
            })
            .catch((e) => {
              console.log({e});
            });
        }
        if (value === 2) {
          DocumentPicker.pick({
            allowMultiSelection: false,
            size: 5242880,
            type: [
              DocumentPicker.types.pdf,
              DocumentPicker.types.doc,
              DocumentPicker.types.docx,
            ],
          })
            .then((file) => {
              console.log({file});
              if (file[0].size > 5242880) {
                util.topAlertError('File should not be greater than 5mb');
                return;
              }
              const loadingData = isCv
                ? {cvDocLoading: true}
                : {idDocLoading: true};
              this.setState(loadingData);
              this.uploadDocFile(file[0], isCv, (newFile) => {
                console.log({newFile});
                const tempArray = isCv
                  ? this.state.cvDocuments
                  : this.state.idDocuments;
                tempArray.push(newFile);
                const updateData = {};
                if (isCv) {
                  updateData.cvDocuments = tempArray;
                  updateData.cvDocLoading = false;
                } else {
                  updateData.idDocuments = tempArray;
                  updateData.idDocLoading = false;
                }
                this.setState(updateData);
              });
            })
            .catch((err) => {
              console.log({err});
            });
        }
      },
    );
  };
  validate = () => {
    const errors = {};
    const {
      profilePic,
      firstName,
      lastName,
      email,
      phone,
      gender,
      selectedRoles,
      idDocuments,
      cvDocuments,
    } = this.state;

    console.log({idDocuments, cvDocuments});

    if (_.isEmpty(firstName?.trim()) || _.isNull(firstName?.trim())) {
      errors.firstNameError = 'First Name is required';
    }

    if (_.isEmpty(email) || _.isNull(email)) {
      errors.emailError = 'Email is required';
    }

    if (!_.isEmpty(email) && !util.isEmailValid(email)) {
      errors.emailError = 'Invalid email';
    }

    if (_.isEmpty(lastName?.trim()) || _.isNull(lastName?.trim())) {
      errors.lastNameError = 'Last Name is required';
    }

    if (_.isEmpty(phone) || _.isNull(phone)) {
      errors.phoneError = 'Phone Number is required';
    }

    if (!_.isEmpty(phone)) {
      let number = phone.split(' ').join('');
      number = '+971' + number;
      console.log({number});

      if (number.length !== 13) {
        errors.phoneError = 'Invalid Phone Number';
      }
    }

    if (_.isEmpty(gender) || _.isNull(gender)) {
      errors.genderError = 'Gender is required';
    }

    if (_.isEmpty(selectedRoles) || _.isNull(selectedRoles)) {
      errors.rolesError = 'Roles are required';
    }

    // if (_.isEmpty(idDocuments) || _.isNull(idDocuments)) {
    //   errors.idDocumentsError = 'ID Documents are required';
    // }

    // if (_.isEmpty(cvDocuments) || _.isNull(cvDocuments)) {
    //   errors.cvDocumentsError = 'CV Documents are required';
    // }

    console.log({phone});

    this.setState({
      lastNameError: '',
      phoneError: '',
      genderError: '',
      emailError: '',
      firstNameError: '',
      rolesError: '',
      idDocumentsError: '',
      cvDocumentsError: '',
      ...errors,
    });

    if (!profilePic?.url || profilePic.url === '') {
      util.topAlertError('Profile picture is required');
    }

    if (!_.isEmpty(errors) || !profilePic?.url) return false;

    return true;
  };

  onSubmit = () => {
    if (this.validate()) {
      this.setState({isLoading: true});
      this.props.otpRequest(
        {
          phone: '+971' + this.state.phone,
          email: this.state.email,
          is_staging: false,
        },
        (status, res) => {
          console.log({res});
          if (status) {
            const {
              firstName,
              lastName,
              email,
              phone,
              profilePic,
              selectedRoles,
              gender,
              idDocuments,
              cvDocuments,
            } = this.state;
            const roles = [];
            selectedRoles.forEach((element) => {
              roles.push(element.key);
            });
            let idDocPaths = [];

            idDocuments.forEach((element) => {
              idDocPaths.push(element.secure_url);
            });
            let cvDocPaths = [];
            cvDocuments.forEach((element) => {
              cvDocPaths.push(element.secure_url);
            });
            let id = {
              doc_name: 'Emirates ID',
              pdf: idDocPaths.join(','),
              expiry: '',
            };
            let cv = {
              doc_name: 'Cv',
              pdf: cvDocPaths.join(','),
              expiry: '',
            };

            const documents = [];
            if (idDocPaths != '') documents.push(id);
            if (cvDocPaths != '') documents.push(cv);
            const data = {};
            data.name = firstName + ' ' + lastName.charAt(0) + '.';
            data.username = firstName + ' ' + lastName;
            data.email = email;
            data.contact = '+971' + phone;
            data.description = '';
            data.avatar = profilePic.secure_url;
            data.address = '';
            data.role_id = roles;
            data.experience = [];
            data.gender = gender.value === 'Male' ? 'male' : 'female';
            data.noc_pass_visa_info = 'visa';
            data.noc_pass_visa_expdate = 'January 2021';
            // data.documents = documents;
            data.otp = res[0]?.otp;
            this.setState({isLoading: false});
            Actions.otp({data, id, cv});
          } else {
            if (res?.message === 'email already exists') {
              this.setState({
                isLoading: false,
                emailError: 'email already exists',
              });
              this.emailFocus();
            } else if (res?.message === 'Phone number already exists') {
              this.setState({
                isLoading: false,
                phoneError: 'Phone number already exists',
              });
              this.phoneFocus();
            } else {
              this.setState({isLoading: false});
              util.topAlertError(res?.message || ERROR_SOMETHING_WENT_WRONG);
            }
          }
        },
      );
    }
  };

  removeDoc = (type, index) => {
    if (type === 'cv') {
      const currentArray = _.cloneDeep(this.state.cvDocuments);
      currentArray.splice(index, 1);
      this.setState({cvDocuments: currentArray});
    } else {
      const currentArray = _.cloneDeep(this.state.idDocuments);
      currentArray.splice(index, 1);
      this.setState({idDocuments: currentArray});
    }
  };

  uploadDocFile = (file, isCv, callback) => {
    if (file) {
      const formData = new FormData();
      formData.append('tags', ' mobile_upload Docx');
      formData.append('upload_preset', 'slashy_admin');
      formData.append('resource_type', 'raw');
      formData.append('file', file);
      this.props.uploadSingleImage(formData, (status, newDoc = {}) => {
        console.log({statusImageUpload: status});

        if (status) {
          const newFile = {
            public_id: newDoc.public_id,
            version: newDoc.version,
            format: newDoc.format,
            bytes: newDoc.bytes,
            url: newDoc.url,
            secure_url: newDoc.secure_url,
          };
          callback(newFile);
        } else {
          isCv
            ? this.setState({cvDocLoading: false})
            : this.setState({idDocLoading: false});
        }
      });
    }
  };
  static propTypes = {};
  static defaultProps = {};
  render() {
    const {
      profilePicLoading,
      isLoading,
      profilePic,
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      email,
      emailError,
      phone,
      phoneError,
      gender,
      genderError,
      roles,
      selectedRoles,
      rolesError,
      rolesLoading,
      idDocuments,
      idDocumentsError,
      idDocLoading,
      cvDocuments,
      cvDocumentsError,
      cvDocLoading,
      phoneFormatted,
    } = this.state;
    return (
      <RegisterView
        {...this.props}
        profilePicLoading={profilePicLoading}
        profilePic={profilePic}
        firstName={firstName}
        firstNameError={firstNameError}
        firstNameRef={(ref) => {
          this.firstNameRef = ref;
        }}
        lastName={lastName}
        lastNameError={lastNameError}
        lastNameRef={(ref) => {
          this.lastNameRef = ref;
        }}
        lastNameFocus={this.lastNameFocus}
        email={email}
        emailError={emailError}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        emailFocus={this.emailFocus}
        phone={phone}
        phoneFormatted={phoneFormatted}
        phoneError={phoneError}
        phoneRef={(ref) => {
          this.phoneRef = ref;
        }}
        phoneFocus={this.phoneFocus}
        showBottomSheet={this.showBottomSheet}
        setValue={this.setValue}
        gender={gender}
        genderError={genderError}
        setSelectedValue={this.setGenderSelectedValue}
        roles={roles}
        selectedRoles={selectedRoles}
        setSelectedRoles={this.setSelectedRoles}
        rolesError={rolesError}
        rolesLoading={rolesLoading}
        documentSelect={this.documentSelect}
        isLoading={isLoading}
        onSubmit={this.onSubmit}
        removeDoc={this.removeDoc}
        idDocLoading={idDocLoading}
        cvDocLoading={cvDocLoading}
        cvDocuments={cvDocuments}
        cvDocumentsError={cvDocumentsError}
        idDocuments={idDocuments}
        idDocumentsError={idDocumentsError}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});

const actions = {
  uploadSingleImage,
  getRolesRequest,
  otpRequest,
};

export default connect(mapStateToProps, actions)(RegisterController);
