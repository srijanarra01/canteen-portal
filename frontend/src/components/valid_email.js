import React from 'react';
// import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default class ValidEmail extends React.Component {

    state = {
        email: '',
    }

    handleChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    render() {
        const { email } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    required
                    fullWidth
                    name="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                {/* <Button type="submit">Submit</Button> */}
            </ValidatorForm>
        );
    }
}