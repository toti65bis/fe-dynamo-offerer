import React, {useState} from 'react';
import {CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from "../../components/UserPool";
import Button from '@material-ui/core/Button';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickName, setNickName] = useState('');
    const [offerer_id, setOffererId] = useState('');
    const [reference_id, setReferenceId] = useState('');

    var attributeList = [

    ];

    var dataNicName = {
        Name: 'nickname',
        Value: nickName
    }

    var dataOfferer_id = {
        Name: 'custom:offerer_id',
        Value: offerer_id
    }

    var dataReference_id = {
        Name: 'custom:reference_id',
        Value: reference_id
    }

    
    

    const onSubmit = event => {
        event.preventDefault();

        var attributeNickName = new CognitoUserAttribute(dataNicName);
        var attributeOffererId = new CognitoUserAttribute(dataOfferer_id);
        var attributeReferenceId = new CognitoUserAttribute(dataReference_id);

        attributeList.push(attributeNickName);
        attributeList.push(attributeOffererId);
        attributeList.push(attributeReferenceId);

        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log(data);
        })
        

    }

    return (
        <>
            <h1>LOGIN</h1>
            <form   onSubmit={onSubmit}>
                <input value={email} onChange={event => setEmail(event.target.value)} />
                <input value={password} onChange={event => setPassword(event.target.value)} />
                <input value={nickName} onChange={event => setNickName(event.target.value)} />
                <input value={offerer_id} onChange={event => setOffererId(event.target.value)} />
                <input value={reference_id} onChange={event => setReferenceId(event.target.value)} />
                <button type='submit'>Signup</button>
            </form>
        </>
    );
}

export default Login;