import classNames from 'classnames';
import React from 'react';
import 'assets/styles/input/input.scss';

const Input = ({ className, ...props }) => <input className={classNames('input', className)} {...props} />;

export default Input;
