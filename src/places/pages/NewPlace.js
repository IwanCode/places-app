import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/valaidators'
import './PlaceForm.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if(inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  const titleInputHadnler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id});
  }, []);

  const placeSubmitHandler = event => {
    event.preventDefault();

  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please add valid title" 
        onInput={titleInputHadnler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please add valid description (at least 5 characters)" 
        onInput={titleInputHadnler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please add valid address" 
        onInput={titleInputHadnler}
      />
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;
