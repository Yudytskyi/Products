import React, { Component } from 'react';
import { Form } from 'react-final-form';
import styles from './styles.module.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: React.Children.toArray(props.children),
      page: 0,
      values: props.initialValues || {},
    };
  }

  next = (values, page) =>
    this.setState({
      page:
        page < this.state.children.length
          ? page + 1
          : this.state.children.length - 1,
      values,
    });

  prev = page =>
    this.setState({
      page: page > 0 ? page - 1 : 0,
    });

  validate = values => {
    const activePage = this.state.children[this.state.page];
    return activePage?.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, form) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    const formName = this.state.children[page].type.name;

    if (isLastPage) {
      form.restart();
      this.setState({ page: 0 });
      return onSubmit(values);
    } else {
      this.next(values, page);
      return formName === 'ProductIdForm' ? onSubmit(values) : undefined;
    }
  };

  render() {
    const { page, values } = this.state;
    const isLastPage = !this.state.children[page + 1];

    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, values, submitting }) => {
          const nativeProps = this.state.children[page].props;
          const activePage = {
            ...this.state.children[page],
            props: { ...nativeProps, values },
          };

          return (
            <form onSubmit={handleSubmit}>
              {activePage}
              <div className={styles.buttonsWrapper}>
                <button
                  type="button"
                  disabled={page < 1}
                  onClick={() => this.prev(page)}
                >
                  « Prev
                </button>
                <button type="submit" disabled={submitting}>
                  {isLastPage ? ' Submit' : 'Next »'}
                </button>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}

export default Product;
