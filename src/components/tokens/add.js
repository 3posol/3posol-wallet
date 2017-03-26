import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import { renderTextField } from 'lib/formFields'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

import { cardSpace } from 'lib/styles'

import Immutable from 'immutable'
import { gotoScreen } from 'store/screenActions'
import { addToken } from 'store/tokenActions'
import { required, positive, number, address } from 'lib/validators'
import log from 'loglevel'


const Render = ({token, submitSucceeded, handleSubmit, invalid, pristine, reset, submitting, cancel}) => {

    return (
        <Card style={cardSpace}>
            <CardHeader
                title='Add Token'
                actAsExpander={false}
                showExpandableButton={false}
            />

            <CardText expandable={submitSucceeded}>
                <form onSubmit={handleSubmit}>
                    <Field  name="address" 
                            component={renderTextField} 
                            type="text" 
                            label="Token Contract Address" 
                            validate={[ required, address]}/>
                    <Field  name="name" 
                            component={renderTextField} 
                            type="text" 
                            label="Token Name"
                            validate={required} />
                    <Field  name="symbol" 
                            component={renderTextField} 
                            type="text" 
                            label="Token Symbol"
                            validate={required} />
                    <Field  name="decimal" 
                            component={renderTextField} 
                            type="number" 
                            label="Decimal Places of Smallest Unit" 
                            validate={[number, positive, required]} />
                    <FlatButton label="Submit" type="submit"
                                disabled={pristine || submitting || invalid } />
                    <FlatButton label="Clear Values" 
                                disabled={pristine || submitting} 
                                onClick={reset} />
                </form>
            </CardText>
            <CardText expandable={!submitSucceeded}>
                 <FlatButton label="Done"
                            onClick={cancel}
                            icon={<FontIcon className="fa fa-home" />}/>
            </CardText>
            <CardActions>
                <FlatButton label="Cancel"
                            onClick={cancel}
                            icon={<FontIcon className="fa fa-ban" />}/>
            </CardActions>
        </Card>
        );
}

const AddTokenForm = reduxForm({
    form: 'addToken',
    fields: ['address', 'name', 'symbol', 'decimal']
})(Render);

const AddToken = connect(
    (state, ownProps) => {
        return {
            token: state.tokens.get('tokens', Immutable.List()).last()
        }
    },
    (dispatch, ownProps) => {
        return {
            onSubmit: data => {                
                return new Promise((resolve, reject) => {
                    dispatch(addToken(data.address, data.name, data.symbol, data.decimal))
                        .then((response) => {
                            resolve(response);
                        });
                    });
            },
            cancel: () => {
                dispatch(gotoScreen('home'))
            }
        }
    }
)(AddTokenForm);

export default AddToken;