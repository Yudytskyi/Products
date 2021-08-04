import React, { Component } from 'react';
import { Form } from 'react-final-form';
import styles from './styles.module.scss';

class Authentication extends Component {
  validate = values => (this.props.validate ? this.props.validate(values) : {});

  handleSubmit = (values, form) => {
    const { children, onSubmit } = this.props;
    const formName = children.formName;
    form.restart();
    return onSubmit(formName, values);
  };

  render() {
    const { initialValues = {}, children } = this.props;
    const formName = this.props.formName;

    return (
      <Form
        initialValues={initialValues}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, values, submitting }) => {
          const nativeProps = children.props;
          const currentForm = {
            ...children,
            props: { ...nativeProps, values },
          };

          return (
            <form onSubmit={handleSubmit}>
              {currentForm}
              <div className={styles.buttonsWrapper}>
                <button type="submit" disabled={submitting}>
                  <span id="submit">{formName}</span>
                </button>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}

export default Authentication;
