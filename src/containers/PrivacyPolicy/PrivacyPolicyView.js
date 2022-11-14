import React from 'react';
import {View, ScrollView} from 'react-native';
import {CustomNavbar, Text} from '../../components';
import styles from './PrivacyPolicyStyles';
import {strings} from '../../constants';
import {TouchableOpacity} from 'react-native';
import {Linking} from 'react-native';

export default function PrivacyPolicyView(props) {
  return (
    <>
      <CustomNavbar title={strings.PRIVACY_POLICY} />
      <View style={styles.scrollViewSecView}>
        <ScrollView
          contentContainerStyle={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.viewStyle}>
            <Text style={[styles.text, styles.bold]}>
              Introduction and who is responsible for your data
            </Text>
            <Text style={styles.text}>
              {`This privacy policy details how Slashy App collects and processes your personal data and information through your use of the Slashy App and website.

Slashy App of Bloor Consulting FZ LLE is your data controller and entity responsible for your personal data.

This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy notice of every website you visit.`}
            </Text>

            <Text style={[styles.text, styles.bold]}>
              Personal data we collect from you
            </Text>
            <Text
              style={
                styles.text
              }>{`If you are accessing the Slashy App, you are doing so as a Worker. As part of the User registration process for a Worker you are required to submit some of the following data and information: name, phone number, email address, gender, nationality, photograph, height, curriculum vitae, date of birth, address, documents which show eligibility to work in the UAE (passport copy, residency page copy, Emirates ID copy, Non-objection Certificates), industry specific certifications including Basic Food Hygiene and Occupational Health Certificates, and bank account details (which are only accessible to Slashy App to issue your monthly earnings for shift assignments worked through the Slashy App).

We will also collect data and information on how you use the Slashy App including; shift assignments which you have applied to, accepted, rejected, withdrew, cancelled, clock-in and clock-out timings, number of hours worked, hourly rate earnings, messaging history with the clients, and client reviews submitted based on your performance.

If you are a Client using the website. the data and information we collect includes: your name; company name; company address; company email address; job title; company trade license number; VAT registration number and other business contactdetails of your staffing managers and users, as well as the following information relating to any Workers whom you engage: rates of pay, shifts worked, skills set, Client feedback and ratings, and interaction with shifts.

All data and information are collected through direct interactions whether in person or through the usage of the Slashy App and website.`}</Text>
            <Text style={[styles.text, styles.bold]}>
              How we use your personal data
            </Text>
            <Text
              style={
                styles.text
              }>{`We will your personal data to provide you with the services in accordance with our Slashy App and Terms of Use and/or other agreements that we have with you. We may also use your personal data to comply with legal and government authorities toidentify who you are and your eligibility to work in the UAE. All of your personal datawill only be used the law allows us to.`}</Text>
            <Text style={[styles.text, styles.bold]}>Data Security</Text>
            <Text
              style={
                styles.text
              }>{`To prevent unauthorized access of data and ensure proper use of information, Slashy Aoo has put in place appropriate security procedures to safeguard all information collected online. Slashy App will use best efforts to protect personal data and information collected from loss, misuse, unauthorized access, disclosure, alteration and destruction.`}</Text>
            <Text style={[styles.text, styles.bold]}>Contact us</Text>
            <Text style={styles.text}>
              if you need to contact us in connection with your personal data,
              please email us at
              {
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('mailto:support@slashyapp.com');
                  }}>
                  <Text style={styles.link}>support@slashyapp.com</Text>
                </TouchableOpacity>
              }
              .
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
