import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import styles from './styles.module.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
    };
  }

  static Page = ({ children }) => children;

  static Error = ({ name }) => (
    <Field
      name={name}
      subscription={{ touched: true, error: true }}
      render={({ meta: { touched, error } }) =>
        touched && error ? <span>{error}</span> : null
      }
    />
  );

  next = (values) =>
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0),
    }));

  validate = (values) => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      return this.next(values);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, values, errors }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className={styles.buttonsWrapper}>
              <button type="button" disabled={page < 1} onClick={this.previous}>
                « Previous
              </button>
              <button type="submit" disabled={Object.keys(errors).length}>
                {isLastPage ? ' Submit' : 'Next »'}
              </button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}

export default Product;
